import { dateConverter } from './dateConverter';
import { temperatureConverter } from './temperatureConverter';
/**
 * Reshapes response object from open weather api for this app
 * @param {object} response - response from openweather api
 * @returns {object}
 */
export const resolveResponse = (response: { list: any }) => {
    try {
        const { list } = response;
        const _list = list.reduce((acc: any, cur: { dt: number }, i: any, arr: any) => {
            const _pos = dateConverter(cur.dt).calDate();
            acc[_pos] = [];
            for (let x of arr) {
                // check if date match, then group
                if (dateConverter(x.dt).calDate() === dateConverter(cur.dt).calDate()) {
                    acc[_pos].push({
                        tempKev: x.main.temp,
                        tempCel: temperatureConverter(x.main.temp, true),
                        tempFahr: temperatureConverter(x.main.temp),
                        ...x,
                    });
                }
            }
            return acc;
        }, {});
        return _list;
    } catch (e) {
        return {};
    }
};
