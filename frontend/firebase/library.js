import { push, update, ref } from '@firebase/database';
import { useContext } from 'react';
import { db } from "../firebase/index.js";

export function AddUserGroup(user, group) {
    const dbref = ref(db, 'users/' + user.username);
    const usergroup = user.groups;
    var groupArray = usergroup; groupArray.push(group);
    update(ref(db, 'users/' + user.username), {
        groups: groupArray,
    });
}