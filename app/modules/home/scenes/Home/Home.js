import React from 'react';
import {View, Text, ActivityIndicator, ScrollView, TouchableHighlight } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import {Actions} from 'react-native-router-flux';

import {connect} from 'react-redux';

import {actions as home} from "../../index";
const { getQuotes, changeOrder, dropListElement } = home;

import styles from "./styles";
import Quote from "../../components/Quote";

import KeyboardSpacer from 'react-native-keyboard-spacer';

// For sortable list
import SortableList from 'react-native-sortable-list';


// Buttons and indexes for Action Sheet
const options = ['Select Tasks', 'Create a Bucket', 'Cancel'];
const SELECT_BUCKET_TASKS_INDEX = 0;
const GO_TO_BUCKET_INDEX = 1;
const CANCEL_INDEX = options.length - 1;

class Home extends React.Component {
    constructor() {
        super();
        this.state = {}

        this.renderItem = this.renderItem.bind(this);
        this.onChangeOrder = this.onChangeOrder.bind(this);
        this.onReleaseRow = this.onReleaseRow.bind(this);
        this.onSelectColor = this.onSelectColor.bind(this);
    }

    componentDidMount() {
        this.props.getQuotes((error) => alert(error.message))
    }

    renderItem({item, index, active, data}) {
        return <Quote index={index} active={active} data={data}/>
    }

    onChangeOrder(nextOrder) {
        this.props.changeOrder(nextOrder);
    }

    onReleaseRow(key) {
        this.props.dropListElement(key);
    }

    onSelectColor(color) {
        console.log(`This color has been selected: ${color}`);
        // this.setState({color});

        this.ActionSheet.show();
    }

    handlePress(buttonIndex) {
        console.log(`The button index pressed is: ${buttonIndex}`);

        // const { quotes, index } = this.props;
        // const quote = quotes[index];

        if (buttonIndex === SELECT_BUCKET_TASKS_INDEX) {
            // 4 TODO: show next list of options that are scrollable and lazy load
        } else if (buttonIndex === GO_TO_BUCKET_INDEX) {
            // 2 TODO: go to bucket list
            // 3 TODO: This page needs to create tasks
        } else if (buttonIndex === CANCEL_INDEX) {
            // Nothing, just cancels action sheet
        }
    }

    render() {
        if (this.props.isLoading){
            return(
                <View style={styles.activityIndicator}>
                    <ActivityIndicator animating={true}/>
                </View>
            );
        } else {
            const localQuotes = JSON.parse(JSON.stringify(this.props.quotes)) || [];
            const tempBuckets = [
                {color: "#EB623A", title: 'test'}, {color: "#FF553F", title: 'test'}, {color: "#4F6384", title: 'test'}, {color: "#E9C9B4", title: 'test'}, {color: "#F7CDC2", title: 'test'},
                {color: "#EFDFC8", title: 'test'}, {color: "#4E57D4", title: 'test'}, {color: "#E6A78C", title: 'test'},
                {color: "#FE7D72", title: 'test'}, {color: "#5096CF", title: 'test'}, {color: "#F99B70", title: 'test'}, {color: "#646A6A", title: 'test'},
            ];

            return (
                <View style={styles.container}>

                    {/* Plan to pass in the bucketlist here so that there is an ability to choose buckets
                        At some point make buckets sortable too, in order to put most frequent/important ones
                        in the top */}

                    <View style={styles.topContainer}>
                        <ScrollView contentContainerStyle={{alignItems:"center"}}
                                    horizontal showsHorizontalScrollIndicator={true}>
                            {
                                tempBuckets.map((bucket, idx) => {
                                    return (
                                        <TouchableHighlight
                                            key={idx}
                                            underlayColor={"transparent"}
                                            onPress={() => this.onSelectColor(bucket.color)}>
                                            <View style={[
                                                styles.color,
                                                {backgroundColor: bucket.color},
                                                (this.state.color === bucket.color) && {borderWidth: 3, borderColor: "white"}
                                            ]}>
                                                <Text style={[styles.bucketTitle]}>
                                                    {bucket.title}
                                                </Text>
                                            </View>
                                        </TouchableHighlight>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                    

                    {/* 
                        Need to create the CRUD implementations for bucket and task ?
                            - task CRUD has already been implemented however, it is 
                                being used by the main list which it shouldn't be.
                            - The icon that leads to "NewQuote" should be changed to a 
                                sandwich icon
                    */}


                    {/* Then if a bucket has been selected and stored into state
                        render the task selector here (prob another ScrollView component)
                    
                        Each task should have a clickable option for adding it to the main list OR
                        going to the bucket list's tasks

                        (Later) make a hamburger option menu (or ActionSheet to traverse to
                        bucket list/ main list / logout)

                        On Db build UI in parallel with data design,
                        have collection within same collection that has simple description version of items
                        and the heavy detail version of the items also described by the prvious list.
                        (Keeps transactions light)
                    */}

                    {/* 
                        Lastly, work on making time selector + time convertor (possibly need momemnt)
                        And making reminders
                        As well as alarm triggers
                    */}

                   <SortableList
                        style={styles.list}
                        contentContainerStyle={styles.contentContainer}
                        data={localQuotes}
                        renderRow={this.renderItem}
                        onChangeOrder={this.onChangeOrder}
                        onReleaseRow={this.onReleaseRow} />

                    <ActionSheet
                        ref={o => this.ActionSheet = o}
                        options={options}
                        cancelButtonIndex={CANCEL_INDEX}
                        onPress={this.handlePress}
                    />
                    <KeyboardSpacer />
                </View>
            );
        }
    }
}

function mapStateToProps(state, props) {
    return {
        isLoading: state.homeReducer.isLoading,
        quotes: state.homeReducer.quotes    // TODO: can i comment this out?
    }
}

export default connect(mapStateToProps, { getQuotes, changeOrder, dropListElement })(Home);
