import React, {useEffect, useRef, useState,} from "react";
import '../styles/App.scss';
import {CircularProgress, FormControl, NativeSelect, TextField} from "@mui/material";
import {Convert} from "../api/RestAPI";
import {ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {GetNewCurrency} from "../redux/reducers/CurrencyReducer";
import {getCurrency} from "../redux/reducers/CurrencySelector";

const App = () => {
    const dispatch = useDispatch();
    const Currency = useSelector(getCurrency);
    const isInitialMount = useRef(true);
    let date = new Date();
    let CurrentDate = String(date.getDate()).padStart(2, '0') + '.' + String(date.getMonth() + 1).padStart(2, '0') + '.' + date.getFullYear();

    const [values, setValues] = useState({
        firstSelect: "USD",
        secondSelect: "UAH",
        prevFirstSelect: "USD",
        prevSecondSelect: "UAH",
        firstInput: "1",
        secondInput: "",
        prevFirstInput: "",
        prevSecondInput: "",
    })

    const handleChange = (prop) => (event) => {
        setValues({
            ...values,
            [prop]: event.target.value
        })
    }

    useEffect(() => {
        if (isInitialMount.current) {
            dispatch(GetNewCurrency())
            isInitialMount.current = false;
        }
    },[])

    useEffect(() => {
        if (values.prevFirstInput !== values.firstInput && +values.firstInput) {
            Convert(values.firstSelect, values.secondSelect, values.firstInput).then(response => {
                if (response) {
                    setValues({
                        ...values,
                        prevFirstInput: values.firstInput,
                        prevSecondInput: response,
                        secondInput: response,
                    })
                }
            })
        } else if (values.prevSecondInput !== values.secondInput && +values.secondInput) {
            Convert(values.secondSelect, values.firstSelect, values.secondInput).then(response => {
                if (response) {
                    setValues({
                        ...values,
                        prevSecondInput: values.secondInput,
                        prevFirstInput: response,
                        firstInput: response,
                    })
                }
            })
        } else if (values.prevFirstSelect !== values.firstSelect && +values.firstInput) {
            Convert(values.firstSelect, values.secondSelect, values.firstInput).then(response => {
                if (response) {
                    setValues({
                        ...values,
                        prevFirstInput: values.firstInput,
                        prevSecondInput: response,
                        secondInput: response,
                        prevFirstSelect: values.firstSelect,
                    })
                }
            })
        } else if (values.prevSecondSelect !== values.secondSelect && +values.secondInput) {
            Convert(values.secondSelect, values.firstSelect, values.secondInput).then(response => {
                if (response) {
                    setValues({
                        ...values,
                        prevSecondInput: values.secondInput,
                        prevFirstInput: response,
                        firstInput: response,
                        prevSecondSelect: values.secondSelect,
                    })
                }
            })
        }
    }, [values])

    return (
        <div className="App">
            <div className="App-Header">
                {Currency.length ?
                    <div className="Currency-List">
                        <span><div>UER </div>
                            {Currency[0]} UAH</span><span><div>USD </div>
                        {Currency[1]} UAH</span><span><div>RUB </div>
                        {Currency[2]} UAH</span><span><div>BTC </div>
                        {Currency[3]} UAH</span>
                    </div> :
                    <CircularProgress/>}
            </div>
            <div className="App-Wrapper">
                <h1>Currency Converter</h1>
                <div className="Converter-Box">
                    <div className="item">
                        {/* FIRST CURRENCY SELECT*/}
                        <FormControl>
                            <NativeSelect className="Custom-Select"
                                          inputProps={{
                                              name: 'currency', id: 'currency-1'
                                          }}
                                          defaultValue={values.firstSelect}
                                          onChange={handleChange("firstSelect")}>
                                <option value={"USD"}>USD</option>
                                <option value={"EUR"}>EUR</option>
                                <option value={"RUB"}>RUB</option>
                                <option value={"UAH"}>UAH</option>
                                <option value={"BTC"}>BTC</option>
                            </NativeSelect>
                        </FormControl>

                        {/* FIRST CURRENCY INPUT*/}
                        <TextField className="Custom-TextField"
                                   id="input-currency-1" label=""
                                   inputMode="numeric" inputProps={{type: "number", step: "0.1", min: 0}}
                                   variant="standard" value={values.firstInput}
                                   onChange={e => e.target.value >= 0 && handleChange("firstInput")(e)}/>
                    </div>

                    <div className="item">
                        {/* SECOND CURRENCY SELECT*/}
                        <FormControl>
                            <NativeSelect className="Custom-Select"
                                          inputProps={{
                                              name: 'currency', id: 'currency-2'
                                          }}
                                          defaultValue={values.secondSelect}
                                          onChange={handleChange("secondSelect")}>
                                <option value={"USD"}>USD</option>
                                <option value={"EUR"}>EUR</option>
                                <option value={"RUB"}>RUB</option>
                                <option value={"UAH"}>UAH</option>
                                <option value={"BTC"}>BTC</option>
                            </NativeSelect>
                        </FormControl>

                        {/* Second CURRENCY INPUT*/}
                        <TextField className="Custom-TextField"
                                   id="input-currency-2" label=""
                                   inputMode="numeric" inputProps={{type: "number", step: "0.1", min: 0}}
                                   variant="standard" value={values.secondInput}
                                   onChange={e => e.target.value >= 0 && handleChange("secondInput")(e)}/>
                    </div>

                </div>
                <span style={{textAlign: "center"}}>The course is valid on the specified date: {CurrentDate}</span>
            </div>

            <ToastContainer
                position="top-left"
                theme="dark"
                limit={2}
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover/>
        </div>
    )
}

export default App;
