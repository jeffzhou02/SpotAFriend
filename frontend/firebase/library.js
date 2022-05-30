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

export async function GetGroupMembers(group) {
    // requires the following code in the calling function to work:
    // var [array, setArray] = useState('asdf');
    // var func = async () => {
    //     const promise = await GetGroupMembers("asdf");
    //     const value = promise;
    //     setArray(value);
    // };
    // func();
    const dbref = ref(db, 'groups/' + group);
    const promise = await get(dbref).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val();
        }
        return [];
    });
    return promise;
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