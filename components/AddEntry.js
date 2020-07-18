import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { getMetricMetaInfo, timeToString, getDailyReminderValue } from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import TextButton from './TextButton'
import DateHeaders from './DateHeaders'
import { Ionicons } from '@expo/vector-icons'
import { submitEntry, removeEntry } from '../utils/api'
import { connect } from 'react-redux'
import { addEntry } from '../actions'
import { purple, white } from '../utils/colors'
import { NavigationActions } from 'react-navigation'

const SubmitBtn = ({ onPress }) => {
        return(
            <TouchableOpacity onPress={onPress}
            style={Platform.OS === 'ios' ? styles.submitButtonIos : styles.submitButtonAndroid}>
                <Text style={styles.submitBtnText}>Submit</Text>
            </TouchableOpacity>
        )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: white,
    },
    submitButtonIos : {
        padding: 10,
        marginLeft: 40,
        marginRight: 40,
        borderRadius: 7,
        height: 45,
        backgroundColor: purple
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    submitButtonAndroid: {
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        borderRadius: 2,
        height: 45,
        backgroundColor: purple,
        alignItems: 'center'
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',        
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,
        marginLeft: 30,
    }
})

class AddEntry extends Component {
    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0
    }

    increment = (metric) => {
        const { max, step } = getMetricMetaInfo(metric)

        this.setState ((state) => {
            const count = state[metric] + step
            
            return {
                ...state,
                [metric]: count > max ? max : count
            }
        })
    }

    decrement = (metric) => {
        const { step } = getMetricMetaInfo(metric)

        this.setState ((state) => {
            const count = state[metric] - step
            
            return {
                ...state,
                [metric]: count < 0 ? 0 : count
            }
        })
    }

    slider = (metric, value) => {
        this.setState(() => ({
            [metric]: value
        }))
    }

    toHome = () => {
        this.props.navigation.goBack()
    }

    submit = () => {
        const key = timeToString()
        const entry = [this.state]

        // update redux
        this.props.dispatch(addEntry({
            [key]: entry
        }))

        this.setState({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0
        })
        // navigate to home
        this.toHome()

        // save to db
        submitEntry({key, entry})

        // clear local notification
    }

    reset = () => {
        const key = timeToString()
        
        this.props.dispatch(addEntry({
            [key]: getDailyReminderValue()
        }))

        removeEntry(key)

    }

    render() {

        if (this.props.alreadyLogged) {
            return(
                <View style={styles.center}>
                    <Ionicons
                    name={Platform.OS === 'ios' ? 'ios-happy' : 'md-happy'}
                    size={100}/>
                    <Text>You already logged your information for today</Text>
                    <TextButton style={{padding: 10}} onPress={this.reset}>
                        Reset
                    </TextButton>
                </View>
            )
        }

        const metaInfo = getMetricMetaInfo()
        return(
            <View style={styles.container}>
                <DateHeaders date={(new Date()).toLocaleDateString()}/>
                {Object.keys(metaInfo).map((key) => {
                    const { getIcon, type, ...rest} = metaInfo[key]
                    const value = this.state[key]
                    
                    return(
                        <View key={key} style={styles.row}>
                            {getIcon()}
                            {type === 'slider'?
                            <UdaciSlider 
                            value={value} 
                            onChange={(value) => this.slider(key, value)}
                            {...rest} />
                            : <UdaciSteppers value={value} 
                            onIncrement={() => this.increment(key)}
                            onDecrement={() => this.decrement(key)}
                            {...rest}/>}
                        </View>
                    )
                })}
                <SubmitBtn onPress={this.submit} />
            </View>
        )
    }
}

function mapStateToProps(state) {
    const key = timeToString()
    return {
        alreadyLogged: state[key][0] && typeof state[key][0].today === "undefined"
    }
}

export default connect(mapStateToProps)(AddEntry);