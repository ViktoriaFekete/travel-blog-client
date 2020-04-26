import * as React from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, Text, ScrollView, View, TextInput } from 'react-native';
import { Avatar, Image, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class ArticleScreen extends React.Component{

    constructor(props) {
        super(props)

        articleId = global.articleId;

        console.log(articleId)

        this.state = {
            articleAuthor: null,
            articleTitle: 'Title',
            articleText: 'Text',
            published: '',
        }
    }

  async componentDidMount() {
    try {
        let response = await fetch('http://192.168.1.107:8080/articles/full/' + articleId);
        let responseJson = await response.json();
        await this.setState({articleAuthor: responseJson.blogger_id, articleTitle: responseJson.title, articleText: responseJson.article_text, published: responseJson.published });

        // console.log(responseJson.title);
        // console.log(responseJson);
        return responseJson;
    } catch (error) {
        console.log("ERROR: fetch ended up in catch error state in ArticleScreen")
        console.error(error);
    }
  }


  render() {
    console.log('In article render: ' + articleId)
    // const { params } = this.props.navigation.state;
    // // const itemId = params ? params.meno : null;
    
    // const {state} = this.props.navigation;
    // var name = state.params ? state.params.name : "<undefined>";
    
    
    // console.log(this.props.navigation.state.params.user)

    const { articleAuthor, articleText, articleTitle, published } = this.state;
    return (

    <ScrollView>
        <View style={{flex:1, alignItems: 'center'}}>
          {/* //TODO Add image picker */}
            <Image
                source={{ uri: 'http://192.168.1.107:8080/articles/' + articleId + '/photos/0' }}
                style={{ width: 480, height: 130 }}
            />       
            <Avatar containerStyle={{ position: 'absolute', top: 90, borderWidth: 3, borderColor: 'white'}} avatarStyle={styles.profilePhoto}
                rounded
                size="large"
                source={{ uri:'http://192.168.1.107:8080/bloggers/photos?bloggerId=' + articleAuthor + '&type=profile',}}
            />
        </View>
        <View style={styles.container}>
            <Text style={styles.articleTitle}>{articleTitle}</Text>
            <Text style={styles.date}>{published}</Text>
            <Text style={styles.articleText}>{articleText}</Text>
        </View>
        {/* //TODO Do gallery https://github.com/xiaolin/react-image-gallery  */}
        <View style={styles.gallery}>
            <Image 
                source={{ uri: 'http://192.168.1.107:8080/articles/' + articleId + '/photos/0' }}
                style={{ width: 200, height: 150 }}
            />
        </View>
        {/* //TODO Add comment section */}
        <View style={styles.commentSection}>
            <Text>Sem pridu este komenty</Text>
        </View>
    </ScrollView>
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
    paddingTop: 50,
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
    paddingTop: 170,
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
  }
});
