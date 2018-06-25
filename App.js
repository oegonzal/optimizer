
// 'use strict';
// import {
//   StackNavigator,
// } from 'react-navigation';

// import SearchPage from './src/components/SearchPage';
// import SearchResults from './src/components/SearchResults';
// import PropertyView from './src/components/PropertyView';

// const App = StackNavigator({
//   Home: { screen: SearchPage },
//   Results: { screen: SearchResults },
//   Property: { screen: PropertyView},
// });
// export default App;


import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Font, AppLoading } from 'expo';

import Router from './app/config/routes'
import store from './app/redux/store';

function cacheFonts(fonts) {
    return fonts.map(font => Font.loadAsync(font));
}

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
        }
    }

    async _loadAssetsAsync() {
        const fontAssets = cacheFonts([
            {RobotoExtraBold: require('./app/assets/fonts/Roboto/Roboto-Black.ttf')},
            {RobotoBold: require('./app/assets/fonts/Roboto/Roboto-Bold.ttf')},
            {RobotoMedium: require('./app/assets/fonts/Roboto/Roboto-Medium.ttf')},
            {RobotoRegular: require('./app/assets/fonts/Roboto/Roboto-Regular.ttf')},
            {RobotoLight: require('./app/assets/fonts/Roboto/Roboto-Light.ttf')}
        ]);

        await Promise.all([...fontAssets]);
    }

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._loadAssetsAsync}
                    onFinish={() => this.setState({isReady: true})}
                    onError={console.warn}
                />
            );
        }
        
        return (
            <Provider store={store}>
                    <Router/>
            </Provider>
        );
    }
}