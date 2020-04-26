import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Image, Input } from 'react-native-elements';
import { Button } from 'react-native-elements';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Icon}  from 'react-native-elements'

import { useIsFocused } from '@react-navigation/native';

export default function(props) {
  const isFocused = useIsFocused();

  return <ProfileScreen {...props} isFocused={isFocused} />;
}

class ProfileScreen extends React.Component {

  state = {
        name: '',
        aboutMe: '',
  }

  async componentDidUpdate() {
    if (this.state.profileForBloggerID != global.bloggerId) {
        try {
          let response = await fetch('http://10.0.2.2:8080/bloggers/' + global.bloggerId);
          let responseJson = await response.json();
          await this.setState({name: responseJson.username, aboutMe: responseJson.aboutMe, profileForBloggerID: global.bloggerId });

          // console.log(responseJson.username);
          // console.log(responseJson.aboutMe);
          
          return responseJson;
        } catch (error) {
            console.log("ERROR: fetch ended up in catch error state in ProfileScreen")
            console.error(error);
        }
    }
  }

  async componentDidMount() {
    try {
        let response = await fetch('http://10.0.2.2:8080/bloggers/' + global.bloggerId);
        let responseJson = await response.json();
        await this.setState({name: responseJson.username, aboutMe: responseJson.aboutMe });

        // console.log(responseJson.username);
        // console.log(responseJson.aboutMe);
        return responseJson;
    } catch (error) {
        console.log("ERROR: fetch ended up in catch error state in ProfileScreen")
        console.error(error);
    }
  }


  render() {
    // isFocused = useIsFocused();
    const { isFocused } = this.props;
    // console.log(isFocused)
    // return <Text>{isFocused ? 'focused' : 'unfocused'}</Text>;

    const { name, aboutMe } = this.state;

    // if (isFocused)
    //   this.componentDidMount()
    
    console.log('BloggerId in Profile: ', global.bloggerId)
    if (global.bloggerId == null) {
        return (
          <View style={styles.notLoggedContainer}>
              <Text style={{color:'red'}}>Nie si prihlásený.</Text>
              <Button 
                  title='Prihlás sa' 
                  type='solid' 
                  containerStyle={styles.buttons} 
                  buttonStyle={styles.btn}
                  onPress = { () => this.props.navigation.navigate('Login') }
              />
              <Button 
                  title='Registruj sa' 
                  type='solid' 
                  containerStyle={styles.buttons} 
                  buttonStyle={styles.btn}
                  onPress = { () => this.props.navigation.navigate('Registration') }
              />
          </View>
        )
    }
    else {
      return (
        <ScrollView>
            <View style={{ alignItems: 'center'}}>
              <Image
                  source={{ uri: 'http://10.0.2.2:8080/bloggers/photos?bloggerId=' + global.bloggerId + '&type=cover' }}
                  style={{ width: 480, height: 180 }}
              /> 
              <Text style={styles.name}>{name}</Text> 
              {/* <Button
                icon={
                <Icon name="plus" size={15} color="#0483c7"/>
                }
                title='  Follow me' 
                type='outline' 
                containerStyle={styles.buttons} buttonStyle={styles.btn}
            />     */}
              <Avatar  avatarStyle={styles.profilePhoto}
                  rounded
                  size="xlarge"
                  source={{ uri:'http://10.0.2.2:8080/bloggers/photos?bloggerId=' + global.bloggerId + '&type=profile',}}
              />
            </View>
            <View >
              <Text style={{paddingLeft:20, paddingTop: 20, fontSize: 24}}>About Me</Text>
              <Text style={styles.aboutMe}>{aboutMe}</Text>
            </View>
            <View style={{ position: 'relative', left: 300}}>
              <Icon
                raised
                name='md-add'
                type='ionicon'
                color='#5BC0BE'
                size={40}
                onPress={() => console.log('Add new article...')} />            
            </View>
        </ScrollView>
      );
    }
}

}

ProfileScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  notLoggedContainer: {
    padding: 30,
    paddingTop: 200,
    paddingBottom: 50,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  container: {
    paddingTop: 50,
    padding: 20,
    backgroundColor:'blue',
    
  },
  contentContainer: {
    paddingTop: 100,
  },
  buttons: {
      paddingTop: 20,
      paddingRight: 60,
      paddingLeft: 60,
      height: 90,  
  },
  btn:{
      height: 40,
      borderWidth: 1.5
  },
  profilePhoto:{
    flex: 1,
    paddingTop: 170,
    alignSelf: 'center',
    
  },
  articleText:{
    paddingTop: 20,
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'justify',
    
  },
  articleTitle:{
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black'
  },
  saveButton:{
    paddingTop: 30,
    paddingLeft:160,
  },
  coverBtnContainer:{
    height: 130,
    padding: -3
  },
  coverButton:{
    height: 130,
    borderWidth: 2
  },
  name:{
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 25
  },
  aboutMe:{
    paddingTop: 25,
    padding: 20,
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'justify',
  }
});