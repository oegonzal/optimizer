import React from 'react';

import { 
    Text, 
    View, 
    TouchableOpacity,
    Animated,        // For sortable list
    Easing,
    Platform,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';

import { Icon } from 'react-native-elements';
import moment from "moment";

import styles from "./styles";
import { connect } from "react-redux";

import { actions, theme } from "../../index";
import { Actions } from "react-native-router-flux";

const { deleteQuote, toggleLove, updateListOrder } = actions;
const { normalize } = theme;


// TODO: Make sure these options work
// Buttons and indexes for Action Sheet
const options = [ 'Save List Order', 'Edit', 'Delete', 'Cancel' ];
const SAVE_ORDER_INDEX  = 0;
const CREATE_INDEX = 1;
const DESTRUCTIVE_INDEX = 2;
const CANCEL_INDEX = 3;



class Bucket extends React.Component {
    constructor() {
        super();
        this.state = {}

        // REMOVE
        console.log(`Inside a new bucket....`);

        this.onDelete = this.onDelete.bind(this);
        this.onToggleLove = this.onToggleLove.bind(this);
        this.renderLoveButton = this.renderLoveButton.bind(this);

        this.showActionSheet = this.showActionSheet.bind(this);
        this.handlePress = this.handlePress.bind(this);
        this.renderDescription = this.renderDescription.bind(this);

        // For sortable list
        this._active = new Animated.Value(0);
        this._style = {
            ...Platform.select({
                ios: {
                transform: [{
                    scale: this._active.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.1],
                    }),
                }],
                shadowRadius: this._active.interpolate({
                    inputRange: [0, 1],
                    outputRange: [2, 10],
                }),
                },

                android: {
                transform: [{
                    scale: this._active.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.07],
                    }),
                }],
                elevation: this._active.interpolate({
                    inputRange: [0, 1],
                    outputRange: [2, 6],
                }),
                },
            })
        };
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.active !== nextProps.active) {
        Animated.timing(this._active, {
          duration: 300,
          easing: Easing.bounce,
          toValue: Number(nextProps.active),
        }).start();
      }
    }

    showActionSheet() {
        this.ActionSheet.show();
    }

    handlePress(buttonIndex) {
        const { buckets, index } = this.props;
    }

    onDelete() {
        const { buckets, index } = this.props;
        const bucket = buckets[index];
		    const params = { bucket, user: this.state.user };

		// TODO: remove bucket
        this.props.deleteBucket(params, (error) =>  alert(error.message))
    }

    onToggleLove() {
        const { user, buckets, index } = this.props;
        const bucket = buckets[index];

        const data = { bucket, uid:user.uid };

        // this.props.toggleLove(data, (error) =>  alert(error.message))
    }

    renderOptionButton() {
      return(
        <View style={styles.right}>
          <TouchableOpacity onPress={this.showActionSheet}>
            <View style={styles.buttonContainer}>
              <Icon
                name={'md-more'}
                type='ionicon'
                color='#fff'
                size={normalize(20)}
              />
            </View>
          </TouchableOpacity>
          <ActionSheet
            ref={o => this.ActionSheet = o}
            options={options}
            cancelButtonIndex={CANCEL_INDEX}
            destructiveButtonIndex={DESTRUCTIVE_INDEX}
            onPress={this.handlePress}
          />
        </View>
      )
    }

    renderLoveButton(){
      const { user, buckets, index } = this.props;
      const bucket = buckets[index];
      const { loves } = bucket;

      return(
        <TouchableOpacity onPress={this.onToggleLove}>
          <View style={styles.buttonContainer}>
            <Icon
              name={
                (loves && loves[user.uid]) ?
                  'md-heart'
                  :
                  'md-heart-outline'
              }
              type='ionicon'
              color='#fff'
              iconStyle={{height:normalize(20)}}
              size={normalize(20)}
            />
          </View>
        </TouchableOpacity>
      )
    }

    renderDescription(description) {
      return (
        <View style={[styles.bucket]}>
          <Text style={[styles.text]}>
            {description}
          </Text>
        </View>
      );
    }

    renderBucketDetails() {
      return (
        <View style={styles.bottom}>
          <View style={styles.left}>
            <Text style={[styles.author]}>
              {data.user.username}
            </Text>
            <Text style={[styles.publishedAt]}>
              {moment(time).fromNow()}
            </Text>
          </View>
        </View>
      );
    }

    render() {
      const { user, data } = this.props;
      const { title, description, time, color } = data;

      return (
		// TODO: Now make these buckets show up correctly

        // For Sortable list:
        <Animated.View style={[styles.container, this._style,]}>
          <View style={[styles.wrapper, {backgroundColor: color, borderColor: color}]}>
            <View style={[styles.bucket]}>
              <Text style={[styles.text]}>
                {title}
              </Text>
              {(data.user && user.uid === data.user.uid) && this.renderOptionButton()}
            </View>

            {!!description && this.renderDescription(description)}

            {data.user && this.renderBucketDetails()}
          </View>
        </Animated.View>
      );
    }
}

// TODO: change this to buckets

function mapStateToProps(state, props) {
    return {
        user: state.authReducer.user,
        buckets: state.homeReducer.buckets
    }
}

// TODO: 
// Add the delete feature
// Add save list order ability

export default connect(mapStateToProps, { deleteQuote, toggleLove, updateListOrder })(Bucket);
