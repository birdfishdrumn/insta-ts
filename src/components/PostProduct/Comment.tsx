import React, { useState, useEffect, useCallback } from 'react'
import Avatar from '@material-ui/core/Avatar';
import {
  db
} from "../../firebase/index"
import firebase from "firebase/app"
import styles from "../../templates/module.css/Detail.module.css";
import SendIcon from "@material-ui/icons/Send"
import { makeStyles ,createStyles} from "@material-ui/core/styles";
import MessageIcon from "@material-ui/icons/Message"
import IconButton from "@material-ui/core/IconButton";
import { COMMENT } from "../../types/comment";
import moment from 'moment'  // #1
import 'moment/locale/ja'


const useStyles = makeStyles((theme) => ({

    small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
}));

const Comment = ({ id, user, uid }) => {
    const classes = useStyles()
  const [comment, setComment] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false)
  const [comments, setComments] = useState<COMMENT[]>([
    {
      id: "",
      avatar: "",
      text: "",
      username: "",
      timestamp: null
    },
  ]);
     useEffect(() => {
     if (id) {
       const unSub = db.collection("posts").
         doc(id)
         .collection("comments")
         .orderBy("timestamp", "desc")
         .onSnapshot((snapshot) => {
           setComments(
             snapshot.docs.map((doc) => ({
               id: doc.id,
               avatar: doc.data().avatar,
               text: doc.data().text,
               timestamp: doc.data().timestamp,
               username: doc.data().username

             }as COMMENT))
           )

         })
       return () => {
         unSub()
       }
     }
     }, [id])

   const newComment = async(e) => {
      e.preventDefault();
     const comRef = await db.collection
       ("posts").doc(id).collection("comments")
     const comId = comRef.doc().id
    comRef.doc(comId).set({
      avatar: user.avatar,
      text: comment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: user.username,
      id: uid,
      postId: id,
      comId: comId
    }as COMMENT).then(() => {
      setOpen(true)
    }).catch(() => {
      alert("コメントの送信に失敗しました")
    })
     await db.collection("users").doc(uid).set({

        commentId: firebase.firestore.FieldValue.arrayUnion(id)
      }, {
        merge: true
      })
    setComment("");
    }
  return (
    <div>
      <form onSubmit={newComment}>
          <div className={styles.post_form}>
            <input
              className={styles.post_input}
              type="text"
              placeholder="コメントを入力して下さい。"
              value={comment}
              onChange={(e)=>
                setComment(e.target.value)
              }
            />
            <button
              disabled={!comment}
              className={
                comment ? styles.post_button : styles.post_buttonDisable
                 }
              type="submit"
>
            <SendIcon className={styles.post_sendIcon} />
            </button>
          </div>
      <MessageIcon
          className={styles.post_commentIcon}
          onClick={() => setOpen(!open)}
            />
            <span className={styles.post_commentLength}>{comments.length ? <>{comments.length}件のコメントがあります</> : "コメントがまだありません"}
              {/* {moment('2018-10-19 13:13:13').fromNow()} */}
</span>
            {open && comments.map((com) => (
  <>
  <div key={com.id} className={styles.post_comment}>
          <Avatar src={com.avatar} className={classes.small} />

                <span className={styles.post_commentUser}>@{com.username}さん</span>
                <span className={styles.post_commentText}>{com.text} </span>
  </div>

                <span className={styles.post_headerTime}>
      {moment(new Date(com.timestamp?.toDate()).toLocaleString()).fromNow()}

                </span>
                </>
            ))}
            </form>
    </div>
  )
}

export default Comment
