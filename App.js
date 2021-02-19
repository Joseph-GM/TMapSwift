/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  requireNativeComponent
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const TMapShow = requireNativeComponent("TMapShow")

export default class App extends Component {
  state = {
    count: 1,
    zoom: 5,
    clatitude : 37.55555,
    clongitude : 126.11111,
    };
  increment = () => {
    this.setState({ count: this.state.count + 1 })
  }
  render() {
    return (
      <View style={styles.container}>
        
        <TMapShow 
          style={ styles.wrapper }
          zoom = {10}
          clatitude = {37.5106732}
          clongitude = {126.7105677}
        />
        <TouchableOpacity
          style={[styles.border]}
          onPress={this.increment}
        >
          <Text style={styles.button}>
            Region : to be got
          </Text>
          <Text style={styles.button}>
            City : to be got
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: "stretch"
  },
  wrapper: {
    flex: 5, alignItems: "center", justifyContent: "center"
  },
  border: {
    borderColor: "#eee", 
    borderBottomWidth: 1, 
    flex:1,
    alignItems: "center",
    justifyContent: "center"

  },
  button: {
    fontSize: 15, color: "black"
  }
});