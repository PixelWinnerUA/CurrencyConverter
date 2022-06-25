import axios from "axios";
import {toast} from "react-toastify";

axios.defaults.headers.common["apikey"] = "2hMrF3SOhA33yOG5jGmSuGz02T9Z3ilS";
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 429) {
            toast.error("API Token has expired")
        }
    });

let cancelToken;

export const Convert = async (from, to, amount = 0) => {
    if (cancelToken) {
        cancelToken.cancel("Operation canceled due to new request.")
    }
    cancelToken = axios.CancelToken.source()
    return await axios.get("https://api.apilayer.com/currency_data/convert?to="
        + to + "&from=" + from + "&amount=" + amount).then(response => response.data.result)
}

export const GetEUR = async () => {
    return await axios.get("https://api.apilayer.com/currency_data/live?source=EUR&currencies=UAH")
        .then(response => response.data.quotes.EURUAH)
}
export const GetUSD = async () => {
    return await axios.get("https://api.apilayer.com/currency_data/live?source=USD&currencies=UAH")
        .then(response => response.data.quotes.USDUAH)
}
export const GetRUB = async () => {
    return await axios.get("https://api.apilayer.com/currency_data/live?source=RUB&currencies=UAH")
        .then(response => response.data.quotes.RUBUAH)
}
export const GetBTC = async () => {
    return await axios.get("https://api.apilayer.com/currency_data/live?source=BTC&currencies=UAH")
        .then(response => response.data.quotes.BTCUAH)
}


