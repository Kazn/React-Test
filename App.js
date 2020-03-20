/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';


import AppNavigator from "./AppNavigator";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
   
  }

  componentWillUnmount() {
  }



  render() {
    return (
      <AppNavigator
        ref={nav => {
          this.navigator = nav;
        }}
      />
    );
  }
}

const styles = StyleSheet.create({

});

