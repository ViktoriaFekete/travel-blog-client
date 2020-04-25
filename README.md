# blog-react-client
This repository contains the client of our travel app.


## Known issues 
Here you can find all, that's wrong and we know about. 

### react-native-tags
25.4.2020 - This element is outdated with a security issue in nodes_modules/react-native-tags/Tags/index.js - There is an outdated function componentWillReceiveProps(props) - this throws warning. 
One ugly workarount is to set it as UNSAFE_ (UNSAFE_componentWillReceiveProps(props)) to ignore the issue. 
But real fix should be replacing this method with newer, secured version called getDerivedStateFromProps(props, state) 
Right now, we are using temporarly UNSAFE_ 
