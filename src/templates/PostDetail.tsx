import React, { useState, useEffect, useCallback } from "react"
import Avatar from '@material-ui/core/Avatar';
import { useSelector,useDispatch } from "react-redux";
import {
  db,FirebaseTimestamp
} from "../firebase/index"
import firebase from "firebase/app"
import { makeStyles ,createStyles} from "@material-ui/core/styles";
import HTMLReactParser from "html-react-parser"
import { ImageSwiper,RelationPost,Comment,Favorite } from "../components/PostProduct/index";
import styles from "./module.css/Detail.module.css";

// import {addProductToCart} from "../reducks/users/operations"
import { push } from "connected-react-router";

import { addPostToFavorite } from "../reducks/users/operations";
import { getPostsInFavorite,getUserId } from "../reducks/users/userSlice";

import moment from 'moment'  // #1
import 'moment/locale/ja'
import ReactLoading from 'react-loading';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';

const useStyles = makeStyles((theme) => ({
  sliderBox: {
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto 24px auto",
      height: "auto",
      width: "100%"
    },
    [theme.breakpoints.up("sm")]: {
      margin: "0 auto",
      width: 400,
      height: 400
    }
  },
  detail: {
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto 16px auto",
      height: "auto",
      width: 320
    },
    [theme.breakpoints.up("sm")]: {
      margin: "0 auto",
      width: 400,
      height: "auto"
    }
  },
  media: {
    margin: "auto",
    position: "relative",

    textAlign:"center",
    '& > img': {
         position: "relative",
          margin:"auto",
      height: "70%",
    borderRadius:5,
    width:"70%",
    },
  },
  comment: {
    textAlign: "center"
  },
    small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
}));

const returnCodeToBr = (text) => {
  if(text === "") {
    return text
  } else {
    // 改行コードをhtmlで使える<br>タグに変換する。
    return HTMLReactParser(text.replace(/\r?\n/g,"<br/>"))
  }
};



const PostDetail = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  // const path = selector.router.location.pathname;
const id = window.location.pathname.split("/post/")[1];

  const postInFavorite = useSelector(getPostsInFavorite);

  // お気に入りした作品数
  const likesId = postInFavorite.map(post =>
    post.postId)



//  const username = getUserName(selector);
//   const avatar = getUserAvatar(selector);
const uid =useSelector(getUserId)
  const [post, setPost] = useState(null)
  const [user, setUser] = useState("")
  const [open, setOpen] = useState(false)
  const [tags,setTags] = useState([])

  const [openModal,setOpenModal] =useState(false)


// 作品のidを持った作品をとってくる。
  useEffect(() => {
    // 個別の商品情報の取得なのでdoc(id)と引数にidを忘れない
    if (id) {
      const unSub = db.collection("posts").doc(id).onSnapshot(doc => {
        const data = doc.data()
        const tags = data.tags
        setPost(data)
        setTags(tags)
      })
      return () => {
        unSub()
      }
    }
  }, [id]);


useEffect(() => {
      db.collection("users").doc(uid).get().then(doc => {
        const data:any = doc.data()
        setUser(data)
        console.log(data)
    })
}, []);
console.log(tags)
  const random = Math.floor(Math.random() * tags.length);
  const randomTag = tags[random]

  return (
     <section className ="c-section-wrapin">
      {post ? (
        <>
        <div className="p-grid__row">
          <div className = {classes.sliderBox}>
              <ImageSwiper images={post.images} />

            </div>


          <div className={classes.detail}>


            <Avatar src={post.avatar} />

            <p>{post.username}</p>

            <div className="module-spacer--small" />
            <h1 className="center u-text__title">作品タイトル</h1>
            <h2 className="u-text__headline">{post.name}</h2>
            <div className="module-spacer--small" />

            <h1 className="center u-text__title">作品の説明</h1>
            <div className="module-spacer--small" />
            {/* 説明欄に改行を可能にする。 */}

              <p>{returnCodeToBr(post.description)}</p>
              <div className="module-spacer--small" />
              <h1 className="center u-text__title">全体の写真</h1>
              <div className="module-spacer--small" />
              <div className={classes.media}>
                     　<img src={post.allImages[0].path}/>
              </div>
              <div className="module-spacer--small" />

            {/* タグ一覧 */}
            <ul className={styles.post_tag}>
                     <LocalOfferOutlinedIcon/>
               {post.tags && post.tags.map((t,index) => (
              <li key={index} onClick={()=>dispatch(push(`/?tags=${t}`))}>{t}</li>
            ))}
            </ul>

              <Favorite id={id} uid={uid} likesId={likesId} post={post} />


              <div className={classes.comment}>
                {post.check !== true ?
                <Comment id={id} user={user} uid={uid} />:
                <h1>コメントは非表示になっています。</h1>
                }
              </div>

            </div>

          </div>
          {post.tags.length > 0 ? <div className="c-section-wrapin">
            <RelationPost randomTag={randomTag} tags={tags} id={id}  />
          </div>
             : <h1>関連作品はありません</h1>}
          </>
      ):(
        <div style={{
            height: "100vh",
            backgroundColor:"white"
        }}>
          <ReactLoading type="spinningBubbles"  />
          </div>
      )
}
  </section>

)
};


export default PostDetail

// import React, { useState, useEffect, useCallback } from "react"
// import styles from "./module.css/Detail.module.css";
// import { useSelector, useDispatch } from "react-redux";
// import firebase from "firebase/app"
// import {
//   db,FirebaseTimestamp
// } from "../firebase/index"
// import { makeStyles } from "@material-ui/styles";
// import HTMLReactParser from "html-react-parser"
// import { ImageSwiper} from "../components/PostProduct";
// // import {addProductToCart} from "../reducks/users/operations"
// import Avatar from '@material-ui/core/Avatar';
// import SendIcon from "@material-ui/icons/Send"
// import { getUserId ,getUserAvatar,getUsername} from "../reducks/users/userSlice"

// interface COMMENTS {
//   id: string;
//   avatar: string;
//       text: string,
//       username: string
//   timestamp: any;
// }


// const useStyles = makeStyles((theme: any) => ({
//   sliderBox: {
//     [theme.breakpoints.down("sm")]: {
//       margin: "0 auto 24px auto",
//       height: 320,
//       width: 320
//     },
//     [theme.breakpoints.up("sm")]: {
//       margin: "0 auto",
//       width: 400,
//       height: 400
//     }
//   },
//   detail: {
//     textAlign: "left",
//     [theme.breakpoints.down("sm")]: {
//       margin: "0 auto 16px auto",
//       height: "auto",
//       width: 320
//     },
//     [theme.breakpoints.up("sm")]: {
//       margin: "0 auto",
//       width: 400,
//       height: "auto"
//     }
//   },
//   price: {
//     fontSize: 36
//   },
//   small: {
//     width: theme.spacing(3),
//     height: theme.spacing(3),
//     marginRight: theme.spacing(1),
//   },
// }));

// const returnCodeToBr = (text: string) => {
//   if(text === "") {
//     return text
//   } else {
//     // 改行コードをhtmlで使える<br>タグに変換する。
//     return HTMLReactParser(text.replace(/\r?\n/g,"<br/>"))
//   }
// };



// const PostDetail = () => {
//   const classes = useStyles()
//   const dispatch = useDispatch()

// const id = window.location.pathname.split("/post/")[1];

//   const [post, setPost]: any | null = useState(null)
// const uid =useSelector(getUserId)
//   const avatar = useSelector(getUserAvatar)
//   const username = useSelector(getUsername)
//   const [user, setUser] = useState("")
//   const [comment, setComment] = useState("");
//   const [comments, setComments] = useState<COMMENTS[]>([
//     {
//       id: "",
//       avatar: "",
//       text: "",
//       username: "",
//       timestamp: null
//     },
//   ]);

//   useEffect(() => {
//     // 個別の商品情報の取得なのでdoc(id)と引数にidを忘れない

//     db.collection("posts").doc(id).get().then(doc => {
//       const data: any = doc.data()
//       setPost(data)
//       console.log(doc.data())
//     })
//   }, []);

// useEffect(() => {
//     const unSub= db.collection("posts").
//       doc(id)
//       .collection("comments")
//       .orderBy("timestamp", "desc")
//       .onSnapshot((snapshot) => {
//         setComments(
//           snapshot.docs.map((doc) =>({
//             id: doc.id,
//             avatar: doc.data().avatar,
//             text: doc.data().text,
//             timestamp: doc.data().timestamp,
//             username: doc.data().username
//          }))
//         )
//           return () => {
//       unSub()
//     }
//       })

//   }, [])


//   const newComment = (e:  React.FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
//       const comRef = db.collection("posts").doc(id).collection("comments")
//     comRef.add({
//       avatar: avatar,
//       text: comment,
//       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//       username: username,
//       id: uid


//     }).then((comRef) => {
//       const id = comRef.id
//       comRef.set({
//           comId: id
//       }, {
//           merge: true
//         })
//     })
//       db.collection("users").doc(uid).set({

//         commentId: firebase.firestore.FieldValue.arrayUnion(id)
//       }, {
//         merge: true
//       })
//     setComment("");
//   }

//   return (
//     <section className = "c-section-wrapin">
//       {post && (
//         <div className="p-grid__row">

//           <div className = {classes.sliderBox}>
//             <ImageSwiper images={post.images}/>
//           </div>
//           <div className={classes.detail}>

//             <Avatar src={post.avatar} />
//             <p>{post.username}</p>

//             <div className="module-spacer--small" />
//             <h1 className="center">作品タイトル</h1>
//             <h2 className="u-text__headline">{post.name}</h2>

//             <div className="module-spacer--small" />
//             {/* <SizeTable addPost={addPost} sizes = {post.sizes} /> */}
//             <h1 className="center">作品の説明</h1>
//             <div className="module-spacer--small" />
//             {/* 説明欄に改行を可能にする。 */}
//             <p>{returnCodeToBr(post.description)}</p>

//   <form onSubmit={newComment}>
//           <div className={styles.post_form}>
//             <input
//               className={styles.post_input}
//               type="text"
//               placeholder="コメントを入力して下さい。"
//               value={comment}
//               onChange={(e)=>
//                 setComment(e.target.value)
//               }
//             />

//             <button
//               disabled={!comment}
//               className={
//                 comment ? styles.post_button : styles.post_buttonDisable
//                  }
//               type="submit"
// >
//             <SendIcon className={styles.post_sendIcon} />
//             </button>
//           </div>

//           </form>
// {comments.map((com) => (
//   <div key={com.id} className={styles.post_comment}>

//           <Avatar src={com.avatar} className={classes.small} />

//                 <span className={styles.post_commentUser}>@{com.username}さん</span>


//                 <span className={styles.post_commentText}>{com.text} </span>

//                 <span className={styles.post_headerTime}>
//                   {new Date(com.timestamp?.toDate()).toLocaleString()}
//                 </span>
//               </div>
//             ))}


//           </div>

//         </div>
// )}
//   </section>
// )
// };


// export default PostDetail
