import React from 'react';
import { View, TextInput, ScrollView, TouchableHighlight } from 'react-native';

import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import styles from "./styles"

const colors = [
    "#EB623A", "#FF553F", "#4F6384", "#E9C9B4", "#F7CDC2",
    "#EFDFC8", "#4E57D4", "#E6A78C",
    "#FE7D72", "#5096CF", "#F99B70", "#646A6A",
];

class NewBucket extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
			title: (props.edit) ? props.quote.title : "",
			description: (props.edit) ? props.quote.description : "",
            color: (props.edit) ? props.quote.color : colors[0],
        };

        this.onChangeText = this.onChangeText.bind(this);
        this.onSelectColor = this.onSelectColor.bind(this);
    }

    componentDidMount() {
        Actions.refresh({showButton: false});
    }

    onChangeText(text, type) {
        const { color, title, description } = this.state;

        const showButton = (
            this.state.title.trim().length > 0
            && this.state.description.trim().length > 0
         );

		const edit = (this.props.edit); // check if in edit mode
		const isBucket = true;

        let data = {color, edit, title, description, isBucket };

        if (edit) data['bucket'] = this.props.bucket;

        const newStateSection = {};
        newStateSection[type] = text;
        this.setState(newStateSection);

        Actions.refresh({showButton, data});
    }

    onSelectColor(color) {
        this.setState({color});
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <TextInput
                        onChangeText={(text) => this.onChangeText(text, 'title')}
                        placeholder={"Enter Title"}
                        style={[styles.textInput, { backgroundColor: this.state.color }]}
                        value={this.state.title}
                        autoFocus={true}
                        placeholderTextColor={"#ccc"}
                    />
                    <TextInput
                        multiline={true}
                        onChangeText={(text) => this.onChangeText(text, 'description')}
                        placeholder={"Enter Description"}
                        style={[styles.textInput, {backgroundColor: this.state.color}]}
                        value={this.state.description}
                        placeholderTextColor={"#ccc"}
                    />
                </View>
                <KeyboardSpacer />
            </View>
        );
    }
}

export default connect(null, {})(NewBucket);