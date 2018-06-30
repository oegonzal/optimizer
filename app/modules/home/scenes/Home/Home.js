import React from 'react';
import {View, FlatList, ActivityIndicator } from 'react-native';

import {connect} from 'react-redux';

import {actions as home} from "../../index"
const { getQuotes } = home;

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

    renderItem({item, index, active}) {
        return <Quote index={index} active={active}/>
    }

    onChangeOrder(nextOrder) {
        // TODO: Call action to change state in redux store only
    }

    onReleaseRow(key) {
        // TODO: Save state in remote firebase db too
    }

    render() {
        if (this.props.isLoading){
            return(
                <View style={styles.activityIndicator}>
                    <ActivityIndicator animating={true}/>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                   <SortableList
                        style={styles.list}
                        contentContainerStyle={styles.contentContainer}
                        data={this.props.quotes}
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

export default connect(mapStateToProps, { getQuotes })(Home);