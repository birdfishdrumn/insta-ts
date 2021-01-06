import firebase from "firebase/app"

import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"
import "firebase/functions"
import firebaseConfig from "./config"

// reacアプリの中でfirebaseを使えるように
firebase.initializeApp(firebaseConfig)

// 使いやすくするために定数化
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const functions = firebase.functions();

export const FirebaseTimestamp = firebase.firestore.Timestamp;
