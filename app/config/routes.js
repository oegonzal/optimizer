import React from 'react';
import {Scene, Router, ActionConst, Stack, Modal, Tabs, Actions}
    from 'react-native-router-flux';

import {connect} from 'react-redux';

//Splash Component
import Splash from '../components/Splash/Splash';

//Authentication Scenes
import Welcome from '../modules/auth/scenes/Welcome';
import Register from '../modules/auth/scenes/Register';
import CompleteProfile from '../modules/auth/scenes/CompleteProfile';
import Login from '../modules/auth/scenes/Login';
import ForgotPassword from '../modules/auth/scenes/ForgotPassword';
import Home from '../modules/home/scenes/Home';
import NewQuote from '../modules/home/scenes/NewQuote';
import NewBucket from '../modules/home/scenes/NewBucket';
import Buckets from '../modules/home/scenes/Buckets';

import NavButton from '../components/NavButton';
import SaveButton from '../modules/home/components/SaveButton';

//Import Store, actions
import store from '../redux/store';
import { checkLoginStatus, logoutFromSession } from "../modules/auth/actions";

import {color, navTitleStyle} from '../styles/theme';

import { sceneTypes } from '../services/Types';

/**
 * Consider putting the sandwhich icon on the right side of the header
 * then opening the action sheet with the different options
 */

class RouterCmp extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
            isLoggedIn: false
        }

        this.renderLogoutButton = this.renderLogoutButton.bind(this);
        this.logout = this.logout.bind(this);
        // this.onPressShowActionSheet = this.onPressShowActionSheet.bind(this);
    }

    componentDidMount() {
        let _this = this;
        store.dispatch(checkLoginStatus((isLoggedIn) => {
            _this.setState({isReady: true, isLoggedIn});
        }));
    }

    renderAddButton(props) {
        return (
            <NavButton onPress={Actions.NewQuote}
                       name={"plus"}
                       type={"entypo"}
                       color={color.black}/>
        )
    }

    renderCloseButton(props) {
        return (
            <NavButton onPress={Actions.pop}
                       name={"md-close"}
                       type={"ionicon"}
                       color={color.black}/>
        )
    }

    renderLogoutButton(props) {
        return (
            <NavButton onPress={this.logout}
                       name={"logout"}
                       type={"simple-line-icon"}
                       color={color.black}/>
        )
    }

    onPressShowActionSheet(navType) {
        return (
            <NavButton navType={navType}
                       onPress={() => {}}
                       name={"md-more"}
                       type={"ionicon"}
                       color={color.black}/>
        )
    }

    renderSaveButton(props) {
        if (props.showButton) return (<SaveButton data={props.data}/>);
        else return null;
    }

    logout() {
        logoutFromSession();
        this.setState(prevState => {
            return { isLoggedIn: false };
        });
        Actions.Auth();
    }

    render() {
        if (!this.state.isReady)
            return <Splash/>

        return (
            <Router>
                <Modal>
                    <Scene key="root"
                           hideNavBar
                           navigationBarStyle={{backgroundColor: "#fff"}}
                           titleStyle={navTitleStyle}
                           backButtonTintColor={color.black}>

                        <Stack key="Auth" initial={!this.state.isLoggedIn}>
                            <Scene key="Welcome" component={Welcome} title="" initial={true} hideNavBar/>
                            <Scene key="Register" component={Register} title="Register" back/>
                            <Scene key="CompleteProfile" component={CompleteProfile} title="Select Username"
                                   back={false}/>
                            <Scene key="Login" component={Login} title="Login"/>
                            <Scene key="ForgotPassword" component={ForgotPassword} title="Forgot Password"/>
                        </Stack>

                        <Stack key="Main" initial={this.state.isLoggedIn}>
                            <Scene key="Home"
                                   component={Home} 
                                   title="Home" 
                                   initial={true} 
                                   type={ActionConst.REPLACE}
                                   renderLeftButton={this.renderLogoutButton}
                                   renderRightButton={() => this.onPressShowActionSheet(sceneTypes.HOME)}/>
                            <Scene key="Buckets"
                                    component={Buckets} 
                                    title="Buckets"
                                    type={ActionConst.REPLACE}
                                    renderRightButton={() => this.onPressShowActionSheet(sceneTypes.BUCKETS)}/>
                            <Scene key="NewQuote"
                                    navigationBarStyle={{backgroundColor: "#fff"}}
                                    titleStyle={navTitleStyle}
                                    component={NewQuote}
                                    title="New Quote"
                                    renderLeftButton={this.renderCloseButton}
                                    renderRightButton={this.renderSaveButton}/>
                            <Scene key="NewBucket"
                                    navigationBarStyle={{backgroundColor: "#fff"}}
                                    titleStyle={navTitleStyle}
                                    component={NewBucket}
                                    title="New Bucket"
                                    renderLeftButton={this.renderCloseButton}
                                    renderRightButton={this.renderSaveButton}/>
                        </Stack>
                    </Scene>
                </Modal>
            </Router>
        )
    }
}

// I have to connect logout state & trigger to logout through prop
export default connect(null, null)(RouterCmp);