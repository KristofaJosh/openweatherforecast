type tempToggle = {
    key: 'tempCel' | 'tempFahr';
    unit: 'C' | 'F';
};

type globalStoreType = {
    siteLoading: boolean;
    weatherDataState: {
        defaultCity: string;
        temp: tempToggle;
        paginate: { x: number; y: number };
    };
    weatherData: {
        city: {
            name: string;
            country: string;
        };
        conditions: { today: []; allDays: object };
    };
};

const initialState = {
    siteLoading: false,
    weatherDataState: {
        defaultCity: 'lagos,ng',
        paginate: { x: 0, y: 3 },
        temp: { key: 'tempCel', unit: 'C' },
    },
    weatherData: {
        city: {},
        conditions: {},
    },
} as globalStoreType;

export const siteStateReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'WEATHER_DATA':
            return { ...state, weatherData: action.data };
        case 'UPDATE_STATE':
            return { ...state, weatherDataState: { ...state.weatherDataState, ...action.state } };
        case 'TOGGLE_LOADING':
            return { ...state, siteLoading: action.status };
        default:
            return state;
    }
};
