import {GetUSD, GetRUB, GetEUR, GetBTC} from "../../api/RestAPI";

export const SetCurrencyActionCreator = (newCurrency) => ({
    type: "SET-CURRENCY",
    newCurrency
})

export const GetNewCurrency = () => async (dispatch) => {
    Promise.all([GetEUR(), GetUSD(), GetRUB(), GetBTC()]).then(values => dispatch(SetCurrencyActionCreator(values)));
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
        default:
            return {
                ...state
            };
    }
};
export default CurrencyReducer;

