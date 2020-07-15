import React from 'react';
import { View } from 'react-native';
import AddEntry from './components/AddEntry'
import History from './components/History'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
 
export default class App extends React.Component {
  componentDidMount () {
      debugger
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}} >
          <History/>
        </View>
      </Provider>
    );
  }
}