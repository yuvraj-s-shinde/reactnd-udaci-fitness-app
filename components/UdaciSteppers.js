import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { FontAwesome, Entypo }from '@expo/vector-icons'
import { purple, white } from '../utils/colors'

export default function UdaciSteppers ({ value, max, step, onIncrement, onDecrement, unit }) {
    return(
    <View style={[styles.row, {justifyContent: 'space-between'}]}>
        {Platform.OS === 'ios' ?
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={onDecrement}
                style={[styles.iosBtn, {borderTopRightRadius: 0, borderBottomRightRadius: 0}]}>
                    <Entypo name="minus" size={30} color={purple}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={onIncrement}
                style={[styles.iosBtn, {borderTopLeftRadius: 0, borderBottomLeftRadius: 0}]}>
                    <Entypo name="plus" size={30} color={purple}/>
                </TouchableOpacity>
            </View>
        :   <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={onDecrement}
                style={[styles.androidButton, {borderTopRightRadius: 0, borderBottomRightRadius: 0}]}>
                    <FontAwesome name="minus" size={30} color={white}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={onIncrement}
                style={[styles.androidButton, {borderTopLeftRadius: 0, borderBottomLeftRadius: 0}]}>
                    <FontAwesome name="plus" size={30} color={white}/>
                </TouchableOpacity>
            </View>
        }
        <View style={styles.metricCounter}>
            <Text>{value}</Text>
            <Text>{unit}</Text>
        </View>
    </View>
    )
}

const styles = StyleSheet.create ({
    row: {
       flex: 1,
       flexDirection: 'row',
       alignItems: 'center',
    },
    iosBtn: {
        backgroundColor: white,
        borderColor: purple,
        borderRadius: 3,
        borderWidth: 1,
        padding: 5,
        paddingLeft: 25,
        paddingRight: 25,
    },  
    androidButton: {
        margin: 5,
        backgroundColor: purple,
        padding: 10,
        borderRadius: 2,
    },
    metricCounter: {
        width: 85,
        justifyContent: 'center',
        alignItems: 'center',
    }
})