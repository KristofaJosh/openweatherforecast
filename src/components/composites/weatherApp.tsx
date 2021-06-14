import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { averageTemperature } from 'helpers/averageTemperature';
import { dateConverter } from 'helpers/dateConverter';
import { peekDays } from 'helpers/peekDays';
import Button from '@material-ui/core/Button';
import { UPDATE_STATE } from 'store/actions/siteStateAction.action';
import getCountry from '../../utils/countryRequest';

const avg: any = averageTemperature;
let timer: any;

const WeatherApp = () => {
    const {
        weatherDataState: { paginate, temp },
        weatherData: {
            conditions: { today, allDays },
            city,
        },
    } = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    const [searchOptions, setSearchOptions] = useState<any>([]);

    const searchLocation = (e: any) => {
        const { value } = e.target;
        if (value) {
            clearTimeout(timer);
            timer = setTimeout(async () => {
                console.log('loading...');
                const ans = await getCountry(value);
                setSearchOptions(
                    ans.map((e) => ({
                        label: `${e.name}, ${e.cn}`.toUpperCase(),
                        value: `${e.name},${e.cc}`.toLowerCase(),
                    }))
                );
                console.log('Done...');
            }, 1000);
        }
    };

    const setStateSelection = (e: any) => {
        console.log(e.target);
        const { value } = e.target;
        dispatch(UPDATE_STATE({ defaultCity: value }));
        setSearchOptions([]);
    };

    const toggleTemp = () => {
        const _temp = temp.key === 'tempCel' ? { key: 'tempFahr', unit: 'F' } : { key: 'tempCel', unit: 'C' };
        dispatch(UPDATE_STATE({ temp: _temp }));
    };

    const handlePagination = (mv: number) => {
        return () => {
            if (paginate.x + mv >= 0 && paginate.y + mv <= 6) {
                dispatch(UPDATE_STATE({ paginate: { x: paginate.x + mv, y: paginate.y + mv } }));
            }
        };
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={toggleTemp}>
                {temp.unit}
            </Button>
            <h2>{city.name}</h2>
            <input type="text" onChange={searchLocation} />
            <div onClick={setStateSelection}>
                {searchOptions.length && searchOptions.map((el: any) => <option value={el.value}>{el.label}</option>)}
            </div>
            <div>
                <h4>Today:</h4>
                <div>
                    <p>
                        avg: {avg(today)[temp.unit.toLowerCase()]}
                        {temp.unit}
                    </p>
                    <div>
                        {today &&
                            today.map((el: any, i: number) => (
                                <div key={i}>
                                    <span>{dateConverter(el.dt).time}</span>{' '}
                                    <span>{`${el[temp.key]}${[temp.unit]}`}</span>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <div>
                <h4>Peek:</h4>
                <div>
                    {allDays &&
                        peekDays(allDays)
                            .slice(paginate.x, paginate.y)
                            .map((_date: any) => (
                                <>
                                    <p>{_date}</p>
                                    <p>
                                        avg: {avg(allDays[_date])[temp.unit.toLowerCase()]}
                                        {temp.unit}
                                    </p>
                                    <div>
                                        {allDays[_date].map((el: any, i: number) => (
                                            <span key={i}>{`${el[temp.key]}${[temp.unit]} `}</span>
                                        ))}
                                    </div>
                                </>
                            ))}
                </div>
            </div>
            <div>
                <Button disabled={!paginate.x} variant="contained" color="primary" onClick={handlePagination(-3)}>
                    Prev
                </Button>
                <Button disabled={paginate.y >= 6} variant="contained" color="primary" onClick={handlePagination(3)}>
                    Next
                </Button>
            </div>
        </div>
    );
};

export default WeatherApp;
