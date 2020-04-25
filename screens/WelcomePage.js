import React, { Component } from 'react';
import {
  Platform,
} from 'react-native';
import { Button } from 'react-native-elements';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default class WelcomePage extends React.Component {
  static navigationOptions = {
    title: 'Ahoj!'
  };
  
  render() {
    const { navigate } = this.props.navigation

    return (
      <View style={styles.container}>
          <Text style={styles.welcomeText}>Ahoj! Si tu prvýkrát?</Text>
          <Text style={styles.welcomeText}>Vyber si z možností a pokračuj{"\n"} s nami v spoznávaní sveta :)</Text>
          <View style={styles.contentContainer}>
              <Button 
                  title='Registruj' 
                  type='solid' 
                  containerStyle={styles.buttons} 
                  buttonStyle={styles.btn}
                  onPress = { () => navigate('Registration')}
              />
              <Button 
                  title='Prihlás sa' 
                  type='solid' 
                  containerStyle={styles.buttons} 
                  buttonStyle={styles.btn}
                  onPress = { () => navigate('Login') }
              />
              <Button 
                  title='Pokračuj bez prihlásenia' 
                  type='solid' 
                  containerStyle={styles.buttons} 
                  buttonStyle={styles.btn}
                  onPress={ () => navigate('MainFrame') }
              />
          </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  welcomeText:{
    flex: 0.3,
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 24
  },
  container: {
    paddingTop: 100,
    padding: 25,
    flex: 1,
  },
  contentContainer: {
    paddingTop: 100,
  },
  buttons: {
      padding: 5,
      height: 90,  
  },
  btn:{
      height: 70,
  }
});

