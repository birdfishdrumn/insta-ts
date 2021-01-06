import firebase from "firebase/app"

export type Like = {
  id: string;
  uid: string;
  likesId: string[];
  post: any;
  props?: string;
  userPost?: any;
}

export type addLike = {
  added_at?: firebase.firestore.Timestamp;
  description: string;
  images: string[];
  allImages: string[];
  name: string;
  postId: string;
  likesId?: string;
  uid?: string;
}
