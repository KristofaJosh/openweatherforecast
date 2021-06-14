/**
 * Sort allDays array by date
 */
export const peekDays = (allDays: any) => {
    if (allDays) {
        const _keys = Object.keys(allDays);
        return _keys.sort((a: any, b: any) => {
            return allDays[a][0].dt - allDays[b][0].dt;
        });
    }
    return [];
};
