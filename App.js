import 'react-native-gesture-handler';
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, Platform, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import AddEntry from './components/AddEntry';
import History from './components/History';
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

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <NavigationContainer>
        <UStatusBar backgroundColor={purple} barStyle="light-content" />
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
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
