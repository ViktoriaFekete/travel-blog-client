import * as React from 'react';

import Registration from './screens/Registration';
import CreateNewArticleScreen from './screens/CreateNewArticleScreen';
import ArticleSreen from './screens/ArticleScreen';
import Login from './screens/Login';
import ProfileScreen from './screens/ProfileScreen';
import CreateProfileScreen from './screens/CreateProfileScreen';
import TimeLine from './screens/TimeLine';


export default class App extends React.Component {
  render() {
    return (
      <CreateProfileScreen/>
    );
  }
}
