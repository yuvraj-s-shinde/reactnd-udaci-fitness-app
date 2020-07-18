import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import MetricCard from './MetricCard'
import { white } from '../utils/colors'
import { connect } from 'react-redux'
import { addEntry } from '../actions'
import { getDailyReminderValue, timeToString } from '../utils/helpers'
import { removeEntry } from '../utils/api'
import TextButton from './TextButton'

class EntryDetail extends Component {

    shouldComponentUpdate (nextProps) {
        return nextProps.metrics.length !== 0 && !nextProps.metrics[0].today
    }

    render() {
        const {metrics} = this.props
        return (
            <View style={styles.container}>
                <MetricCard metrics={metrics[0]}/>
                <Text>{this.props.route.params.entryId}</Text>
                <TextButton onPress={this.reset} style={{margin:20}}>
                    RESET
                </TextButton>
            </View>
        )
    }

    

    reset = () => {
        const { remove, goBack, entryId } = this.props
        remove()
        goBack()
        removeEntry(entryId)
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15,
    }
})

function mapStateToProps(state, {route}) {
    const { entryId } = route.params
    return {
        entryId,
        metrics: state[entryId]
    }
}

function mapDispatchToProps (dispatch, {route, navigation}) {
    const { entryId } = route.params
    return {
        remove: () => dispatch(addEntry({
            [entryId]: timeToString() === entryId
            ? getDailyReminderValue()
            : new Array()
        })),
        goBack: () => navigation.goBack()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);