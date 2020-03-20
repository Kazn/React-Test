import React from 'react';

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from "native-base";

import topNewsScreen from "./src/screens/TopNewsScreen";
import profileScreen from "./src/screens/ProfileScreen";
import selectedNewsScreen from "./src/screens/SelectedNewsScreen";
import newsDetailsScreen from "./src/screens/NewsDetailsScreen";


const topNewsScreenStack = createStackNavigator(
  {
    TopNewsScreen: { screen: topNewsScreen },
    NewsDetailsScreen: { screen: newsDetailsScreen },
  },
  {
    headerMode: "none",
    initialRouteName: "TopNewsScreen"
  },
  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0
      }
    })
  }
);
const customNewsScreenStack = createStackNavigator(
  {
    SelectedNewsScreen: { screen: selectedNewsScreen },
    NewsDetailsScreen: { screen: newsDetailsScreen },

  },
  {
    headerMode: "none",
    initialRouteName: "SelectedNewsScreen"
  },
  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0
      }
    })
  }
);
const profileScreenStack = createStackNavigator(
  {
    ProfileScreen: { screen: profileScreen },
   
  },
  {
    headerMode: "none",
    initialRouteName: "ProfileScreen"
  },
  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0
      }
    })
  }
);
const tabs = createBottomTabNavigator({
  Top: {
      screen: topNewsScreenStack,
      navigationOptions: {
          title: "Top News",
          tabBarIcon: ({ tintColor }) => (
              <Icon
              type="Entypo"
              name="news" 
              color={tintColor} />
          )
      }
  },
  Custom: {
      screen: customNewsScreenStack,
      navigationOptions: {
          tabBarLabel: "Preferences",
          tabBarIcon: ({ tintColor }) => (
            <Icon
            type="MaterialIcons"
            name="rss-feed" 
            color={tintColor} />
          )
      }
  }
  ,
  Profile: {
      screen: profileScreenStack,
      navigationOptions: {
          tabBarLabel: "Profile",
          tabBarIcon: ({ tintColor }) => (
            <Icon
            type="AntDesign"
            name="user" 
            color={tintColor} />
          )
      }
  }
});


const Container = createAppContainer(tabs);

export default Container;
