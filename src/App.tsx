import React, { useEffect } from 'react';
import weatherRequest from 'utils/weatherRequest';
import { logErrorToService } from 'utils/logErrorToService';
import { connect, useSelector } from 'react-redux';
import { TOGGLE_LOADING, WEATHER_DATA } from 'store/actions/siteStateAction.action';
import { RootState } from 'store';
import WeatherApp from 'components/composites/weatherApp';
import { resolveResponse } from 'helpers/groupWeatherData';
import ChartScreen from 'components/composites/chart';

function App(props: any) {
    const { siteLoading, toggleLoader, setWeatherData } = props;
    const {
        weatherDataState: { defaultCity },
    } = useSelector((state: RootState) => state);

    useEffect(() => {
        toggleLoader(true);
        weatherRequest({
            method: 'GET',
            url: '/forecast',
            params: {
                q: defaultCity,
                cnt: 100,
            },
        })
            .then(({ data }) => {
                const conditions = resolveResponse(data);
                let d = new Date();
                // if no data returned for that day, move to next day.
                let today = conditions[d.getDate()] ? d.setDate(d.getDate()) : d.setDate(d.getDate() + 1);
                setWeatherData({
                    conditions: { today: conditions[new Date(today).getDate()], allDays: conditions },
                    city: data.city,
                });
                toggleLoader(false);
            })
            .catch((err) => {
                toggleLoader(false);
                logErrorToService(err);
            });
    }, [setWeatherData, toggleLoader, defaultCity]);

    return (
        <div className="index">
            {siteLoading && (
                <div className={'site-loader'}>
                    <p>Loading...</p>
                </div>
            )}
            <>
                <WeatherApp />
                <ChartScreen />
            </>
        </div>
    );
}

const mapStateToProps = (state: RootState) => {
    return state;
};

const mapDispatchToProps = (dispatch: any) => ({
    toggleLoader: (status: boolean) => dispatch(TOGGLE_LOADING(status)),
    setWeatherData: (data: { city: object; condition: object }) => dispatch(WEATHER_DATA(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
