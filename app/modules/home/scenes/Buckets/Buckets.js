import React from 'react';
import {View, FlatList, ActivityIndicator } from 'react-native';

import {connect} from 'react-redux';

import {actions as home} from "../../index";
const { getBucketsBasic } = home;

import styles from "./styles";
import Bucket from "../../components/Bucket";

// For sortable list
import SortableList from 'react-native-sortable-list';

class Buckets extends React.Component {
    constructor() {
        super();
        this.state = {};

        // REMOVE
        console.log(`Inside buckets list....`);

        this.renderItem = this.renderItem.bind(this);
    }

    componentDidMount() {
        const params = { userId: this.props.user.uid };
        this.props.getBucketsBasic(params, (error) => alert(error.message));
    }

    renderItem({item, index, active, data}) {
        console.log(`Bucket index is: ${index}`);
        return <Bucket index={index} active={active} data={data}/>
    }

    render() {

        // REMOVE
        console.log(`Rendering buckets list page....`);

        if (this.props.isLoading){
            return(
                <View style={styles.activityIndicator}>
                    <ActivityIndicator animating={true}/>
                </View>
            );
        } else {
            // REMOVE
            console.log(`Here are the buckets...`);
            console.log(this.props.buckets);

            const localBuckets = JSON.parse(JSON.stringify(this.props.buckets)) || [];

            // REMOVE
            console.log(localBuckets);

            return (

                // TODO: Need to make sure data going in here is coming from bucket API

                <View style={styles.container}>
                   <SortableList
                        style={styles.list}
                        contentContainerStyle={styles.contentContainer}
                        data={localBuckets}
                        renderRow={this.renderItem} />
                </View>
            );
        }
    }
}

// TODO: get buckets and add them to this component
/**
 * How is data retrieved and stored in the store object
 * 
 */

function mapStateToProps(state, props) {
    return {
        isLoading: state.homeReducer.isLoading,
        buckets: state.homeReducer.buckets,
        user: state.authReducer.user,
    }
}

// TODO: Get buckets & do we need changeOrder & dropListElement? Are the items being stored in order?
export default connect(mapStateToProps, { getBucketsBasic })(Buckets);
