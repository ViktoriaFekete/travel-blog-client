import React, { Component } from 'react';
import { Button, Overlay, Image, Icon } from 'react-native-elements';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import NetInfo from "@react-native-community/netinfo";


export default class WelcomePage extends React.Component {
  static navigationOptions = {
    title: 'Ahoj!'
  };
  
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      status: global.networkState,
    }
}

  async setNetworkStatus() {
    await this.setState({status: global.networkState})
    console.log(this.state.status)

    if (this.state.status == true)
      this.setState({visible: false});
    else
      this.setState({visible: true});
  }

  toggleOverlay() {
    if (this.state.visible == true)
      this.setState({visible: false});
    else
      this.setState({visible: true});
  };

  async checkStateToRegistrate(){
    const { navigate } = this.props.navigation

    await this.setState({status: global.networkState})
    
    if (this.state.status == true)
      navigate('Registration')
    else {
      this.setState({visible: true});
    }
  }

  async checkStateToLogin(){
    const { navigate } = this.props.navigation
    console.log(global.networkState)

    await this.setState({status: global.networkState})

    if (this.state.status == true)
      navigate('Login')
    else {
      this.setState({visible: true});
    }
  }

  render() {
    const { navigate } = this.props.navigation

    return (
      <View style={styles.container}>
          <Text style={styles.welcomeText}>Ahoj!</Text>
          {/* <Text style={styles.welcomeText}>Vyber si z možností a pokračuj{"\n"} s nami v spoznávaní sveta :)</Text> */}
          <View style={styles.contentContainer}>
              <Button 
                  title='Registruj' 
                  type='solid' 
                  containerStyle={styles.buttons} 
                  buttonStyle={styles.btn}
                  onPress = { () => this.checkStateToRegistrate()}
              />
              <Button 
                  title='Prihlás sa' 
                  type='solid' 
                  containerStyle={styles.buttons} 
                  buttonStyle={styles.btn}
                  onPress = { () => this.checkStateToLogin()}
              />
              <Button 
                  title='Pokračuj bez prihlásenia' 
                  type='solid' 
                  containerStyle={styles.buttons} 
                  buttonStyle={styles.btn}
                  onPress={ () => navigate('Home') }
              />
          </View>
          <View>
            <Overlay overlayStyle={styles.offlineMsg} isVisible={this.state.visible} onBackdropPress={this.toggleOverlay.bind(this)}>
              <Icon
                name='close'
                type='ionicons'
                color='#303133'
                onPress = {this.toggleOverlay.bind(this)}
                containerStyle={{position: 'absolute', top: 10, right: 10}}
                size = {30}
              />
              <Text style={styles.msg}>Ooops, Si offline.</Text>
              <Image
                source={{ uri: "https://cdn.iconscout.com/icon/free/png-512/wifi-off-1768029-1502203.png" }}
                opacity = {0.6}
                style={{ width: 100, height: 100 }}
              />
              <Text style={styles.msg}>Skontroluj pripojenie na Internet a skús znova.</Text>
              <Button title="Skúsiť znova" onPress = { () => this.setNetworkStatus() } containerStyle={styles.tryagainBtn} buttonStyle={{ height: 50}}/>
            </Overlay>
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
  },
  offlineMsg:{
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',   
    alignSelf: 'center',
  },
  msg:{
    fontSize: 24,
    textAlign: 'center',
    padding: 25,
  },
  tryagainBtn:{
    paddingTop: 40,
    width: '60%',
  }
});

