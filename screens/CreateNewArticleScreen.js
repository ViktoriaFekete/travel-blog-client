import * as React from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, Text, ScrollView, View, TextInput } from 'react-native';
import { Avatar, Image, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Tags from "react-native-tags";
import * as ImagePicker from 'expo-image-picker';
import { Buffer } from "buffer";

export default function CreateNewArticleScreen( { navigation } ) {

  const [title, setTitle] = React.useState('');
  const [text, setText] = React.useState('');
  const [tags, setTags] = React.useState(['']);
  const [tag, setTag] = React.useState('');
  const [articleCoverPhoto, setArticleCoverPhoto] = React.useState({});
  const [articleCoverPhotoProvided, setAtricleCoverPhotoProvided] = React.useState(false);

  function updateTags() {
    console.log(tags)
    setTags([...tags, tag]);
  }

  async function sendArticleForm() {
     
      console.log("tagy tu ", tags)
      let resp = {}
      console.log('Before article POST')
      try {
          resp = await fetch('http://192.168.1.107:8080/articles', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': 'generated_token'
              },
              body: JSON.stringify({
                blogger_id: global.bloggerId,
                title: title,
                article_text: text,
                selected_tags: tags,
              })
          })
      }
      catch (error) {
          console.log("ERROR: fetch ended up in catch error state in CreateNewArticleScreen")
          console.error(error);
      }
      console.log('After article POST')
      console.log("tag ", tags)
      console.log(resp.status)
     
      if ((resp.status == 201) && (articleCoverPhotoProvided == true)){
        let articleId = await resp.text()
        updateImage(articleId, articleCoverPhoto.base64)
      }
  }

  async function pickArticleCoverPhoto() {
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
        setArticleCoverPhoto(result)
        setAtricleCoverPhotoProvided(true)
        console.log('Photo loaded ' + articleCoverPhoto);
      }
      
    } catch (E) {
      console.log(E);
    }
  };

  async function updateImage(articleId, photoBase64) {
    console.log('Before Photo PUT: ')

    let endpoint = 'http://192.168.1.107:8080/articles/' + articleId + '/photos/'+ global.bloggerId
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

  return (
    <ScrollView>
      <View style={styles.cover}>
      <Image
            source={{ uri: articleCoverPhoto.uri }}
            style={{ width: 480, height: 130 }}
        /> 
        {
          !articleCoverPhotoProvided && <Button 
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
              onPress={pickArticleCoverPhoto}
          />
        }
        <Avatar containerStyle={{position: 'absolute', top: 90, borderWidth: 3, borderColor: 'white'}} avatarStyle={styles.profilePhoto}
            rounded
            size="large"
            source={{ uri:'http://192.168.1.107:8080/bloggers/photos?bloggerId=' + global.bloggerId + '&type=profile',}}
        />
      </View>
      <View style={styles.container}>
          <Input inputStyle={styles.articleTitle}
              name='article_title' 
              placeholder='Názov článku'
              onChangeText={setTitle}
          />
          <View >
            <Input 
                name='tag' 
                placeholder='#Kde si bol?'
                onChangeText={setTag}
            />  
          <Button
              icon ={
                <Icon
                raised
                name='tags'
                type='font-awesome'
                color='#0483c7'
                size={20}
               />  
              }
              title=' Pridaj tag' 
              type='clear' 
              onPress={updateTags}/>
          </View>
          <View>
            <TextInput style={styles.articleText}
                name='article_text' 
                placeholder='Sem napíš Tvoj príbeh :)'
                multiline={true}
                numberOfLines={1}
                onChangeText={setText}
                  // onChangeText={(text) => this.setState({text})}
                  // value={this.state.text}
            />
            <Button
                icon={
                <Icon
                  name="picture-o"
                  size={15}
                  color="#0483c7"
                />
                }
                title='  Pridaj fotku' 
                type='outline' 
                //onPress={}
                // https://medium.com/enappd/how-to-pick-images-from-camera-gallery-in-react-native-app-faf58f26ee37
                containerStyle={styles.buttons} buttonStyle={styles.btn}
            />
            <Button title='Ulož' type='solid' onPress={sendArticleForm} containerStyle={styles.saveButton}/>
            </View>
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
    paddingTop: 50,
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
      borderWidth: 1.5
  },
  profilePhoto:{
    flex: 1,
    paddingTop: 170,
  },
  articleText:{
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'justify',

  },
  articleTitle:{
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  saveButton:{
    paddingTop: 80,
    paddingLeft:160,
  },
  coverBtnContainer:{
    paddingTop: 30,
    position: 'absolute',
    
  },
  coverButton:{
    height: 40,
    borderWidth: 2, 
    width: '90%', 
  },
  cover:{
    flex:1, 
    alignItems: 'center',
    backgroundColor: '#b8b8b8',
    height: 130
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
