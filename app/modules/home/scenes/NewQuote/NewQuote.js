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

class NewQuote extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: (props.edit) ? props.quote.text : "",
            color: (props.edit) ? props.quote.color : colors[0],

            title: (props.edit) ? props.quote.title : "",
            description: (props.edit) ? props.quote.description : "",
            deadline: (props.edit) ? props.quote.deadline : "",
            effortPoints: (props.edit) ? props.quote.effortPoints : "",
            priorityLevel: (props.edit) ? props.quote.priorityLevel : "",
        };

        this.onChangeText = this.onChangeText.bind(this);
        this.onSelectColor = this.onSelectColor.bind(this);
    }

    componentDidMount() {
        Actions.refresh({showButton: false});
    }

    onChangeText(text, type) {
        const { color, title, description, deadline, effortPoints, priorityLevel } = this.state;

        const showButton = (
            this.state.title.trim().length > 0
            && this.state.description.trim().length > 0
            && this.state.deadline.trim().length > 0
            && this.state.effortPoints.trim().length > 0
            && this.state.priorityLevel.trim().length > 0
         );

        const edit = (this.props.edit); // check if in edit mode

        let data = {color, edit, title, description, deadline, effortPoints, priorityLevel};

        if (edit) data['quote'] = this.props.quote;

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
                    <TextInput
                        onChangeText={(text) => this.onChangeText(text, 'deadline')}
                        placeholder={"Enter Deadline"}
                        style={[styles.textInput, {backgroundColor: this.state.color}]}
                        value={this.state.deadline}
                        placeholderTextColor={"#ccc"}
                    />
                    <TextInput
                        onChangeText={(text) => this.onChangeText(text, 'effortPoints')}
                        placeholder={"Enter Effort Points"}
                        style={[styles.textInput, {backgroundColor: this.state.color}]}
                        value={this.state.effortPoints}
                        placeholderTextColor={"#ccc"}
                    />
                    <TextInput
                        onChangeText={(text) => this.onChangeText(text, 'priorityLevel')}
                        placeholder={"Enter Priority Level"}
                        style={[styles.textInput, {backgroundColor: this.state.color}]}
                        value={this.state.priorityLevel}
                        placeholderTextColor={"#ccc"}
                    />
                </View>
                <View style={styles.bottomContainer}>
                    <ScrollView contentContainerStyle={{alignItems:"center"}}
                                horizontal showsHorizontalScrollIndicator={false}>
                        {
                            colors.map((color, idx) => {
                                return (
                                    <TouchableHighlight
                                        key={idx}
                                        underlayColor={"transparent"}
                                        onPress={() => this.onSelectColor(color)}>
                                        <View style={[
                                            styles.color,
                                            {backgroundColor: color},
                                            (this.state.color === color) && {borderWidth: 3, borderColor: "white"}
                                        ]}/>
                                    </TouchableHighlight>
                                )
                            })
                        }
                    </ScrollView>
                </View>
                <KeyboardSpacer />
            </View>
        );
    }
}

export default connect(null, {})(NewQuote);