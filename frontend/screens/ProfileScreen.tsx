import { StyleSheet, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import { Text, View } from '../components/Themed';
import { RootStackParamList } from '../types';
import { UserContext } from '../components/UserContext';

//remeber to add profile photo later
export default function ProfileScreen({ navigation }: RootStackParamList<'Root'>) {
  const name='asdfasdf';
  const { user } = useContext(UserContext);
  const email='';
  const cancelFunction=() => navigation.navigate("Profile");
  return (
    <View style={styles.container}>
      <InfoView name={name} username={user.username} email={email}
        nameHandler={() => navigation.navigate(
          'EditInfo',
          {
            name: 'Name',
            cancel: cancelFunction,
            initial: name,
          })
        }
        usernameHandler={() => navigation.navigate(
          'EditInfo',
          {
            name: 'Username',
            cancel: cancelFunction,
            initial: username,
          })
        }
        emailHandler={() => navigation.navigate(
          'EditInfo',
          {
            name: 'Email',
            cancel: cancelFunction,
            initial: email,
          })
        }
      />
    </View>
  );
}

function InfoView(props) {
  return(
    <View style={{alignItems: 'center', justifyContent: 'center'}}>

      <Divider/>
      <RowButton label='Name' data={props.name} onPress={props.nameHandler}/>
      <Divider/>
      <RowButton label='Username' data={props.username} onPress={props.usernameHandler}/>
      <Divider/>
      <RowButton label='Email' data={props.email} onPress={props.emailHandler}/>
      <Divider/>
    </View>
  );
}

function RowButton(props) {
  return (
    <TouchableOpacity style={styles.row} onPress={props.onPress}>
      <View style={styles.label}>
        <Text>{props.label}</Text>
      </View>
      <View style={styles.data}>
        <Text>{props.data}</Text>
      </View>
    </TouchableOpacity>
  );
}

function Divider() {
  return (
    <View style={styles.divider}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', //can change to flex-start if need to push to top
  },
  label: {
    width: "30%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  data: {
    width: "70%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  row: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: 'transparent',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 1,
    height: 1,
    width: '85%',
  },
});