import { set, update, ref, get, child, remove, push } from "firebase/database";
import { db } from "../firebase/index.js";
import { useState } from "react";

export function EditUserAttrib(userobj, attrib, value, func) {
  var userExists = true;
  const dbref = ref(db, "users/" + userobj.username);
  if (attrib != "username") {
    update(dbref, {
      [attrib]: value,
    });
    return true;
  } else {
    userExists = get(ref(db, "users/" + value)).then(async (snapshot) => {
      if (snapshot.exists()) {
        await func("user " + value + " already exists");
        return false;
      }
      get(dbref)
        .then((snap) => {
          if (snap.exists()) {
            var data = snap.val();
            data.username = value;
            var updated = {};
            updated[value] = data;
            set(child(ref(db, "users/"), value), updated[value]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      remove(ref(db, "users/" + userobj.username));
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
  const dbref = ref(db, "groups/" + group);
  const promise = await get(dbref).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return [];
  });
  return promise;
}

export async function GetGroupMembers1(groupName) {
  const dbref = child(ref(db, "groups"), groupName);
  const promise = await get(dbref)
    .then((snapshot) => {
      if (snapshot.exists()) {
        var data = [];
        snapshot.forEach((childSnap) => {
          data.push(childSnap.val());
        });
        return data;
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return promise;
}

export function AddUserGroup(user, group) {
  // Add group to user
  var groupArray = user.groups;
  for (const element of groupArray) {
    if (element == group) {
      return;
    }
  }
  groupArray.push(group);
  update(ref(db, "users/" + user.username), {
    groups: groupArray,
  });

  // Add user to group
  //userArray.push(user.username);
  //update(ref(db, 'groups/' + group), userArray);
}

export function AddNewGroup(user, group) {
  // Add group to user
  var groupArray = user.groups;
  for (const element of groupArray) {
    if (element == group) {
      return;
    }
  }
  groupArray.push(group);
  update(ref(db, "users/" + user.username), {
    groups: groupArray,
  });

  set(ref(db, "groups/" + group), {
    0: user.username,
  });
}
