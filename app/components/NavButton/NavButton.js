import React from 'react';
import PropTypes from 'prop-types';

import { View, TouchableOpacity } from 'react-native';

import ActionSheet from 'react-native-actionsheet';

import {Icon} from 'react-native-elements';

import {Actions} from 'react-native-router-flux';

import styles from "./styles";

let actionSheetIndexes = {};

import { sceneTypes } from '../../services/Types';


class NavButton extends React.Component {
    constructor() {
        super();
        this.showOptions = this.showOptions.bind(this);
        // this.handlePress = this.handlePress.bind(this);
    }

    showOptions(color) {
        this.ActionSheet.show();
    }

    generateActionOptions(navType) {
        switch(navType) {
            case sceneTypes.HOME: {
                const opts = ['Create a Bucket', 'Bucket List', 'Save', 'Cancel'];
                actionSheetIndexes = {
                    CREATE_A_BUCKET_INDEX: 0,
                    BUCKET_LIST_INDEX: 1,
                    SAVE_INDEX: 2,
                    CANCEL_INDEX: opts.length - 1
                };
                return opts;
            }
            case sceneTypes.BUCKETS: {
                const opts = ['Create a Bucket', 'Home', 'Save', 'Cancel'];
                actionSheetIndexes = {
                    CREATE_A_BUCKET_INDEX: 0,
                    HOME_LIST_INDEX: 1,
                    SAVE_INDEX: 2,
                    CANCEL_INDEX: opts.length - 1,
                };
                return opts;
            }
            default: return [];
        }
    }

    getHandlePressFn(navType){
        switch(navType) {
            case sceneTypes.HOME: {
                const fn =
                    (buttonIndex) => {
                        if (buttonIndex === actionSheetIndexes.CREATE_A_BUCKET_INDEX) {
                            Actions.NewBucket();
                        } else if (buttonIndex === actionSheetIndexes.BUCKET_LIST_INDEX) {
                            Actions.Buckets();
                        } else if (buttonIndex === actionSheetIndexes.SAVE_INDEX) {
                            console.log(`Order has been saved for home items`);
                        }
                    }
                return fn;
            }
            case sceneTypes.BUCKETS: {
                const fn =
                    (buttonIndex) => {
                        if (buttonIndex === actionSheetIndexes.CREATE_A_BUCKET_INDEX) {
                            Actions.NewBucket();
                        } else if (buttonIndex === actionSheetIndexes.HOME_LIST_INDEX) {
                            Actions.Home();
                        } else if (buttonIndex === actionSheetIndexes.SAVE_INDEX) {
                            console.log(`Order has been saved for bucket items`);
                        }
                    }
                return fn;
            }
            default: return () => {};
        }
    }

    render() {
        const { name, type, size, color, onPress, text, buttonText, navType } = this.props;
        const onPressCb = (navType) ? this.showOptions : onPress;
        const navOptions = (navType) ? this.generateActionOptions(navType) : [];
        const handlePressFn = this.getHandlePressFn(navType);

        return (
            <TouchableOpacity onPress={onPressCb}>
                <View style={styles.wrapper}>
                    {
                        (!text) ?
                            <Icon name={name}
                                  type={type}
                                  size={size}
                                  iconStyle={{height: size}}
                                  color={color}/>
                            :
                            <Text>{buttonText}</Text>
                    }

                    <ActionSheet
                        ref={o => this.ActionSheet = o}
                        options={navOptions}
                        cancelButtonIndex={actionSheetIndexes.CANCEL_INDEX}
                        onPress={handlePressFn}
                    />
                </View>
            </TouchableOpacity>
        )
    }
}

NavButton.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.number,
    onPress: PropTypes.func.isRequired
}


NavButton.defaultProps = {
    name: "ios-settings",
    type: "ionicon",
    size: 26,
    color: "rgba(0,0,0,.84)",
    onPress: null,
    buttonText: "",
    text: false
}

export default NavButton;