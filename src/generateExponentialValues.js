
/**
 * Generates an array of exponential values
 * @param {number} start The starting value of the series
 * @param {number} end The ending value of the series
 * @param {number} iterations The number of values to generate
 * @param {boolean} roundTen Whether to round the last value to the nearest multiple of 10
 * @returns {number[]} The generated series
 */
export const generateExponentialValues = (start, end, iterations, roundTen = false) => {
  const values = [];
  const step = (end - start) / (iterations);

  values.push(roundTen ? Math.round(start / 10) * 10 : Math.round(start));
  for (let i = 1, s = start; i < iterations; i++) {
    s += step / ((iterations - 1) / 2) * i;
    values.push(roundTen ? Math.round(s / 10) * 10 : Math.round(s));
  }
  return values;
};