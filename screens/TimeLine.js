import * as React from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Card, Image, Button, ListItem } from 'react-native-elements'
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Icon, Input}  from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';

// const navigation = useNavigation();

function getId(item){
  // console.log(item)

  if (item.id != null) {
    // console.log('returning: ', item.id)
    return item.id;
  }
  else {
    // console.log('returning: ', item.article_id)
    return item.article_id;
  }
}


export default class TimeLine extends React.Component{

  constructor(props){

    super(props)

    this.state = {
    articles: [],
    orderBy: 'd',
    tagname: '',
    parameters: ''
  }
}

orderArticles(){
  if (this.state.orderBy == 'd')
    this.setState({ orderBy: 'a', parameters: '&order=a'});
  else
    this.setState({ orderBy: 'd', parameters: '&order=d'});
  
  this.componentDidMount()
}


updateSearch = tagname => {
  this.setState({ tagname });
};


async searchByTags(){
  await this.setState({tagname: this.state.tagname})
  // console.log("search: ", this.state.tagname)
  if (this.state.tagname != '')
    await this.setState({parameters: '&type=tag&tagname='+this.state.tagname})
  // console.log("param: ", this.state.parameters)

  if(this.state.tagname != '')
    this.componentDidMount()
}

async componentDidMount() {
  try {
      // console.log("url ", this.state.parameters)
      let response = await fetch('http://192.168.1.107:8080/articles/tile/?limit=10'+this.state.parameters);

      let responseJson = await response.json();
      
      if (responseJson.content)
        this.setState({articles: responseJson.content });
      else
        this.setState({articles: responseJson})
      // console.log(this.state.articles)
      return responseJson;
  } catch (error) {
      console.log("fetch ended up in error state in TimeLine")
      console.error(error);
  }
}

// async getBloggerName(bloggerId) {
//   console.log(bloggerId)
//   try {
//       let response = await fetch('http://10.0.2.2:8080/bloggers/'+bloggerId);
//       let responseJson = await response.json();
//       console.log("name : ", responseJson.username)
//       // this.setState({bloggerName: responseJson.username });
//       // console.log("setstate : ", this.state.bloggerName)
//       return responseJson.username;
//   } catch (error) {
//       console.log("fetch ended up in error state in TimeLine")
//       console.error(error);
//   }
// }

keyExtractor = (item, index) => index.toString()

openArticle(articleId) {
    console.log('Trying to open article with articleID: ', articleId);
    
    global.articleId = articleId;

    this.props.navigation.navigate('Article')
}

renderItem = ({ item }) => (
  <TouchableOpacity onPress={ () => this.openArticle(getId(item)) }>  
    <Card>
      <Image
        source={{ uri: 'http://192.168.1.107:8080/articles/'+getId(item)+'/photos/0' }}
        style={{ width: '100%', height: 180 }}
      /> 
      <View style={{ flex: 1, flexDirection: 'row'}}>
        {/* <Text>
          {this.getBloggerName(item.bloggerId)}
        </Text> */}
        <Text style={styles.title}>
          {item.title}  {item.bloggerId}  {item.id}
        </Text>
        </View>
    </Card>
  </TouchableOpacity>
  )

render() {

const { articles, tagname } = this.state;

return (
  <View style={{ flex: 1}}>
      <View style={{ flexDirection: 'row',  top: 20, paddingBottom: 15}}>
      <Input containerStyle={{ paddingLeft: 20, flex: 1}}
          placeholder='Search by country'
          onChangeText={this.updateSearch}
          value={tagname}
        />
      <View style={{flexDirection: 'row', position: 'relative'}}>
        <Icon
          raised
          name='md-search'
          type='ionicon'
          color='#5BC0BE'
          size={20}
        // onPress={() => console.log('Search for...')} />            
          onPress={this.searchByTags.bind(this)}/>
          <Icon
          raised
          name='sort'
          type='font-awesome'
          color='#5BC0BE'
          size={20}
          // onPress={() => console.log('Sort...')} />            
          onPress={this.orderArticles.bind(this)} />
      </View>
    </View>
    <FlatList 
      keyExtractor={this.keyExtractor}
      data={articles}
      renderItem={this.renderItem}
      
    />
    </View>
  );
}
}

TimeLine.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  title:{
    flex: 1, 
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  likes:{
    marginTop: 10,
  }
  
});
