import { push, update, ref } from '@firebase/database';
import { useContext } from 'react';
import { db } from "../firebase/index.js";

export function AddUserGroup(user, groupname) {
    /*
    // Check if user exists
    const userRef = ref(db, 'users/' + user);
    onValue(userRef, (snapshot) => {
        if (!data){
            return;
        }
    })
    // Check if group exists
    const groupRef = ref(db, 'groups/' + groupname);
    onValue(groupRef, (snapshot) => {
        if (!data){
            return;
        }
    })
    // Add group to user
    var groupArray = user.groups; 
    groupArray.push(group);
    update(ref(db, 'users/' + user.username), {
        groups: groupArray,
    });
    // Add user to group
    /*
    const groupArray = ref(db, 'groups/');
    onValue(groupArray, (snapshot) => {
        var userArray
    })
    */
    const dbref = ref(db, 'users/' + user.username);
    const usergroup = user.groups;
    var groupArray = usergroup; groupArray.push(group);
    update(ref(db, 'users/' + user.username), {
        groups: groupArray,
    });
   
}