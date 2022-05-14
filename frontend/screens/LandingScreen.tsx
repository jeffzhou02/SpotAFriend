import { StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';

import { Text, View } from '../components/Themed';

import { default as theme } from '../theme.json';
import { RootTabScreenProps } from '../types';

export default function LandingScreen({navigation}: RootTabScreenProps<'Landing'>) {
  return (
    <View style={styles.container}>
      <Splash></Splash>
      <View style={styles.bottomHalf}>
        <View style={styles.row}>
          <View style={{flex: 1, padding: 5, paddingRight: 20, backgroundColor: 'transparent',}}><SignUpButton handler={() => {navigation.navigate("Signup")}}/></View>
          <View style={{flex: 1, padding: 5, paddingLeft: 20, backgroundColor: 'transparent',}}><LogInButton handler={() => {navigation.navigate("Login")}}/></View>
        </View>
      </View>
    </View>
  );
}

function Logo() {
  return (
    <Image source={require('../assets/images/icon.png')} style={{width: '30%'}} resizeMode='contain'></Image>
  );
}

function Splash() {
  return (
    <ImageBackground 
      source={require('../assets/images/splash.jpg')} 
      style={{width: '100%', height:'100%', alignItems: 'center', justifyContent: 'center'}}
      blurRadius={2}
      >
        <Logo></Logo>
      </ImageBackground>
  );
}

function SignUpButton(props) {
  return (
    <TouchableOpacity 
      style={styles.signUpButtonStyle}
      onPress={props.handler}
    >
      <Text style={{color: "#FFFFFF"}}>Sign Up</Text>
    </TouchableOpacity>
  );
}

function LogInButton(props) {
  return (
    <TouchableOpacity 
      style={styles.loginButtonStyle}
      onPress={props.handler}>
      <Text style={{color: "#689689"}}>Log In</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  bottomHalf: {
    height: '50%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
  },
  row: {
    width: "70%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: 'transparent',
  },
  signUpButtonStyle: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: theme['color-button-fill-blue'],
    borderRadius: 50,
  },
  loginButtonStyle: {
    padding: 18,
    alignItems: 'center',
    backgroundColor: theme['color-button-fill-white'],
    borderRadius: 50,
    borderWidth: 2,
    borderColor: theme['color-button-fill-blue'],
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
