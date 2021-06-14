export const WEATHER_DATA = (data: object) => {
    return {
        type: 'WEATHER_DATA',
        data,
    };
};

export const TOGGLE_LOADING = (status: boolean) => {
    return {
        type: 'TOGGLE_LOADING',
        status,
    };
};

export const UPDATE_STATE = (state: object) => {
    return {
        type: 'UPDATE_STATE',
        state,
    };
};
