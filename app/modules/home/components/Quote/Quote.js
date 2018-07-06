import React from 'react';

import { 
    Text, 
    View, 
    TouchableOpacity,
    Animated,        // For sortable list
    Easing,
    Platform,
    Image,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';

import { Icon } from 'react-native-elements'
import moment from "moment";

import styles from "./styles"
import { connect } from "react-redux";

import { actions, theme } from "../../index"
import { Actions } from "react-native-router-flux";

const { deleteQuote, toggleLove } = actions;
const { normalize } = theme;

// Buttons and indexes for Action Sheet
const options = [ 'Edit', 'Delete', 'Cancel'];
const CREATE_INDEX = 0;
const DESTRUCTIVE_INDEX = 1;
const CANCEL_INDEX = 2;


class Quote extends React.Component {
    constructor() {
        super();
        this.state = {}

        this.onDelete = this.onDelete.bind(this);
        this.onToggleLove = this.onToggleLove.bind(this);
        this.renderLoveButton = this.renderLoveButton.bind(this);

        this.showActionSheet = this.showActionSheet.bind(this);
        this.handlePress = this.handlePress.bind(this);


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
        const { quotes, index } = this.props;
        const quote = quotes[index];

        if (buttonIndex === CREATE_INDEX) {
            Actions.NewQuote({ edit:true, quote });
        }
        else if (buttonIndex === DESTRUCTIVE_INDEX) {
            this.onDelete();
        }
    }

    onDelete() {
        const { quotes, index } = this.props;
        const quote = quotes[index];

        this.props.deleteQuote(quote, (error) =>  alert(error.message))
    }

    onToggleLove() {
        const { user, quotes, index } = this.props;
        const quote = quotes[index];

        const data = { quote, uid:user.uid };

        this.props.toggleLove(data, (error) =>  alert(error.message))
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
      const { user, quotes, index } = this.props;
      const quote = quotes[index];
      const { loves } = quote;

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

    render() {
      const { user, quotes, index, row, data } = this.props;
      const quote = quotes[index];
      // const { text, author, time, color, userId } = quote;
      const { text, author, time, color, userId } = data;

      if (row) {
        return (
          <Animated.View style={[
              styles.row,
              this._style,
            ]}>
              <Image source={{uri: data.image}} style={styles.image} />
              <Text style={styles.text2}>{data.text}</Text>
          </Animated.View>
        );
      } else {
        return (
          // For Sortable list:
          <Animated.View style={[styles.container, this._style,]}>
            <View style={[styles.wrapper, {backgroundColor: color, borderColor: color}]}>
              <View style={[styles.quote]}>
                <Text style={[styles.text]}>
                  {text}
                </Text>
                {(user.uid === userId) && this.renderOptionButton()}
              </View>

              <View style={styles.bottom}>
                <View style={styles.left}>
                  <Text style={[styles.author]}>
                    {author.name}
                  </Text>
                  <Text style={[styles.publishedAt]}>
                    {moment(time).fromNow()}
                  </Text>
                </View>
                <View style={styles.right}>
                  {this.renderLoveButton()}
                </View>
              </View>
            </View>
          </Animated.View>
        );
      }


    }
}

function mapStateToProps(state, props) {
    return {
        user: state.authReducer.user,
        quotes: state.homeReducer.quotes
    }
}

export default connect(mapStateToProps, { deleteQuote, toggleLove })(Quote);
