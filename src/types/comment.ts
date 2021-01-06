import firebase from "firebase/app"

export type COMMENT = {
  avatar: string;
  comId?: string;
  id: string;
  postId?: string;
  text: string;
  timestamp: firebase.firestore.Timestamp;
  username: string;
 }
