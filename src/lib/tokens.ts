import tokens from '../../design-tokens.json';

/**
 * Resolves a semantic token to a literal hex, for the few places that need a
 * real value rather than a CSS variable -- `<meta name="theme-color">` being the
 * one that matters, since the browser chrome cannot read a custom property.
 *
 * Reading the token source keeps those values from drifting away from the theme.
 */
function resolve(value: unknown, dark: boolean, depth = 0): string {
  if (depth > 10) throw new Error('token alias cycle');
  if (typeof value !== 'string') throw new Error('unexpected token value');
  if (!value.startsWith('{')) return value;

  const ref = value.slice(1, -1);
  if (dark && ref.startsWith('semantic.')) {
    const key = ref.slice('semantic.'.length);
    const node = key.split('.').reduce<any>((n, k) => n?.[k], (tokens as any).dark);
    if (node?.$value) return resolve(node.$value, dark, depth + 1);
  }
  const node = ref.split('.').reduce<any>((n, k) => n?.[k], tokens as any);
  if (!node?.$value) throw new Error(`unresolved token: ${ref}`);
  return resolve(node.$value, dark, depth + 1);
}

/**
 * `token('surface.page')` -> '#f2f0e8'; `token('surface.page', 'dark')` -> '#1c1b16'.
 *
 * The dark map is consulted for the requested path FIRST. Resolving the light
 * alias and hoping a later hop re-enters the override map does not work: most
 * semantic tokens alias straight to a primitive, so there is no second hop.
 */
export function token(path: string, theme: 'light' | 'dark' = 'light'): string {
  if (theme === 'dark') {
    const override = path.split('.').reduce<any>((n, k) => n?.[k], (tokens as any).dark);
    if (override?.$value) return resolve(override.$value, true);
  }
  const node = path.split('.').reduce<any>((n, k) => n?.[k], (tokens as any).semantic);
  if (!node?.$value) throw new Error(`unknown semantic token: ${path}`);
  return resolve(node.$value, theme === 'dark');
}
