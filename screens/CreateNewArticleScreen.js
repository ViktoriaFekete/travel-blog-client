import * as React from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, Text, ScrollView, View, TextInput } from 'react-native';
import { Avatar, Image, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function CreateNewArticleScreen() {

  const [title, setTitle] = React.useState('');
  const [text, setText] = React.useState('');

  async function sendArticleForm() {
      // console.log(title)
      // console.log(text)

      console.log('Before POST')
      let resp = await fetch('http://10.0.2.2:8080/articles', {
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
          })
      })
      console.log('After POST')
      console.log(resp.status)


  }

  return (
    <ScrollView>
      <TouchableOpacity>
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
      </TouchableOpacity>
      <Avatar avatarStyle={styles.profilePhoto}
            rounded
            size="large"
            source={{ uri:'https://www.pedroaraya.cl/wp-content/uploads/2016/06/photo-1438761681033-6461ffad8d80.jpg',}}
        />
        <View style={styles.container}>
            <Input inputStyle={styles.articleTitle}
                name='article_title' 
                placeholder='Názov článku'
                onChangeText={setTitle}
            />
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
              containerStyle={styles.buttons} buttonStyle={styles.btn}
            />
            <Button title='Ulož' type='solid' onPress={sendArticleForm} containerStyle={styles.saveButton}/>
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
    padding: 20,
    
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
    paddingTop: 150
  },
  articleText:{
    padding: 20,
    fontSize: 20,
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
  }
});
