import React from 'react';
import PropTypes from 'prop-types'

import { View, TouchableOpacity } from 'react-native';

import ActionSheet from 'react-native-actionsheet';

import {Icon} from 'react-native-elements'

import styles from "./styles"


// Buttons and indexes for Action Sheet
const options = [ 'Select Tasks', 'Go to Bucket', 'Create a Bucket', 'Cancel'];
const SELECT_BUCKET_TASKS_INDEX = 0;
const GO_TO_BUCKET_INDEX = 1;
const CREATE_A_BUCKET_INDEX = 2;
const CANCEL_INDEX = 3;


class NavButton extends React.Component {
    constructor() {
        super();
        this.showOptions = this.showOptions.bind(this);
    }

    showOptions(color) {
        this.ActionSheet.show();
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