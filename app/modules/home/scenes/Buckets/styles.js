import {
    StyleSheet,
    Platform,    // For sortable list
    Dimensions,
} from 'react-native';
import {theme} from "../../index"

const { normalize } = theme;
const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    
    contentContainer: {
        width: window.width,
        ...Platform.select({
            ios: {
                paddingHorizontal: 30,
            },

            android: {
                paddingHorizontal: 0,
            }
        })
    },

    list: {
        flex: 1,
    },

    activityIndicator:{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "center"
    }
});

export default styles;