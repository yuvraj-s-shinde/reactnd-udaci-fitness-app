import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'
import DateHeaders from './DateHeaders'
import MetricCard from './MetricCard'
// import UdaciFitnessCalendar from 'udacifitness-calendar-fix'
import {Agenda as UdaciFitnessCalendar } from 'react-native-calendars'
import { AppLoading } from 'expo'

class History extends Component {
  state = {
      ready: false
  }
  
  componentDidMount () {
    const { dispatch } = this.props

    fetchCalendarResults()
      .then((entries) => dispatch(receiveEntries(entries)))
      .then(({ entries }) => {
        if (!entries[timeToString()]) {
          dispatch(addEntry({
            [timeToString()]: getDailyReminderValue()
          }))
        }
      })
      .then(() => this.setState(() => ({ready: true})))
  }

  renderItem = ({ today, ...metrics }, formattedDate, key) => (
    <View style={styles.item}>
      {today
        ? <View>
            <DateHeaders date={formattedDate} />
            <Text style={styles.noDataText}>
                {today}
            </Text>
        </View>
        : <TouchableOpacity onPress={()=> console.log("Pressed!")}>
                <MetricCard date={formattedDate} metrics={metrics} />
            </TouchableOpacity>}
    </View>
  )

  // renderItem = ({today, ...metrics}, formattedDate, key) => {
  //   console.log("renderItem was called")
  //   return (
  //       <View>
  //           {today
  //               ? <Text>today: {JSON.stringify(today)}</Text>
  //               : <Text>metrics: {JSON.stringify(metrics)}</Text>
  //           }
  //       </View>
  //   )
  // }

  renderEmptyDate(formattedDate) {
    return (
        <View>
        <DateHeaders date={formattedDate} />
        <Text style={styles.noDataText}>
            You didn't log any data on this day.
        </Text>
    </View>
    )
  }
  render() {
    const { entries } = this.props
    const { ready } = this.state
    if (ready === false) {
        return <AppLoading />
    }

    return (
      <UdaciFitnessCalendar
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        style={{marginTop:50}}
      />
    )
  }
}

const styles = StyleSheet.create({
    item: {
        padding: 20,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius:3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,24)',
        shadowOffset: {
            width: 0,
            height: 3,
        }
    },
    noDataText: {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20
        }
})

function mapStateToProps (entries) {
  return {
    entries
  }
}

export default connect(
  mapStateToProps,
)(History)
