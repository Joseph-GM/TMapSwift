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

import Geolocation from '@react-native-community/geolocation';
const SK_API_KEY = 'SK_API_Key'

const TMapShow = requireNativeComponent("TMapShow")

export default class App extends Component {
  state = {
    zoom: 5,
    lat : 37.55555,
    lon : 126.11111,
    breweryList: null,
    addressData : null,
    isLoading : true,
    };
  
  componentDidMount() {
    Geolocation.getCurrentPosition(
      position => {
        this.setState(
          {
            lat : position.coords.latitude,
            lon : position.coords.longitude,
          }
        );
        Promise.all([
          fetch(`https://apis.openapi.sk.com/tmap/pois?version=1&count=2&searchKeyword=전기차충전소&centerLon=${position.coords.longitude}&centerLat=${position.coords.latitude}&appKey=${SK_API_KEY}`),
          fetch(`https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=1&lat=${position.coords.latitude}&lon=${position.coords.longitude}&appKey=${SK_API_KEY}`)
         ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([data1, data2]) => {this.setState({
          breweryList : data1.searchPoiInfo.pois.poi,
          addressData : data2,
          isLoading: false,
        });
        console.log(this.state.addressData);
      })
      },
      error => {
        console.log('error')
      }
    )
  }
  
  render() {
    const lat = this.state.lat
    const lon = this.state.lon
    const isLoading = this.state.isLoading
    return (
      <View style={styles.container}>
        {isLoading? <Text> Data is Loading </Text> :
        <>
          <TMapShow 
          style={ styles.wrapper }
          zoom = {10}
          clatitude = {lat}
          clongitude = {lon}
        />
        <TouchableOpacity
          style={[styles.border]}
          onPress={this.increment}
        >
          <Text style={styles.button}>
            {this.state.addressData.addressInfo.fullAddress}
          </Text>
        </TouchableOpacity>
        </>
        }
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