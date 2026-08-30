/**
 * Generates the hero motif's data: a noisy position signal and the same signal
 * through a one-dimensional Kalman filter.
 *
 * This is the actual estimator, not a drawn squiggle. It is the same shape of
 * problem as the BLE positioning work described in the Apollyon case study:
 * a measurement far too noisy to use directly, and a filter that folds each
 * reading in according to how much it deserves to be trusted.
 *
 * Deterministic — a fixed seed, so the curve is identical on every build and a
 * rebuild never shows up as a diff.
 */
export interface Signal {
  measured: number[];
  filtered: number[];
}

export function signal(samples = 130, seed = 20240): Signal {
  let s = seed;
  const rand = () => ((s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
  // Box-Muller, for noise that looks like sensor noise rather than a sawtooth.
  const gauss = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand());

  const truth: number[] = [];
  let x = 0;
  for (let i = 0; i < samples; i++) {
    x += gauss() * 0.085; // the thing actually moving
    truth.push(x);
  }

  const measured = truth.map((t) => t + gauss() * 0.6); // what the radio reports

  // Constant-position model. Q: how much we expect the truth to move between
  // samples. R: how much we distrust a single measurement.
  const Q = 0.008;
  const R = 0.38;
  let estimate = measured[0];
  let variance = 1;

  const filtered = measured.map((z) => {
    variance += Q;
    const gain = variance / (variance + R);
    estimate = estimate + gain * (z - estimate);
    variance = (1 - gain) * variance;
    return estimate;
  });

  return { measured, filtered };
}

/** Map a series to an SVG polyline `points` string inside a viewBox. */
export function polyline(
  series: number[],
  bounds: { min: number; max: number },
  width: number,
  height: number,
  pad: number,
): string {
  const span = bounds.max - bounds.min || 1;
  return series
    .map((v, i) => {
      const x = (i / (series.length - 1)) * width;
      const y = pad + (1 - (v - bounds.min) / span) * (height - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}
