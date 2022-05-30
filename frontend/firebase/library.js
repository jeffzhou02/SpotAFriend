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

export function AddUserGroup(userobj, group) {
    const dbref = ref(db, 'users/' + userobj.username);
    const usergroup = userobj.groups;
    var groupArray = usergroup; 
    groupArray.push(group);
    update(dbref, {
        groups: groupArray,
    });
}