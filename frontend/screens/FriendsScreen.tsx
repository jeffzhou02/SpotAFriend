import { useState } from 'react';
import { StyleSheet, Modal, TextInput, TouchableOpacity, Button, Pressable, Image } from 'react-native';

import { Text, View } from '../components/Themed';
import { default as theme } from '../theme.json';
import { AddFriend, GetFriendsList, RemoveFriend, SearchFriend } from '../firebase/library';
import { useContext } from 'react';
import { UserContext } from '../components/UserContext';

export default function FriendsScreen({ route, navigation } : any) {
  const {cancel} = route.params;
  const {user} = useContext(UserContext);
  var [friendsList, setList] = useState([]);
  var getList = async () => {
    const promise = await GetFriendsList(user);
    const value = promise;
    setList(value);
  };
  getList();
  
  return (
    <View style={styles.container}>
      <Header cancel={cancel}/>
      <Divider/>
      <FriendList friends={friendsList} user={user}/>
    </View>
  );
}

function FriendList(props: any) {
  var friendlist = props.friends.map((friend: any, index) =>
    <Friend name={friend} removeHandler={() => {RemoveFriend(props.user, index)}}/>
  );
  return (
    <View>
      {friendlist}
    </View>
  );
}

function Friend(props: any) {
  return (
    <View style={{width: '100%', flexDirection: 'row',  justifyContent: 'space-evenly', alignItems: 'center', padding: 10}}>
      <Text style={{flex: 1, textAlign: 'center'}}>{props.name}</Text>
      <TouchableOpacity onPress={props.removeHandler} style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Text style={{paddingRight: '5%', color: "#689689", textDecorationLine: 'underline'}}>remove</Text>
      </TouchableOpacity>
    </View>
  );
}

function FriendPrompt(props: any) {
  // visible, friendName, addHandler
  const display = props.visible;
  var row;
  if (display) {
    row = (
      <View style={{width: '80%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', padding: 10, borderColor: 'red', borderWidth: 5}}>
        <Text style={{flex: 1, textAlign: 'left'}}>{props.friendName}</Text>
        <TouchableOpacity onPress={props.addHandler} style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Text style={{paddingRight: '5%', color: "black", textDecorationLine: 'underline'}}>add</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    row = (
      <View></View>
    );
  }
  return row;
}

function Header(props: any) {
  const {user} = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [friendName, setFriendName] = useState('');
  const [friendFound, setFriendFound] = useState(false);
  var searchFriend = async () => {
    const promise = await SearchFriend(user, friendName);
    const value = promise;
    setFriendFound(value);
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.cancelButton} onPress={props.cancel}>
        <Text>back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>friends</Text>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={showModal}
      >
        <View style={{alignItems: 'center', height: '100%', width: '100%'}}>
          <View style={{alignSelf: 'center', alignItems: 'center', width: '90%', height: '75%', marginTop: '10%', backgroundColor: '#00AFB5', borderRadius: 30, borderColor: 'black', borderWidth: 2}}>
            <View style={{paddingTop:'10%'}}>
              <SearchBar inputHandle={(text: any) => {setSearchText(text); setFriendFound(false)}} searchHandler={() => {setFriendName(searchText); searchFriend()}}/>
            </View>
            <FriendPrompt 
              visible={friendName == searchText && searchText != '' && friendFound} 
              friendName={friendName}
              addHandler={() => {AddFriend(user, friendName)}}
            />
          </View>
          <Pressable
            onPress={() => setShowModal(!showModal)}
          >
            <Text style={styles.dismiss}>dismiss</Text>
          </Pressable>
        </View>
      </Modal>
      <TouchableOpacity style={styles.addButton} onPress={() => {setShowModal(!showModal);}}>
        <Text style={{color: theme['color-button-fill-blue'], fontWeight: 'bold'}}>add</Text>
      </TouchableOpacity>
    </View>
  );
}

function Divider() {
  return (
    <View style={styles.divider}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

function SearchBar(props: any) {
  return (
    <View style={styles.searchbar}>
      <TextInput placeholder="add friends" keyboardType="default" style={{width: '80%'}} onChangeText={(text) => props.inputHandle(text)}/>
      <TouchableOpacity style={{ alignSelf: "center" }} onPress={props.searchHandler}>
        <Image
          style={{
            resizeMode: "contain",
            height: 30,
            width: 30,
          }}
          source={require("../assets/images/search.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: 50,
    backgroundColor: "#E3DAC9",
  },
  cancelButton: {
    width: '20%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: "#E3DAC9",
  },
  openCard: {
    height: "60%",
    width: "90%",
    marginTop: "30%",
    alignSelf: "center",
    backgroundColor: "#00AFB5",
    borderRadius: 30,
  },
  addButton: {
    width: '20%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 10,
    backgroundColor: "#E3DAC9",
  },
  divider: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#E3DAC9",
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
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00ff00',
    padding: 100,
  },
  text: {
    color: '#3f2949',
    marginTop: 10,
  },
  dismiss: {
    fontSize: 16,
    fontStyle: "italic",
    textDecorationLine: "underline",
    color: "black",
  },
  searchbar: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#00AFB5",
    borderRadius: 15,
    width: 330,
    height: 40,
    alignContent: "center",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});