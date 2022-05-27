import { useState } from 'react';
import { StyleSheet, TextInput, Touchable, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { default as theme } from '../theme.json';

export default function EditInfo({ route, navigation } : any) {
  const {name, cancel, done, initial} = route.params;
  return (
    <View style={styles.container}>
      <Header name={name} cancel={cancel} done={done}/>
      <Divider/>
      <DataInput initial={initial}/>
      <Divider/>
    </View>
  );
}

function Header(props: any) {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.cancelButton} onPress={props.cancel}>
        <Text>cancel</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{props.name}</Text>
      <TouchableOpacity style={styles.doneButton} onPress={props.done}>
        <Text style={{color: theme['color-button-fill-blue'], fontWeight: 'bold'}}>done</Text>
      </TouchableOpacity>
    </View>
  );
}

function DataInput(props: any) {
  const [data, setData] = useState('');
  return (
    <TextInput
      style={styles.row}
      defaultValue={props.initial}
      onChangeText={(data) => setData(data)}
    />
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
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: 50,
    backgroundColor: 'transparent',
  },
  cancelButton: {
    width: '20%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: 'transparent',
  },
  doneButton: {
    width: '20%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 10,
    backgroundColor: 'transparent',
  },
  divider: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  separator: {
    marginVertical: 1,
    height: 1,
    width: '100%',
  },
});