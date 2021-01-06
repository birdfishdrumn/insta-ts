import React, { useState, useEffect, useCallback } from 'react'
import {
  db,FirebaseTimestamp
} from "../../firebase/index"
import firebase from "firebase/app"
import { useDispatch,useSelector } from "react-redux";
import styles from "../../templates/module.css/Detail.module.css";
import FavoriteIcon from "@material-ui/icons/Favorite"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import { addPostToFavorite } from "../../reducks/users/operations";

import IconButton from "@material-ui/core/IconButton";
import { ModalOpen } from "../UI";
import { Like,addLike } from "../../types/likes"



const Favorite:React.FC<Like> = ({id,uid,likesId,post,props,userPost}) => {
  const [openModal,setOpenModal] =useState(false)
  const dispatch = useDispatch()
  console.log(post.name)
  // const uid = useSelector(getUserId)
  const addToFavorite = useCallback((event: any) => {
    if (!userPost) {
      event.stopPropagation()
      const timeStamp = FirebaseTimestamp.now();
      // いいね済みの作品を押した場合削除する
      if (likesId.includes(id)) {
        // returnによって処理を高速化できる
        return db.collection("users").doc(uid).collection("likes").where("postId", "==", id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const dataId = doc.data().likesId
            return db.collection("users").doc(uid)
              .collection('likes').doc(dataId)
              .delete()
          })
        }).then(() => {
          db.collection("posts").doc(id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(uid),
            count: firebase.firestore.FieldValue.increment(-1)
          })

          setOpenModal(false)
        })

      }
      // いいねしてない商品をデータベースに追加

      dispatch(addPostToFavorite({
        added_at: timeStamp,
        description: post.description,
        images: post.images,
        allImages: post.allImages,
        name: post.name,
        postId: post.id,
      },uid));

      db.collection("posts").doc(id).set({
        likes: firebase.firestore.FieldValue.arrayUnion(uid),
        count: firebase.firestore.FieldValue.increment(1)
      }, {
        merge: true
      })

      setOpenModal(true)
    }
    }, [likesId])


  return (
    <div>
        <div className="favorite">

              <IconButton onClick={addToFavorite}>

          {<FavoriteBorderIcon className={likesId.includes(id) ? styles.favorite : styles.no_favorite}/>
        }

          {!props &&  <p className={styles.favorite_number}> {post.uid === uid && post.likes ? post.likes.length : <></>}</p>}

                  </IconButton>
        {!props && !userPost&& "お気に入りに登録"}
  </div>
            {!props &&  openModal && <ModalOpen title="お気に入りに登録しました"/>}
    </div>
  )
}

export default Favorite

// import React, { useState, useEffect, useCallback } from 'react'
// import {
//   db,FirebaseTimestamp
// } from "../../firebase/index"
// import firebase from "firebase/app"
// import { useDispatch } from "react-redux";
// import styles from "../../templates/module.css/Detail.module.css";
// import FavoriteIcon from "@material-ui/icons/Favorite"
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
// import { addPostToFavorite } from "../../reducks/users/operations";
// import IconButton from "@material-ui/core/IconButton";
// import { ModalOpen } from "../UI";

// const Favorite = ({id,uid,likesId,post,props,userPost}) => {
//   const [openModal,setOpenModal] =useState(false)
//   const dispatch = useDispatch()


//   const addToFavorite = useCallback((event) => {
//     if (!userPost) {
//       event.stopPropagation()
//       const timeStamp = FirebaseTimestamp.now();
//       // いいね済みの作品を押した場合削除する
//       if (likesId.includes(id)) {
//         // returnによって処理を高速化できる
//         return db.collection("users").doc(uid).collection("likes").where("postId", "==", id).get().then((querySnapshot) => {
//           querySnapshot.forEach((doc) => {
//             const dataId = doc.data().likesId
//             return db.collection("users").doc(uid)
//               .collection('likes').doc(dataId)
//               .delete()
//           })
//         }).then(() => {
//           db.collection("posts").doc(id).update({
//             likes: firebase.firestore.FieldValue.arrayRemove(uid),
//             count: firebase.firestore.FieldValue.increment(-1)
//           })

//           setOpenModal(false)
//         })

//       }
//       // いいねしてない商品をデータベースに追加
//       dispatch(addPostToFavorite({
//         added_at: timeStamp,
//         description: post.description,
//         images: post.images,
//         allImages: post.allImages,
//         name: post.name,
//         postId: post.id,

//       }));

//       db.collection("posts").doc(id).set({
//         likes: firebase.firestore.FieldValue.arrayUnion(uid),
//         count: firebase.firestore.FieldValue.increment(1)
//       }, {
//         merge: true
//       })

//       setOpenModal(true)
//     }
//     }, [likesId])


//   return (
//     <div>
//         <div className="favorite">

//               <IconButton onClick={(event) => addToFavorite(event)}>

//           {!props ? <FavoriteIcon className={likesId.includes(id) ? styles.favorite : styles.no_favorite} />
//           : <FavoriteBorderIcon className={likesId.includes(id) ? styles.favorite : styles.no_favorite}/>
//         }

//           {!props && <p className={styles.favorite_number}> {post.uid === uid && post.likes ? post.likes.length : <></>}</p>}

//                   </IconButton>
//         {!props && !userPost&& "お気に入りに登録"}
//   </div>
//             {!props && openModal && <ModalOpen title="お気に入りに登録しました"/>}
//     </div>
//   )
// }

// export default Favorite
