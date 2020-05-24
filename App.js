import * as React from 'react';
import NetInfo from "@react-native-community/netinfo";
import { AsyncStorage } from "react-native";
import * as FileSystem from 'expo-file-system';


import Registration from './screens/Registration';
import CreateNewArticleScreen from './screens/CreateNewArticleScreen';
import ArticleSreen from './screens/ArticleScreen';
import Login from './screens/Login';
import ScreenManager from './screens/ScreenManager'
import SearchScreen from './screens/SearchScreen';
import TimeLine from './screens/TimeLine';
import { Buffer } from "buffer";



export default class App extends React.Component {
  constructor() {
    super()
    global.isNotHappening = false
  }

  sendStoredArticlesToServer2() {
    this.sendStoredArticlesToServer()
  }

    async sendStoredArticlesToServer() {
        let storedArticles;


        // if (global.isNotHappening) {
        //     return;
        // }
        
        global.isNotHappening = true;
        
        await AsyncStorage.getItem('newArticles', (err, result) => {
            storedArticles = JSON.parse(result)
            console.log("Articles loaded");
            console.log(storedArticles);
        });

        // await AsyncStorage.removeItem('newArticles');

        for (let article of storedArticles) {
            console.log("jeden")
            console.log(article)

            article = JSON.parse(article)

            let blogger_id = article['blogger_id']
            let photo_uri = article['photo_uri']
            delete article['photo_uri']            

            console.log('Before article POST')
            try {
              resp = await fetch('http://192.168.1.107:8080/articles', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                      'token': 'generated_token'
                    },
                    body: JSON.stringify(article)
                })
            }
            catch (error) {
                console.log("ERROR: fetch ended up in catch error state in CreateNewArticleScreen")
                console.error(error);
            }
            console.log('After article POST')
            // console.log("tag ", tags)
            console.log("resp status is: ")
            console.log(resp.status)

            
              let articleId = await resp.text();
              // POST photo
              console.log('Before Photo PUT: ')
              console.log(blogger_id)

              let endpoint = 'http://192.168.1.107:8080/articles/' + articleId + '/photos/' + blogger_id
              let resp;
              let photoBase64
              photoBase64 = await FileSystem.readAsStringAsync(photo_uri, { encoding: 'base64' });
              // let photoBase64 = photo_uri.readFile("base64")
              let bytePhoto = Buffer.from(photoBase64, "base64");


              try {
                  resp = await fetch(endpoint, {
                      method: 'POST',
                      headers: {
                          Accept: 'image/jpeg',
                        'Content-Type': 'image/jpeg',
                        'token': "generated_token"
                      },
                      body: bytePhoto
                  })
                  console.log('After Photo PUT: ' + endpoint)
              }
              catch (error) {
                  console.log("ERROR: fetch ended up in catch error state in CreateProfileScreen-updateImage()")
                  console.log(error)
              }
              console.log("resp photo status is: ")
              console.log(resp.status)
        }
        global.isNotHappening = false;
    }

    networkStateListener = NetInfo.addEventListener(state => {
        let storedArticles;

        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);

        if (state.isConnected) {
            this.sendStoredArticlesToServer2();
        }
      });

    render() {
      return (
        <ScreenManager/>
      );
    }
}
