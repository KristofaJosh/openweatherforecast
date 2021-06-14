import { temperatureConverter } from './temperatureConverter';
/**
 * Get average temperature in kelvin, Fahrenheit or Celsius
 * @param {object[]} resolveResponseWeatherData -  Resolved response Object from api
 * @return {k: number, c: number, f: number}
 */
export const averageTemperature = (resolveResponseWeatherData = []) => {
    const ans =
        resolveResponseWeatherData.reduce((acc, cur: any) => {
            acc += cur?.tempKev || 0;
            return acc;
        }, 0) / resolveResponseWeatherData.length;
    return {
        k: (ans || 0).toFixed(1),
        c: temperatureConverter(ans, true),
        f: temperatureConverter(ans),
    };
};
