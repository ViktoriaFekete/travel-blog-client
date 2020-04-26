import * as React from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, Text, ScrollView, View, TextInput } from 'react-native';
import { Avatar, Image, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Tags from "react-native-tags";

import { Buffer } from "buffer";
import * as ImagePicker from 'expo-image-picker';

export default function CreateProfileScreen() {

  const [name, setName] = React.useState('');
  const [aboutMe, setAboutMe] = React.useState('');
  const [coverPhoto, setCoverPhoto] = React.useState({});
  const [coverPhotoProvided, setCoverPhotoProvided] = React.useState(false);
  const [profilePhoto, setProfilePhoto] = React.useState({});

  async function pickProfilePhoto() {
      try {
          let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: false,
              base64: true
          });

          if (result.cancelled) {
              console.log('Photo NOT loaded')
          }
          else {
              setProfilePhoto(result)
              console.log('Photo loaded ' + coverPhoto);
          }
      } catch (E) {
        console.log(E);
      }
  };

  async function pickCoverPhoto() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        base64: true
      });

      if (result.cancelled) {
        console.log('Photo NOT loaded')
      }
      else {
        setCoverPhoto(result)
        setCoverPhotoProvided(true)
        console.log('Photo loaded ' + coverPhoto);
      }
      
    } catch (E) {
      console.log(E);
    }
  };

  async function updateImage(endpoint, photoBase64) {
    console.log('Before Photo PUT: ' + endpoint)

    let resp;
    let bytePhoto = Buffer.from(photoBase64, "base64");

    try {
        resp = await fetch(endpoint, {
            method: 'POST',
            headers: {
                Accept: 'image/jpeg',
              'Content-Type': 'image/jpeg',
              'token': global.token
            },
            body: bytePhoto
        })
        console.log('After Photo PUT: ' + endpoint)
    }
    catch (error) {
        console.log("ERROR: fetch ended up in catch error state in CreateProfileScreen-updateImage()")
        console.error(error);
    }

    // console.log(resp.status)
  }

  async function updateProfile() {
      console.log(name)
      console.log(aboutMe)

      let resp;

      console.log('Before BloggerName PUT')
      try {
           resp = await fetch('http://10.0.2.2:8080/bloggers/' + global.bloggerId, {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': global.token
              },
              body: JSON.stringify({
                username: name,
                about_me: aboutMe,
              })
          })
      }
      catch (error) {
          console.log("ERROR: fetch ended up in catch error state in CreateProfileScreen-updateProfile")
          console.error(error);
      }
      console.log('After BloggerName PUT')
      console.log(resp.status)
      if (resp.status == 200) {
          updateImage('http://10.0.2.2:8080/bloggers/photos?bloggerId=' + global.bloggerId + '&type=profile', profilePhoto.base64)
          updateImage('http://10.0.2.2:8080/bloggers/photos?bloggerId=' + global.bloggerId + '&type=cover', coverPhoto.base64)
      }
  }

  return (
    <ScrollView>
      <View style={styles.cover}>
       <Image
            source={{ uri: coverPhoto.uri }}
            style={{ width: 480, height: 180 }}
        /> 
        {
          !coverPhotoProvided && <Button 
              icon={
                <Icon
                  name="picture-o"
                  size={20}
                  color="#0483c7"
                />
              }
              title='  Pridaj fotku' 
              type='clear' 
              containerStyle={styles.coverBtnContainer} 
              buttonStyle={styles.coverButton}
              onPress={pickCoverPhoto}
          />
        }
        </View>
        <View style={{ alignItems: 'center' }}>
            <TextInput style={styles.articleTitle}
                name='username'
                placeholder="Blogger name"
                multiline={false}
                onChangeText={setName}
            />
            <TouchableOpacity onPress={pickProfilePhoto}>
                <Avatar avatarStyle={styles.profilePhoto}
                    rounded
                    showEditButton
                    size="xlarge"        
                    source={{ uri: profilePhoto.uri }}
                />
            </TouchableOpacity>
        </View>
    <View style={styles.container}>
          <TextInput style={styles.articleText}
              name='aboutMe' 
              placeholder='Napíš niečo o sebe :)'
              multiline={true}
              numberOfLines={1}
              onChangeText={setAboutMe}
                // onChangeText={(text) => this.setState({text})}
                // value={this.state.text}
          />
          <Button title='Ulož' type='solid' onPress={updateProfile} containerStyle={styles.saveButton}/>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  welcomeText:{
    flex: 0.3,
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 24
  },
  container: {
    paddingTop: 30,
    padding: 20,
  },
  contentContainer: {
    paddingTop: 100,
  },
  buttons: {
      paddingTop: 200,
      paddingRight: 60,
      paddingLeft: 60,
      height: 90,  
  },
  btn:{
      height: 40,
      borderWidth: 1.5,
  },
  profilePhoto:{
    flex: 1,
    paddingTop: 230,
  },
  articleText:{
    paddingTop: 25,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'justify',
  },
  articleTitle:{
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
    paddingTop: 30,
    paddingBottom: 30,
  },
  saveButton:{
    paddingTop: 80,
    paddingLeft:160,
  },
  coverBtnContainer:{
    position: 'absolute'
  },
  coverButton:{
    height: 180,
    width: '90%',
  },
  cover:{
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#b8b8b8',
    height: 180,
    width: 480,
  }, 
  date:{
      paddingTop: 10,
      paddingLeft: 150,
      color: 'gray'
  },
  gallery:{
      padding: 10,
      margin: 15,
      backgroundColor: '#0B132B'
  },
  commentSection:{
      padding: 20
  },
  tags:{
    backgroundColor: '#b8b8b8',
    margin: 5,
    padding: 10,
    borderRadius: 30,
  }
});
