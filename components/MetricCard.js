import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import DateHeaders from './DateHeaders'
import { getMetricMetaInfo } from '../utils/helpers'
import { gray, white } from '../utils/colors'

export default function MetricCard ({ metrics }) {
  return (
    <View>
      {/* {date && <DateHeaders date={date} />} */}
      <View  style={styles.card}>
      {Object.keys(metrics).map((metric) => {
        const { getIcon, displayName, unit, backgroundColor } = getMetricMetaInfo(metric)
        return (
          <View style={styles.metric} key={metric}>
            {getIcon()}
            <View>
              <Text style={{fontSize: 20}}>
                {displayName}
              </Text>
              <Text style={{fontSize: 16, color: gray}}>
                {metrics[metric]} {unit}
              </Text>
            </View>
          </View>
        )
      })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  metric: {
    flexDirection: 'row',
    marginTop: 12, 
  },
  card: {
    borderWidth:5,
    borderRadius:10,
    shadowRadius:5,
    borderColor: white,
  }
})