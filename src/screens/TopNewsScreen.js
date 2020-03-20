import React from "react";
import {
  Dimensions,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
  StyleSheet,
  Alert,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { bindActionCreators } from "redux";
import * as NewsActions from "../actions/NewsAction";
import { connect } from "react-redux";
import moment from 'moment';
const { height } = Dimensions.get('window');
import NetInfo from "@react-native-community/netinfo";
import defaultImg from '../assets/Default_Image_Thumbnail.png';
import  Colors  from "../utils/colors";

class TopNewsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenHeight: 0,
    };
  
  }
  async componentDidMount() {
  
  this.unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected && (state.isInternetReachable === null || state.isInternetReachable)) {
       this.props.requestNewsData(null,"1")
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

  componentDidUpdate(prevProps){
    if ( prevProps.newsData !== this.props.newsData ) {
        console.log(this.props.newsData)

    }
  }
    
  componentWillUnmount() {
    this.unsubscribe()
  }
  onContentSizeChange = (contentWidth, contentHeight) => {
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
        style={{ backgroundColor: Colors.whiteColor, flex: 1 }}
        >
      {this.props.newsDataError !==null &&
         <View style={{flex: 0.5 }}>
            <Text  style={styles.errorText}>{"Please Re-try"}</Text>
           <Button
              title="Re-try"
              color="orange"
              onPress={() => {this.props.requestNewsData(null,"1")}}
              style={{top:100,alignSelf:'center',
              }}
              />  
        </View>
      }
      {this.props.newsDataError ===null &&
        <ScrollView
          style={{ flex: 1 }}
          onContentSizeChange={this.onContentSizeChange}
          bounces={false}
          overScrollMode="never"
          sscrollEnabled={scrollEnabled}
        >
         <View
          style={{
            flex: 1,
            marginTop: 10,
            alignSelf: "stretch"
          }}
        >
      {this.props.newsData !== null && this.props.newsData.articles.map((item, index) => {
        return (
            <View
              key={index}
              style={{
                height: 200,
                marginTop:10,
              }}
            >
            <TouchableOpacity
              onPress={() => this.onPressNews(index)}
              style={{
                top: 0,
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
                <Text style={styles.timesAgo}>{moment(item.publishedAt || moment.now()).fromNow()}</Text>
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
    newsData: state.NewsDataReducer.newsData,
    newsDataError: state.NewsDataReducer.newsDataError,
    newsDataLoading: state.NewsDataReducer.newsDataLoading

  });
  const mapDispatchesToProps = dispatch => {
    return bindActionCreators(NewsActions, dispatch);
  };
  
  export default connect(mapStateToProps, mapDispatchesToProps)(TopNewsScreen);
  
const styles = StyleSheet.create({
  title:{
    backgroundColor:'#00000075',
    width:'100%',
    bottom:0,
    padding:5,
    fontWeight: "bold",
    position:'absolute',
    color:Colors.whiteColor,
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
 },
  newsCard:{
    top:10,fontWeight: "bold",
    alignSelf:'center',
    fontSize: 20, 
  },
  errorText:{
    top:10,fontWeight: "bold",
    alignSelf:'center',
    fontSize: 20, 
  },
  view: {
    flex: 1.0,
    backgroundColor: Colors.whiteColor
  },
  container: {
    flex: 1.0
  },
  
  
});
