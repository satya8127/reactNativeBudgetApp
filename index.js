/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import store from './features/redux/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
//import {} from 'react-native-vector-icons'

const AppRedux = () => (
  <Provider store={store}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <App />
    </GestureHandlerRootView>
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppRedux);
