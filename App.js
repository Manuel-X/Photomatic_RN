import React from 'react';

import MyStack from "./Navigation";
import { Provider } from "react-redux";

import store from "./store";
import ImagesList from './Components/ImagesList/'

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                 <MyStack />
            </Provider>
       );
    };
};