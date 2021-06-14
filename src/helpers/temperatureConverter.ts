/**
 * Converts Temp in Kelvin to Fahrenheit (Default) or Celsius
 * @example
 *    temperatureConverter(273) - converts to 31.7F
 *    temperatureConverter(273, true) - converts to -0.1C
 * @param {number} kelvinTemp
 * @param {number} toCelsius
 * @returns {number}
 */
export const temperatureConverter = (kelvinTemp: string | number, toCelsius = false) => {
    if (+kelvinTemp) {
        if (toCelsius) {
            return (+kelvinTemp - 273.15).toFixed(1);
        }
        return (((+kelvinTemp - 273.15) * 9) / 5 + 32).toFixed(1);
    }
    return 0;
};
