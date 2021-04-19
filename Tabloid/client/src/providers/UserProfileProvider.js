import React, { useState, useEffect, createContext } from "react";
import { Spinner } from "reactstrap";
import * as firebase from "firebase/app";
import "firebase/auth";

export const UserProfileContext = createContext();

export function UserProfileProvider(props) {
  const apiUrl = "/api/userprofile";

  const userProfile = sessionStorage.getItem("userProfile");
  const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);

  const [userProfiles, setUserProfiles] = useState([])

  const getAllUserProfiles = () => {
    return fetch(`${apiUrl}`)
    .then(res => res.json())
    .then(setUserProfiles)
  }
// const loadJokesForType = (type) => {
//   const url = `https://official-joke-api.appspot.com/jokes/${type}/ten`;
//   fetch(url).then(resp => resp.json())
//     .then(jokes => {
//       setJokes(jokes);
//       setSelectedType(type);
//     });
// };

// const getUserProfile = (firebaseUserId) => {
//   return getToken().then((token) =>
//     fetch(`${apiUrl}/${firebaseUserId}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }).then(resp => resp.json()));
// };

  const [isFirebaseReady, setIsFirebaseReady] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((u) => {
      setIsFirebaseReady(true);
    });
  }, []);

  const login = (email, pw) => {
    return firebase.auth().signInWithEmailAndPassword(email, pw)
      .then((signInResponse) => getUserProfile(signInResponse.user.uid))
      .then((userProfile) => {
        sessionStorage.setItem("userProfile", JSON.stringify(userProfile));
        setIsLoggedIn(true);
      });
  };

  const logout = () => {
    return firebase.auth().signOut()
      .then(() => {
        sessionStorage.clear()
        setIsLoggedIn(false);
      });
  };

  const register = (userProfile, password) => {
    return firebase.auth().createUserWithEmailAndPassword(userProfile.email, password)
      .then((createResponse) => saveUser({ ...userProfile, firebaseUserId: createResponse.user.uid }))
      .then((savedUserProfile) => {
        sessionStorage.setItem("userProfile", JSON.stringify(savedUserProfile))
        setIsLoggedIn(true);
      });
  };

  const getToken = () => firebase.auth().currentUser.getIdToken();

  const getUserProfile = (firebaseUserId) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${firebaseUserId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => {
        console.log("testing", resp)
        return resp.json()}));
  };

  const saveUser = (userProfile) => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userProfile)
      }).then(resp => resp.json()));
  };

  return (
    <UserProfileContext.Provider value={{ userProfiles, isLoggedIn, login, logout, register, getToken, getUserProfile, getAllUserProfiles }}>
      {isFirebaseReady
        ? props.children
        : <Spinner className="app-spinner dark"/>}
    </UserProfileContext.Provider>
  );
}