import {
    StyleSheet,
    Platform,    // For sortable list
    Dimensions,
} from 'react-native';
import {theme} from "../../index"

const { padding, normalize, color, fontFamily } = theme;
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
    },

    topContainer:{
        height: normalize(49)
    },

    color:{
        height: normalize(25),
        width: normalize(25),
        borderRadius: normalize(25/2),
        marginHorizontal: padding
    },

    bucketTitle:{
        fontSize: normalize(14),
        lineHeight: normalize(19),
        color: color.white,
        fontWeight: "500",
        fontFamily: fontFamily.medium
    },
});

export default styles;