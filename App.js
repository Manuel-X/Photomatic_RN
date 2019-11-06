import React from 'react';

import MyStack from "./Navigation";



import { Provider } from "react-redux";
import { AppLoading, Font } from 'expo';

import store from "./store";

export default class App extends React.Component {
    state = {
        fontLoaded: false
      };

    async componentDidMount() {
        console.disableYellowBox = true
        try{
        await Expo.Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
        this.setState({ fontLoaded: true });
    } catch (error) {
        console.log('error loading icon fonts', error);

    }

        
      }

    render() {
        if (!this.state.fontLoaded) {
            return <AppLoading />;
          }
        return (
            <Provider store={store}>
                 <MyStack />
            </Provider>
       );
    };
};