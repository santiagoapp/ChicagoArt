/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Navigation from "./src/navigation"
import { Provider } from 'react-redux';
import { persistor, store } from './src/store';
import { PersistGate } from 'redux-persist/integration/react'
import { Text } from 'react-native';
import { Notification, Notifications } from 'react-native-notifications';

function App(): JSX.Element {

  Notifications.registerRemoteNotifications();

  Notifications.events().registerNotificationReceivedForeground((notification: Notification, completion) => {
    console.log(`Notification received in foreground: ${notification.title} : ${notification.body}`);
    completion({alert: false, sound: false, badge: false});
  });

  Notifications.events().registerNotificationOpened((notification: Notification, completion) => {
    console.log(`Notification opened: ${notification.payload}`);
    completion();
  });

  return (
    <Provider store={store} >
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
}



export default App;
