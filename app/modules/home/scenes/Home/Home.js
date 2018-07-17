import React from 'react';
import {View, FlatList, ActivityIndicator } from 'react-native';

import {connect} from 'react-redux';

import {actions as home} from "../../index"
const { getQuotes, changeOrder, dropListElement } = home;

import styles from "./styles"
import Quote from "../../components/Quote"

// For sortable list
import SortableList from 'react-native-sortable-list';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {}

        this.renderItem = this.renderItem.bind(this);
        this.onChangeOrder = this.onChangeOrder.bind(this);
        this.onReleaseRow = this.onReleaseRow.bind(this);
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

    render() {
        if (this.props.isLoading){
            return(
                <View style={styles.activityIndicator}>
                    <ActivityIndicator animating={true}/>
                </View>
            );
        } else {
            const localQuotes = JSON.parse(JSON.stringify(this.props.quotes)) || [];
            return (
                <View style={styles.container}>

                    {/* Plan to pass in the bucketlist here so that there is an ability to choose buckets
                        At some point make buckets sortable too, in order to put most frequent/important ones
                        in the top */}

                    {/* <View style={styles.bottomContainer}>
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
                    <KeyboardSpacer /> */}

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
                </View>
            );
        }
    }
}

function mapStateToProps(state, props) {
    return {
        isLoading: state.homeReducer.isLoading,
        quotes: state.homeReducer.quotes
    }
}

export default connect(mapStateToProps, { getQuotes, changeOrder, dropListElement })(Home);
