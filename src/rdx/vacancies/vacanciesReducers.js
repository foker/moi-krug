import * as types from './vacanciesConstans';

const initialState = {
    vacanciesList: [],
    filters: {
        salary: false
    }
};


export default function (state = initialState, action = {}) {
    switch (action.type) {
        case types.INCREMENT:
            return {
                ...state,
                vacanciesList: state.vacanciesList.map(item => {
                    return action.payload === item.id ? {
                        ...item,
                        count: item.count + 1
                    } : item;
                })

            };
        case types.DECREMENT:
            return {
                ...state,
                count: state.count - 1
            };
        case types.SAVE_VACANCIES :
            return {
                ...state,
                vacanciesList: action.payload
            };

        case types.SAVE_FILTER :
            return {
                ...state,
                filters: action.payload
            };

        default:
            return state;
    }
}
