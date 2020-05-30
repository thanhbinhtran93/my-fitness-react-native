import 'react-native-gesture-handler';
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, Platform, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import AddEntry from './components/AddEntry';
import History from './components/History';
import EntryDetail from './components/EntryDetail';
import Live from './components/Live';
import { NavigationContainer } from '@react-navigation/native';
import { purple, white } from './utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

function UStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tab = createBottomTabNavigator();
const TabNav = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: Platform.OS === 'ios' ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : purple,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    }}
  >
    <Tab.Screen
      name="History"
      component={History}
      options={{
        tabBarLabel: 'History',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
        ),
      }}
    />
    <Tab.Screen
      name="Add entry"
      component={AddEntry}
      options={{
        tabBarLabel: 'Add Entry',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        ),
      }}
    />
    <Tab.Screen
      name="Live"
      component={Live}
      options={{
        tabBarLabel: 'Live',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-speedometer" size={30} color={tintColor} />
        ),
      }}
    />
  </Tab.Navigator>
);

const Stack = createStackNavigator();

const MainNav = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={TabNav}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="EntryDetail"
      component={EntryDetail}
      options={{
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        },
      }}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <NavigationContainer>
        <UStatusBar backgroundColor={purple} barStyle="light-content" />
        <MainNav />
      </NavigationContainer>
    </Provider>
  );
}
