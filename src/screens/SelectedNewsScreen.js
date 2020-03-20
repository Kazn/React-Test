import React from "react";
import {
  Dimensions,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,  
} from "react-native";
import { SafeAreaView } from "react-navigation";
import defaultImg from '../assets/Default_Image_Thumbnail.png';
import NetInfo from "@react-native-community/netinfo";
import storageService from "../services/StorageService";

const data = [
  { id: 1, label: 'bitcoin' },
  { id: 2, label: 'apple' },
  { id: 3, label: 'earthquake' },
  { id: 4, label: 'animal' },
];
import  TagSelectExtension  from "../utils/TagSelectExtension";
import { bindActionCreators } from "redux";
import * as NewsActions from "../actions/NewsAction";
import { connect } from "react-redux";
import moment from 'moment';
const { height } = Dimensions.get('window');
import  Colors  from "../utils/colors";

class SelectedNewsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenHeight: 0,
      newsDataArray:[]
    };
  }

 componentDidUpdate(prevProps){
    if ( prevProps.newsData !== this.props.newsData ) {
      if(this.props.newsData!=null){
        if(this.props.newsData.articles.length>0){
        let sortedArray  =  this.props.newsData.articles.sort((a,b)=> new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        this.setState({newsDataArray:sortedArray})
       }
     }
   }
  }
   
 async onSelectedItem(item){
    let islogin = await storageService.getValue("LOGIN");
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        if(islogin!==null && islogin=="true"){
           storageService.setValue(
            "USER_SELECTED_DATA",
            item.label
          );
        }
        this.props.requestNewsData(item.label,"2")
      } else {
        Alert.alert(
          'No Internet',
          'Please check the connection and try again later',
          [{ text: "OK", onPress: () => {} }],
          { cancelable: false }
        );
      }
    });
  
   
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    // Save the content height in state
    this.setState({ screenHeight: contentHeight });
  };

  onPressNews = async (fieldIndex) => {
    this.props.navigation.navigate('NewsDetailsScreen',{items:this.props.newsData.articles[fieldIndex]})
  }

  render() {
    const scrollEnabled = this.state.screenHeight > height;

    return (
      <SafeAreaView
      forceInset={({ top: "always" }, { bottom: "never" })}
      style={{ backgroundColor: "#fff", flex: 1 }}
    >
      <View style={styles.view}>
        <Text style={styles.labelText}>News Category</Text>
          <TagSelectExtension
          onItemPress={(item) => this.onSelectedItem(item)}
            data={data}
            max={3}
            ref={(tag) => {this.tag = tag;}}
          />
      </View>
      {this.props.newsDataError !==null &&
        <View style={{flex: 0.5 }} >
           <Text  style={styles.errorText}>{"News Data is not retrieving..Please Re-try"}</Text>
         </View>
      }
      {this.props.newsDataError ===null &&
       <ScrollView
         style={{ flex: 1 }}
         onContentSizeChange={this.onContentSizeChange}
         bounces={false}
         overScrollMode="never"
         scrollEnabled={scrollEnabled}
       >
        <View style={styles.mainContainer}>
      {this.state.newsDataArray.map((item, index) => {
        return (
        <View key={index} style={{height: 200, marginTop:10,}}>
          <TouchableOpacity
            onPress={() => this.onPressNews(index)}
            style={{
            top: 10,
            alignSelf:'center',
            width:  Dimensions.get("screen").width-10,
            height: 200,
            backgroundColor: '#00000050',
          }}>
          <Image
          style={{width:'100%', height:'100%'}}
          resizeMode='cover'
          source={item.urlToImage?{uri: item.urlToImage}: defaultImg}
          />
          <Text  style={styles.title}>{item.title}</Text>
          <Text  style={styles.timesAgo}>{moment(item.publishedAt || moment.now()).fromNow()}</Text>
      </TouchableOpacity>
      </View>)
        })
      }
      </View>
    </ScrollView>
  }
  </SafeAreaView>

    );
  }
}
const mapStateToProps = state => ({
  newsData: state.SelectedNewsDataReducer.newsData,
  newsDataError: state.SelectedNewsDataReducer.newsDataError,
  newsDataLoading: state.SelectedNewsDataReducer.newsDataLoading

});
const mapDispatchesToProps = dispatch => {
  return bindActionCreators(NewsActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchesToProps)(SelectedNewsScreen);

const styles = StyleSheet.create({
  errorText:{
    top:10,fontWeight: "bold",
    alignSelf:'center',
    fontSize: 20, 
  },
  view: {
    height:100,
    backgroundColor: "#ffffff"
  },
  labelText: {
    color: '#333',
    fontSize: 15,
    fontWeight: '500',
    alignSelf:'center',
    marginBottom: 15,
  },
  mainContainer:{
    flex: 1,
    marginTop: 10,
    alignSelf: "stretch"
  },
  title:{
    backgroundColor:'#00000075',
    width:'100%',
    bottom:0,
    padding:5,
    fontWeight: "bold",
    position:'absolute',
    color:'#fff',
    flexWrap: 'wrap',
    fontSize: 20, 
    flexGrow: 1,
},
timesAgo:{
  top:5,
  right:5,
  padding:5,
  width:"100%",
  textAlign:'right',
  height:50,
  fontWeight: "bold",
  position:'absolute',
  color:'#fff', 
 fontSize: 12
} 
  
});
