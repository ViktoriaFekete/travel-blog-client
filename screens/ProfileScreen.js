import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Image, Input } from 'react-native-elements';
import { Button } from 'react-native-elements';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Icon}  from 'react-native-elements'


export default class ProfileScreen extends React.Component {

  state = {
        name: 'Blogger',
        aboutMe: 'Kto som',
  }

  async componentDidMount() {
    try {
        let response = await fetch('http://10.0.2.2:8080/bloggers/21');
        let responseJson = await response.json();
        this.setState({name: responseJson.username, aboutMe: responseJson.aboutMe });

        // console.log(responseJson.title);
        // console.log(responseJson);
        return responseJson;
    } catch (error) {
        console.error(error);
    }
  }


  render() {
    
    const { name, aboutMe } = this.state;
    return (

    <ScrollView>
          <View style={{ alignItems: 'center'}}>
            <Image
                source={{ uri: 'http://10.0.2.2:8080/bloggers/photos?bloggerId=21&type=cover' }}
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
                source={{ uri:'http://10.0.2.2:8080/bloggers/photos?bloggerId=21&type=profile',}}
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
          <View>
            <Text>
              Tuto budu bloggerove clanky
            </Text>
          </View>

    </ScrollView>
  );
}

}

ProfileScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
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