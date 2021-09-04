/**
 *
 * @param value
 * @param { min, max }
 * @returns
 */
export const isInRange = (value: string, { min, max }: any): any =>
  (!min || value > min) && (!max || value < max);

/**
 *
 * @param value
 * @param pattern
 * @returns
 */
export const isMatchingString = (value: string, pattern: string): any =>
  !pattern || pattern === value;
