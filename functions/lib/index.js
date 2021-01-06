"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require('firebase-functions');
// import algoliasearch from "algoliasearch"
const algoliasearch = require("algoliasearch");
const admin = require('firebase-admin');
admin.initializeApp();
const ALGOLIA_ID = functions.config().algolia.id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.key;
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex("posts");
exports.onWritePosts = functions
    .region("asia-northeast1")
    .firestore
    .document("posts/{postId}")
    .onWrite((change, context) => {
    const { postId } = context.params;
    const posts = change.after.data();
    console.log(posts);
    try {
        index.saveObject(Object.assign({ objectID: postId }, posts));
    }
    catch (err) {
        console.log(err);
    }
});
//  exports.onPushComment = functions
//   .region("asia-northeast1")
//   .firestore
//     .document("posts/{postId}/comments/{commentId}")
//    .onWrite((async (change, context) => {
//        const db = admin.firestore();
//       const { commentId } = context.params
//      const comment = change.after.data()
//      const comUid = comment.id
//      console.log(comment)
//     //  コメントしたユーザーの情報を取得
//       const username = comment.username
//      const userAvatar = comment.avatar
//      const postId = comment.postId
//     //  コメントした作品のデータ
//      const postData = await db.collection("posts").doc(postId).get().then((snapshot) => {
//        const data = snapshot.data()
//        console.log(data)
//        return {
//          uid: data.uid,
//          image: data.images[0].path
//        }
//      })
//      const postUid = postData.uid
//        const postImage = postData.image
//      try {
//         const userRef = db.collection("users").doc(postUid)
//        const id = userRef.collection("message").doc().id
//        if (comUid !== postUid) {
//          userRef.collection("message").doc(id).set({
//            message: `${username}があなたの作品にコメントしました`,
//            id: id,
//            timeLimit: 7,
//            createdAt: admin.firestore.FieldValue.serverTimestamp(),
//            // username: username,
//            avatar: userAvatar,
//            image: postImage,
//            postId: postId
//          })
//        }
//      } catch (err) {
//        console.log(err)
//       }
//    }))
//   exports.onPushLike = functions
//   .region("asia-northeast1")
//   .firestore
//     .document("users/{userId}/likes/{likeId}")
//     .onWrite((async (change, context) => {
//          const db = admin.firestore();
//       const { likeId } = context.params
//       const like = change.after.data()
//       const likesPost = like.postId
//       const likesUid = like.uid
//         const likeUser =  await db.collection("users").doc(likesUid).get().then((snapshot) => {
//            const data = snapshot.data()
//           return {
//             username: data.username,
//             avatar: data.avatar
//             }
//           })
//       const username = likeUser.username
//       const userAvatar = likeUser.avatar
//       // いいねされた作品のidを取得
//       // console.log(likesPost)
//       try {
//         // そのpostのuidを取得する。
//         const postRef = db.collection("posts").doc(likesPost);
//         // 作品投稿者のuid
//         const postData = await postRef.get().then((snapshot) => {
//           const data = snapshot.data()
//           const json = JSON.stringify(data)
//           const newData = JSON.parse(json)
//           return {
//             uid: newData.uid,
//             image: newData.images[0].path
//             }
//           // console.log(newData)
//         })
//         const uid = postData.uid
//         const image =postData.image
//         console.log(uid)
//         const userRef = db.collection("users").doc(uid)
//         if (uid !== likesUid) {
//           const id =userRef.collection("message").doc().id
//           userRef.collection("message").doc(id).set({
//             message: `${username}があなたの作品をお気に入りに登録しました`,
//             id: id,
//             timeLimit: 7,
//             createdAt: admin.firestore.FieldValue.serverTimestamp(),
//             // username: username,
//             avatar: userAvatar,
//             image: image,
//             postId:likesPost
//           })
//         }
//       } catch (err) {
//         console.log(err)
//      }
//   }))
//# sourceMappingURL=index.js.map