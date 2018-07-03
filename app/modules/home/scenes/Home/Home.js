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

    renderItem({item, index, active}, row = false) {
        return <Quote index={index} active={active} row={row} />
    }

    onChangeOrder(nextOrder) {
        this.props.changeOrder(nextOrder);
    }

    onReleaseRow(key) {
        this.props.dropListElement(key);
        // Show a save option Or query to firebase db to save current list

    }

    // Bug: List is rerendering because when state changes the rerender function is called
    // Bug: why is the list not swapping correctly?

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
                        data={simple_data}
                        renderRow={(obj) => this.renderItem(obj, true) } />

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

const simple_data = {
	0: {
		image: 'https://placekitten.com/200/240',
		text: 'Chloe',
	},
	1: {
		image: 'https://placekitten.com/200/201',
		text: 'Jasper',
	},
	2: {
		image: 'https://placekitten.com/200/202',
		text: 'Pepper',
	},
	3: {
		image: 'https://placekitten.com/200/203',
		text: 'Oscar',
	},
	4: {
		image: 'https://placekitten.com/200/204',
		text: 'Dusty',
	},
	5: {
		image: 'https://placekitten.com/200/205',
		text: 'Spooky',
	},
	6: {
		image: 'https://placekitten.com/200/210',
		text: 'Kiki',
	},
	7: {
		image: 'https://placekitten.com/200/215',
		text: 'Smokey',
	},
	8: {
		image: 'https://placekitten.com/200/220',
		text: 'Gizmo',
	},
	9: {
		image: 'https://placekitten.com/220/239',
		text: 'Kitty',
	},
};