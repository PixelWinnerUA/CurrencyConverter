import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import store from "./redux/store";
import Preloader from "./components/Preloader";

const App = lazy(() => import("./components/App"))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Suspense fallback={<Preloader/>}>
            <Provider store={store}>
                <App/>
            </Provider>
        </Suspense>
    </React.StrictMode>
);

