import { StyleSheet, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import { Text, View } from '../components/Themed';
import { RootStackParamList } from '../types';
import { UserContext } from '../components/UserContext';

//remeber to add profile photo later
export default function ProfileScreen({ navigation }: RootStackParamList<'Root'>) {
  const name='asdfasdf';
  const { user } = useContext(UserContext);
  const cancelFunction = () => navigation.navigate("Profile");
  return (
    <View style={styles.container}>
      <InfoView name={name} username={user.username} email={user.email}
        usernameHandler={() => navigation.navigate(
          'EditInfo',
          {
            name: 'username',
            cancel: cancelFunction,
            attrib: 'username',
            initial: user.username,
          })
        }
        emailHandler={() => navigation.navigate(
          'EditInfo',
          {
            name: 'email',
            cancel: cancelFunction,
            attrib: 'email',
            initial: user.email,
          })
        }
      />
      <View>
        <Text>

        </Text>
      </View>
    </View>
  );
}

function InfoView(props: any) {
  return(
    <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: "#E3DAC9",  }}>

      <Divider/>
      <RowButton label='username' data={props.username} onPress={props.usernameHandler}/>
      <Divider/>
      <RowButton label='email' data={props.email} onPress={props.emailHandler}/>
      <Divider/>
    </View>
  );
}

function RowButton(props: any) {
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
    backgroundColor: "#E3DAC9",
  },
  label: {
    width: "30%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: "#E3DAC9",

  },
  data: {
    width: "70%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: "#E3DAC9",

  },
  row: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: "#E3DAC9",
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#E3DAC9",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    
  },
  separator: {
    marginVertical: 1,
    height: 1,
    width: '85%',
    backgroundColor: "rgba(0,0,0,0.2)",

  },
});