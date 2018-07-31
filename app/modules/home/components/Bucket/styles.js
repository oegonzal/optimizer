import { StyleSheet, Dimensions, Platform } from 'react-native';

import { theme } from "../../index"

const {padding, color, fontFamily, normalize } = theme;
const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
        padding: padding,
        flex:1,
    },

    wrapper:{
        flex:1,
        borderWidth:1,
        borderRadius: 8,
        padding : normalize(8 * 2.5),

        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, .4)',
                shadowOffset: { height: 1, width: 1 },
                shadowOpacity: 1,
                shadowRadius: 1,
            },
            android: {
                elevation: 2,
            },
        }),
    },

    bucket:{
        marginBottom: padding * 2,
        flexDirection: "row"
    },

    text:{
        fontSize: normalize(17),
        lineHeight: normalize(21),
        color: color.white,
        letterSpacing: .5,
        fontFamily: fontFamily.medium,
        flex:1
    },

    image: {
        width: 50,
        height: 50,
        marginRight: 30,
        borderRadius: 25,
    },

    text2: {
        fontSize: 24,
        color: '#222222',
    },

    bottom:{
        flexDirection: "row",
        marginTop: padding * 2,
        justifyContent:"center"
    },

    left:{
        flex:1,
        justifyContent:"center"
    },

    author:{
        fontSize: normalize(14),
        lineHeight: normalize(19),
        color: color.white,
        fontWeight: "500",
        fontFamily: fontFamily.medium
    },

    publishedAt:{
        fontSize: normalize(12),
        lineHeight: normalize(17),
        color: color.white,
        fontFamily: fontFamily.regular
    },

    buttonContainer:{
        paddingHorizontal:15,
        flexDirection: "row",
        alignItems:"center",
    },

    right:{
        marginRight: -(normalize(8 * 2.5)),
        justifyContent:"center",
        alignItems:"center",
        width: 54,
        height: 34,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        height: 80,
        flex: 1,
        marginTop: 7,
        marginBottom: 12,
        borderRadius: 4,
    
    
        ...Platform.select({
          ios: {
            width: window.width - 30 * 2,
            shadowColor: 'rgba(0,0,0,0.2)',
            shadowOpacity: 1,
            shadowOffset: {height: 2, width: 2},
            shadowRadius: 2,
          },
    
          android: {
            width: window.width - 30 * 2,
            elevation: 0,
            marginHorizontal: 30,
          },
        })
    },
});


export default styles;