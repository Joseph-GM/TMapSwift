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
  };
  increment = () => {
    this.setState({ count: this.state.count + 1 })
  }
  render() {
    return (
      <View style={styles.container}>
        
        <TMapShow 
          style={ styles.wrapper }
        />
        <TouchableOpacity
          style={[styles.wrapper, styles.border]}
          onPress={this.increment}
        >
          <Text style={styles.button}>
            {this.state.count}
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
    flex: 1, alignItems: "center", justifyContent: "center"
  },
  border: {
    borderColor: "#eee", borderBottomWidth: 1
  },
  button: {
    fontSize: 50, color: "orange"
  }
});