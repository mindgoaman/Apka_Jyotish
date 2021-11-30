import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import React from 'react';
import { Provider } from "react-redux";
import configureStore from "./src/redux/store/store";

const store = configureStore();

const AppkajyotishApp = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => AppkajyotishApp);
