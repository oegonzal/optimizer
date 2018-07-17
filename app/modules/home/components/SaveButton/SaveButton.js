import React from 'react';

import { View, TouchableOpacity } from 'react-native';

import {Actions} from 'react-native-router-flux'
import {Icon} from 'react-native-elements'

import styles from "./styles"
import {connect} from "react-redux";

import {actions as home, theme} from "../../index"
const { addQuote, updateQuote } = home;
const { normalize } = theme;

class SaveButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.onPress = this.onPress.bind(this)
    }

    onPress() {
        const { data } = this.props;
        const { edit } = data;

        if (edit) this.editQuote()
        else this.saveQuote()
    }

    editQuote() {
        let { data } = this.props;
        const { color, quote, title, description, deadline, effortPoints, priorityLevel } = data;

        quote['color'] = color;
        quote['title'] = title;
        quote['description'] = description;
        quote['deadline'] = deadline;
        quote['effortPoints'] = effortPoints;
        quote['priorityLevel'] = priorityLevel;

        this.props.updateQuote(quote, this.onSuccess, this.onError)
    }

    saveQuote() {
        const { data, user } = this.props;
        const {color, title, description, deadline, effortPoints, priorityLevel } = data;

        const newQuote = {
            color,
            time: Date.now(),
            userId: user.uid,
            loveCount: 0,
            author: {
                name: user.username
            },
            title,
            description,
            deadline,
            effortPoints,
            priorityLevel
        };

        // Remove
        console.log('Save quote from button, newQuote: ');
        console.log(newQuote);

        this.props.addQuote(newQuote, this.onSuccess, this.onError);
    }

    onSuccess() {
        Actions.pop();
    }

    onError(error) {
        alert(error.message)
    }

    render() {
        return (
            <TouchableOpacity onPress={this.onPress}>
                <View style={styles.wrapper}>
                    <Icon name={"md-send"}
                          type={"ionicon"}
                          size={25}
                          iconStyle={styles.icon}
                          color={"rgba(0,0,0,.84)"}/>
                </View>
            </TouchableOpacity>
        )
    }
}


function mapStateToProps(state, props) {
    return {
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps, { addQuote, updateQuote })(SaveButton);