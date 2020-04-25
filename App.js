import * as React from 'react';
import Registration from './screens/Registration';
import CreateNewArticleScreen from './screens/CreateNewArticleScreen';
import ArticleSreen from './screens/ArticleScreen';

export default class App extends React.Component {
  render() {
    return (
      <CreateNewArticleScreen/>
    );
  }
}
