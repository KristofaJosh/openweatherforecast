import axios from 'axios';

const jsonBinRequest = axios.create({
    baseURL: process.env.REACT_JSONBIN_BASE_URL,
    headers: {
        'X-Master-key': process.env.REACT_JSONBIN_KEY,
    },
});

type searchStateType = (
    countries: { states: { code: string; name: string }[]; name: string; code2: string }[],
    searchParam: string
) => { cn: string; cc: string; name: string; code: string }[] | [];

const searchState: searchStateType = (countries, searchParam) => {
    return countries.reduce((res: any[], { states, name, code2 }) => {
        states.forEach((el) => {
            if (el.name.toLowerCase().includes(searchParam.toLowerCase()))
                res.push({ ...el, cn: name, cc: code2, searchParam });
        });
        return res;
    }, []);
};

const getCountry = async (
    searchKeyWord: string
): Promise<{ cn: string; cc: string; name: string; code: string }[] | []> => {
    return new Promise((resolve, reject) => {
        //bin object
        jsonBinRequest({
            method: 'GET',
            url: '/60c7460cb274176a77e7745b',
        })
            .then(({ data }) => {
                resolve(searchState(data.record, searchKeyWord));
            })
            .catch(reject);
    });
};

export default getCountry;
