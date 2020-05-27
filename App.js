import * as React from 'react';
import { Text, View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import AddEntry from './components/AddEntry';
import History from './components/History';

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <View style={{ flex: 1 }}>
        <View style={{ height: 20 }}></View>
        <History />
      </View>
    </Provider>
  );
}
