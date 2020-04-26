import * as React from 'react';

import Registration from './screens/Registration';
import CreateNewArticleScreen from './screens/CreateNewArticleScreen';
import ArticleSreen from './screens/ArticleScreen';
import Login from './screens/Login';
import ScreenManager from './screens/ScreenManager'
import SearchScreen from './screens/SearchScreen';
import TimeLine from './screens/TimeLine';



export default class App extends React.Component {
  render() {
    return (
      <CreateNewArticleScreen/>
    );
  }
}
