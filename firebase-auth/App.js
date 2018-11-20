import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import {
  Divider
} from 'react-native-elements';
import firebase from 'firebase';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';

const firebaseConfig = require('./firebase_config');

export default class App extends React.Component {

  componentDidMount() {
    firebase.initializeApp(firebaseConfig);
  }

  render() {
    return (
      <View style={styles.container}>
          <SignUpForm />
          <SignInForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
