import React from "react";
import {
  Dimensions,
  Image,
  Alert,
  StatusBar,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";


export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
   
  }
  async componentDidMount() {
  
  }

   
    
  componentWillUnmount() {
   

  }
  
  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.view}>
       
       
      </View>
    );
  }
}
const styles = StyleSheet.create({
  view: {
    flex: 1.0,
    backgroundColor: "#000000"
  },
 
  container: {
    flex: 1.0
  },
  
  
});
