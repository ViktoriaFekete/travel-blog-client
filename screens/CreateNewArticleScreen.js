import * as React from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, Text, ScrollView, View, TextInput } from 'react-native';
import { Avatar, Image, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Tags from "react-native-tags";

export default function CreateNewArticleScreen( { navigation } ) {

  const [title, setTitle] = React.useState('');
  const [text, setText] = React.useState('');
  const [tags, setTags] = React.useState(['']);
  const [tag, setTag] = React.useState('');

  function updateTags() {
    console.log(tags)
    setTags([...tags, tag]);
  }

  async function sendArticleForm() {
     
      console.log("tagy tu ", tags)
      let resp = {}
      console.log('Before POST')
      try {
          resp = await fetch('http://192.168.1.107:8080/articles', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': 'generated_token'
              },
              body: JSON.stringify({
                blogger_id: '4',
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
      console.log('After POST')
      console.log("tag ", tags)
      console.log(resp.status)
  }

  return (
    <ScrollView>
      <View style={styles.cover}>
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
            containerStyle={styles.coverBtnContainer} buttonStyle={styles.coverButton}
        />
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
    
  },
  coverButton:{
    height: 40,
    width: 150,
    borderWidth: 2,  
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
