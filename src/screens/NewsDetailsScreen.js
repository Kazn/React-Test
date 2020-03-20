import React from "react";
import {
Dimensions,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from "react-native";
import { Icon } from "native-base";
import { SafeAreaView } from "react-navigation";
import moment from 'moment';
const { height } = Dimensions.get('window');
import  Colors  from "../utils/colors";

export default class NewsDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        newsItem: {},
        imageLoading:false,
        screenHeight: 0
      };
  }
  async componentDidMount() {
    this.setState({newsItem:this.props.navigation.state.params.items})
  }

  componentDidUpdate(prevProps){
    if ( prevProps.newsData !== this.props.newsData ) {
        console.log(this.props.newsData)

    }
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    // Save the content height in state
    this.setState({ screenHeight: contentHeight });
  };

  render() {
    const scrollEnabled = this.state.screenHeight > height;
    return (
        <SafeAreaView
        forceInset={({ top: "always" }, { bottom: "never" })}
        style={{ backgroundColor: Colors.whiteColor, flex: 1 }}
      >
        <ScrollView
          style={{flex: 1}}
          onContentSizeChange={this.onContentSizeChange}
          bounces={false}
          overScrollMode="never"
          scrollEnabled={scrollEnabled}
        >
         <View style={styles.MainContainer}>
            {this.state.imageLoading &&
            <ActivityIndicator
                color={Colors.blackColor}
                size="large"
                style={styles.activityIndicator}
                />
            }
         <Image
          style={styles.newsImage}
          resizeMode='cover'
          onLoadStart={e => this.setState({imageLoading:true})}
          onLoadEnd={e => this.setState({imageLoading:false})}
          source={{uri: this.state.newsItem.urlToImage}}
          />
            <View style={styles.topView}>
                <Icon
                style={styles.backButton}
                onPress={() => {this.props.navigation.goBack()}}
                type="Feather"
                name="arrow-left" 
                 />
                <Text  style={styles.timeAgo}>{moment(this.state.newsItem.publishedAt || moment.now()).fromNow()}</Text>
             </View>
           <Text style={styles.title}>{this.state.newsItem.title}</Text>
         </View>
         <View style={styles.bottomView} >
            <Text  style={styles.description}>{this.state.newsItem.description}</Text>
          <TouchableOpacity
          onPress={() => Linking.openURL(this.state.newsItem.url)}>
            <Text  style={styles.seeMore}> {"See more..."}</Text>
        </TouchableOpacity>
             </View>
      </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    MainContainer:{
        height:400,
        marginTop: 10,
        backgroundColor:'#00000050',
        alignSelf: "stretch"
    },
    newsImage:{
        width:'100%',
        position:'absolute', 
        height:400
    },
    topView:{
        zIndex: 21,
       width:"100%",
        height:60,
        position:'absolute',
        top:0,
        backgroundColor:'#00000050',
        justifyContent: 'center',
        alignItems: 'center' ,
      },
      timeAgo:{      
        width:"100%",
        textAlign:'right',
        height:20,
        right:5,
        fontWeight: "bold",
        justifyContent: 'center',
       color:Colors.whiteColor, 
       fontSize: 12
     },
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
    bottomView:{
        flex :1,
        marginTop: 10,
        alignSelf: "stretch"
    },
    description:{
        width:'100%',
        top:0,
        padding:5,
        fontWeight: "bold",
        color:Colors.blackColor,
        flexWrap: 'wrap',
        fontSize: 10, 
    },
    seeMore:{
        width:'100%',    
        padding:5,
        fontWeight: "bold",
        color:Colors.hyperLinkColor,
        flexWrap: 'wrap',
        fontSize: 25, 
    },
    backButton: {
        position: "absolute",
        alignSelf: "flex-start",
        zIndex: 21,
        marginLeft: 10,
        top: 10,
        color: Colors.whiteColor
      },
    view: {
        flex: 1.0,
        backgroundColor: Colors.whiteColor
    },
  container: {
    flex: 1.0
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }
});
