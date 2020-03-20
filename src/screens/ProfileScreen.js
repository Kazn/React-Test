import React from "react";
import {
  Dimensions,
  Image,
  Alert,
  TouchableHighlight,
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-navigation";
import storageService from "../services/StorageService";


export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email   : '',
      password: '',
      fullName:'',
      validated : false,
      isLogin:false,
      userSelectedData:''
    }
  }

   componentDidMount() {

    this._navListener = this.props.navigation.addListener(
      'willFocus',
      payload => {
        this.getlogins()
      });
 
  }
  async getlogins(){

  let islogin = await storageService.getValue("LOGIN");
  if(islogin!==null && islogin=="true"){
    let fullname = await storageService.getValue("FULL_NAME");
    let userSelectedData = await storageService.getValue("USER_SELECTED_DATA");
    if(userSelectedData!==null ){
      this.setState({userSelectedData:userSelectedData,fullname:fullname,isLogin:true})
    }else{
      this.setState({fullname:fullname,isLogin:true})

    }
    
  }

}
   
async logout(){

  await storageService.removeValue("LOGIN");
  await storageService.removeValue("FULL_NAME");
  await storageService.removeValue("EMAIL");
  await storageService.removeValue("PASSWORD");
  await storageService.removeValue("USER_SELECTED_DATA");
  this.setState({isLogin:false,userSelectedData:''})
}

  validateIsEmail(email) {

    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }
  async onClickListener ()  {
    if(this.state.fullName.length>0 && this.state.email.length  && this.state.password.length){

    if(this.validateIsEmail(this.state.email)){
      await storageService.setValue(
        "FULL_NAME",
        this.state.fullName
      );
      await storageService.setValue(
        "EMAIL",
        this.state.email
      );
      await storageService.setValue(
        "PASSWORD",
        this.state.password
      );
      await storageService.setValue(
        "LOGIN",
        "true"
      );
      this.getlogins()

    }else{
      Alert.alert("Alert", "Please give a valid email address");
    }

    }else{
     Alert.alert("Alert", "Please fill the all inputs");

    }
  }
  // Render any loading content that you like here
  render() {
    return (
      <SafeAreaView
      forceInset={({ top: "always" }, { bottom: "never" })}
      style={{ backgroundColor: "#fff", flex: 1 }}
    >
      {!this.state.isLogin && 
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Full name"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(fullName) => this.setState({fullName})}/>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})} />
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.onClickListener()}>
          <Text style={styles.signUpText}>Sign up</Text>
        </TouchableHighlight>
      </View>
  }
        {this.state.isLogin && 
          <View style={styles.container}>
            
                <Text  style={{
                  width:'100%',
                  top:20,
                  padding:5,
                  fontWeight: "bold",
                  color:'#000',
                textAlign:'center',
                  fontSize: 20, 
              }}>
                
          {"logged as  "+this.state.fullname }</Text>
          {this.state.userSelectedData.length>0 && 
          <Text  style={{
            width:'100%',
            top:20,
            padding:5,
            fontWeight: "bold",
            color:'#000',
            textAlign:'center',
            fontSize: 20, 
        }}>
          
          {"News Keyword :"+this.state.userSelectedData }</Text>
         }
          <TouchableOpacity
            onPress={() => this.logout()}

           >
          <Text  style={{
          
          width:'100%',
         top:10,
          padding:5,
          fontWeight: "bold",
          color:'#005c9b',
          flexWrap: 'wrap',
          fontSize: 25, 
      }}>
        {"logout"}</Text>
        </TouchableOpacity>
      
    </View>
  }
      </SafeAreaView>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  signupButton: {
    backgroundColor: "#00b5ec",
  },
  signUpText: {
    color: 'white',
  }
  
});
