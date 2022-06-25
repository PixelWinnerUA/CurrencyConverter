import {connect} from "react-redux";
import App from "./App";
import {GetNewCurrency} from "../redux/reducers/CurrencyReducer";

const mapStateToProps = (state) => {
    return {
        Currency: state.CurrencyReducer.Currency,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        GetNewCurrency: () => {
            dispatch(GetNewCurrency())
        }
    }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;