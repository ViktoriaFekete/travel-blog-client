import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


import { SearchBar } from 'react-native-elements';

export default class SearchScreen extends React.Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
    <View style={ styles.container}>
        <SearchBar
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={search}
        />
        <Text style={{ paddingTop: 30}}>
            Hello
        </Text>
    </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 15,
    paddingTop: 40,
  },
  contentContainer: {
    paddingTop: 15,
  }
});
