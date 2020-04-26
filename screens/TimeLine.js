import * as React from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Image, Button, ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

function getId(item){
  return item.id;
}

export default class TimeLine extends React.Component{

  state = {
    articles: [],
    imageFound: 'false',
    image: {}
}

async componentDidMount() {
  try {
      let response = await fetch('http://10.0.2.2:8080/articles/tile/?limit=25&&order=d');
      let responseJson = await response.json();
      this.setState({articles: responseJson.content });

      return responseJson;
  } catch (error) {
      console.log("fetch ended up in error state in TimeLine")
      console.error(error);
  }
}

keyExtractor = (item, index) => index.toString()

renderItem = ({ item }) => (
  <Card>
  <Image
    source={{ uri: 'http://10.0.2.2:8080/articles/'+getId(item)+'/photos/0' }}
    style={{ width: '100%', height: 180 }}
  /> 
  <View style={{ flex: 1, flexDirection: 'row'}}>
    <Text style={styles.title}>
      {item.title}  {item.bloggerId}  {item.id}
    </Text>
    </View>
  </Card>
  )

render() {

const { articles } = this.state;

console.log("2. Articles>>  ", this.state.articles);
return (
  
    <FlatList
      keyExtractor={this.keyExtractor}
      data={articles}
      renderItem={this.renderItem}
      
    />

   //   <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
     
   //   </ScrollView>

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
