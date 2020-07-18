import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import AddEntry from './components/AddEntry'
import History from './components/History'
import EntryDetail from './components/EntryDetail'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { FontAwesome, Ionicons} from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import Constants from 'expo-constants'
import { purple, white } from './utils/colors';

 
const UdaciStatusBar = ({backgroundColor, ...props}) => (
  <View style={{backgroundColor, height: Constants.statusBarHeight}}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
  </View>
)

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const NavTab = () => (
  <Tab.Navigator tabBarOptions={{
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }}>
    <Tab.Screen name="History" component={History} options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name="ios-bookmarks" size={30} color={tintColor}/>
          ),
        }}/>
    <Tab.Screen name="Add Entry" component={AddEntry} options={{
          tabBarLabel: 'Add Entry',
          tabBarIcon: ({ tintColor }) => (
            <FontAwesome name="plus-square" size={30} color={tintColor}/>
          ),
        }}/>
  </Tab.Navigator>
)
 
const NavStack = () => (
  <Stack.Navigator>
    <Stack.Screen name='Home' component={NavTab}/>
    <Stack.Screen name='Entry Detail' component={EntryDetail} options={{
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
      }}/>
  </Stack.Navigator>
)

export default class App extends React.Component {
  componentDidMount () {
      debugger
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}} >
          <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
          <NavigationContainer>
            <NavStack/>
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}