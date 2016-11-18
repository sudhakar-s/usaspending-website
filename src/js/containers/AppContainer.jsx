/**
 * AppContainer.jsx
 * Created by Emily Gullo 9/26/2016
 **/
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import kGlobalConstants from 'GlobalConstants';

import StoreSingleton from 'redux/storeSingleton';

import reducers from 'redux/reducers/index';
import HomePage from 'components/HomePage';

import RouterContainer from './router/RouterContainer';


let devExtension;
if (kGlobalConstants.DEV) {
    // only enable Redux debugging in dev mode
    devExtension = window.devToolsExtension ? window.devToolsExtension() : undefined;
}

const store = createStore(reducers, {}, devExtension);

// hold a reference to the store from the store singleton
const storeSingleton = new StoreSingleton();
storeSingleton.setStore(store);

export default class AppContainer extends React.Component {
    constructor(props) {
        super(props);

        // may be unnecessary without a login, re-work in future
        this.state = {
            appReady: true,
            showPending: false
        };
    }

    render() {
        let appContents = <HomePage />;
        if (this.state.appReady || !this.state.showPending) {
            appContents = <RouterContainer store={store} />;
            // appContents = <Router store={store} />;
        }

        return (
            <Provider store={store}>
                {appContents}
            </Provider>
        );
    }
}
