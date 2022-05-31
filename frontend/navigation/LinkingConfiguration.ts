/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Landing: {
            screens: {
              LandingScreen: "Landing",
            },
          },
          Settings: {
            screens: {
              SettingsScreen: "Settings",
            },
          },
          Friends: {
            screens: {
              FriendsScreen: "Friends",
            },
          },
          Signup: {
            screens: {
              SignupScreen: "Signup",
            },
          },
          Home: {
            screens: {
              HomeScreen: "Home",
            },
          },
          Filter: {
            screens: {
              FilterScreen: "Filter",
            },
          },
          Camera: {
            screens: {
              GroupScreen: "Camera",
            },
          },
          Group: {
            screens: {
              GroupScreen: "Group",
            },
          },
          Profile: {
            screens: {
              ProfileScreen: "Profile",
            },
          },
        },
      },
      Modal: "camera",
      NotFound: "*",
    },
  },
};

export default linking;
