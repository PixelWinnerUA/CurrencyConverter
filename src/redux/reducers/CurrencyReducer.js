import {GetUSD, GetRUB, GetEUR, GetBTC} from "../../api/RestAPI";

export const SetCurrencyActionCreator = (newCurrency) => ({
    type: "SET-CURRENCY",
    newCurrency
})

export const GetNewCurrency = () => async (dispatch) => {
    Promise.all([GetEUR(), GetUSD(), GetRUB(), GetBTC()])
        .then(values => {
            for (let i = 0; i < values.length; i++) {
                if (!values[i])
                    values[i] = 0;
            }
            dispatch(SetCurrencyActionCreator(values))
        })
}

let initialState = {
    Currency: [],
}

const CurrencyReducer = (state = initialState, action) => {

    switch (action.type) {
        case "SET-CURRENCY":
            return {
                ...state,
                Currency: action.newCurrency
            }
        case "SET-API-STATUS":
            return {
                ...state,
                ApiStatus: action.status
            }
        default:
            return {
                ...state
            };
    }
};
export default CurrencyReducer;

