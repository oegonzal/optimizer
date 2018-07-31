import React from 'react';
import PropTypes from 'prop-types';

import { View, TouchableOpacity } from 'react-native';

import ActionSheet from 'react-native-actionsheet';

import {Icon} from 'react-native-elements';

import {Actions} from 'react-native-router-flux';

import styles from "./styles";

// TODO: Add save order functionality here!
// Buttons and indexes for Action Sheet
const options = [ 'Create a Bucket', 'Bucket List', 'Save', 'Cancel'];
const CREATE_A_BUCKET_INDEX = 0;
const BUCKET_LIST_INDEX = 1;
const SAVE_INDEX = 2;
const CANCEL_INDEX = options.length - 1;


class NavButton extends React.Component {
    constructor() {
        super();
        this.showOptions = this.showOptions.bind(this);
        this.handlePress = this.handlePress.bind(this);
    }

    showOptions(color) {
        this.ActionSheet.show();
    }

    handlePress(buttonIndex) {
        if (buttonIndex === CREATE_A_BUCKET_INDEX) {
            // 1 TODO: go to create a bucket page
            Actions.NewBucket();
        } else if (buttonIndex === BUCKET_LIST_INDEX) {
            Actions.Buckets();
        }
    }

    render() {
        const { name, type, size, color, onPress, text, buttonText, appNav } = this.props;
        const onPressCb = (appNav) ? this.showOptions : onPress;

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
                        options={options}
                        cancelButtonIndex={CANCEL_INDEX}
                        onPress={this.handlePress}
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