import React from 'react';
import {View, FlatList, ActivityIndicator } from 'react-native';

import {connect} from 'react-redux';

import {actions as home} from "../../index"
const { getQuotes } = home;

import styles from "./styles"
import Quote from "../../components/Quote"

class Home extends React.Component {
    constructor() {
        super();
        this.state = {}

        this.renderItem = this.renderItem.bind(this);
    }

    componentDidMount() {
        this.props.getQuotes((error) => alert(error.message))
    }

    renderItem({item, index}) {
        return <Quote index={index}/>
    }

    render() {
        if (this.props.isLoading){
            return(
                <View style={styles.activityIndicator}>
                    <ActivityIndicator animating={true}/>
                </View>
            )
        }else{
            return (
                <View style={styles.container}>
                    <FlatList
                        ref='listRef'
                        data={this.props.quotes}
                        renderItem={this.renderItem}
                        initialNumToRender={5}
                        keyExtractor={(item, index) => index.toString()}/>
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