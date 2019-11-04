import React from 'react';

import MyStack from "./Navigation";
import { Provider } from "react-redux";

import store from "./store";
import Test from './Components/ImagesList/test'

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                 <MyStack />
            </Provider>
       );
    };
};