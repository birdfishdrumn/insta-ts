import firebase from "firebase/app"

export type POST = {

  post?:any
  category?: string;
  description: string;
  name: string;
  images: {[key:string]:string}[]
  // image?: IMAGE;
  allImages: {[key:string]:string}[]
  username: string;
  avatar: string;
  uid: string;
  likesId?: string;
  tags?: string[];
  key?: string;
  change?: boolean
  updated_at?: firebase.firestore.Timestamp
  created_at?: firebase.firestore.Timestamp
  id: string

  check?:boolean
}
