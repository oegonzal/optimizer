import React from 'react';
import {View, FlatList, ActivityIndicator } from 'react-native';

import {connect} from 'react-redux';

import {actions as home} from "../../index"
const { getQuotes, changeOrder, dropListElement } = home;

import styles from "./styles"
import Quote from "../../components/Quote"

// For sortable list
import SortableList from 'react-native-sortable-list';

/**
 * Need to save order of the list,
 * Not sure how to do this yet
 * 
 */

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
