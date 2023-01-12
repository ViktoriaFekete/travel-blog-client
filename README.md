# Travel blog - A mobile app using React Native

This repository contains the client part of our travel application. 

The project was built with the purpose of learning React Native and getting into the development of mobile applications. Please, consider this fact before using any part of it :)

## Known issues 
Here you can find all, that's wrong and we know about. 

### react-native-tags
25.4.2020 - This element is outdated with a security issue in nodes_modules/react-native-tags/Tags/index.js - There is an outdated function componentWillReceiveProps(props) - this throws warning. 
One ugly workaround is to set it as UNSAFE_ (UNSAFE_componentWillReceiveProps(props)) to ignore the issue. 
But real fix should be replacing this method with newer, secured version called getDerivedStateFromProps(props, state) 
Right now, we are using temporarly UNSAFE_ 
