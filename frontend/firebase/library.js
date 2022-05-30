import { set, update, ref, get, child, remove } from 'firebase/database';
import { db } from "../firebase/index.js";

export function EditUserAttrib(userobj, attrib, value, func) {
    var userExists = true;
    const dbref = ref(db, 'users/' + userobj.username);
    if (attrib != "username") {
        update(dbref, {
            [attrib]: value,
        });
        return true;
    } else {
        userExists = get(ref(db, 'users/' + value)).then(async (snapshot) => {
            if (snapshot.exists()) {
                await func("User " + value + " already exists"); return false;
            }
            get(dbref).then((snap) => {
                if (snap.exists()) {
                    var data = snap.val();
                    data.username = value;
                    var updated = {};
                    updated[value] = data;
                    set(child(ref(db, 'users/'), value),updated[value]);
                }
            }).catch((error) => {
                console.error(error);
            });
            remove(ref(db, 'users/' + userobj.username));
            return true;
        });
        return userExists;
    }
}

export function GetGroupMembers(group) {
}

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