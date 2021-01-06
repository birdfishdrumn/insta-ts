import React, { useEffect,useState }  from 'react'
import { useDispatch, useSelector } from "react-redux";
// import ProductEdit from "./ProductEdit";
import styles from "./module.css/PostList.module.css";
import { makeStyles } from "@material-ui/core/styles";
import { PostCard} from "../components/PostProduct";
// import { fetchPosts } from "../reducks/posts/operations";
import { push } from "connected-react-router";
import {  FirebaseTimestamp,db} from "../firebase";
import { getPosts } from "../reducks/posts/postSlice";
import { hideLoadingAction, showLoadingAction } from "../reducks/loadingSlice";
import count from "count-array-values";
import { getRoute } from "../reducks/users/userSlice"
import { fetchPostsAction } from "../reducks/posts/postSlice"
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import GridOnIcon from '@material-ui/icons/GridOn';
import Tooltip from '@material-ui/core/Tooltip';
import { NormalButton } from "../components/UI";
import ReactLoading from 'react-loading';
import SentimentDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentDissatisfiedOutlined';
import firebase from "firebase/app"
import { POST } from "../types/posts"
import { OrderByDirection } from '@firebase/firestore-types'
// import Carousel from 'react-material-ui-carousel'

const useStyles = makeStyles((theme) => ({
  sort: {
    margin: "20px 50px 10px 0",
    justifyContent: "center",

    color: "grey",
    display: "flex",
    listStyle: "none",
    flexFlow: "row",

    '& > li': {
        margin: 10,

   }
  },

})
)

const PostList = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
const selector: any = useSelector(getRoute);
  const [postsList, setPostsList] = useState<POST[]>([])
  const [order,setOrder] = useState<OrderByDirection>("desc")
  const [lastDoc, setLastDoc] = useState<firebase.firestore.DocumentData>()
  const [isEmpty, setIsEmpty] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [change,setChange] = useState<boolean>(false)

const postsRef = db.collection("posts")
  const query = selector.location.search

  const category = /^\?category=/.test(query) ? query.split("?category=")[1] : "";
   const tags = /^\?tags=/.test(query) ? query.split("?tags=")[1] : "";
  console.log(query)

  const changeSortAsc = () => {
  setOrder("asc")
}
  const changeSortDesc = () => {
  setOrder("desc")
}

const fetchPosts = (category,tags) => {
  return async (dispatch) => {

          dispatch(showLoadingAction("Loading"));
 let query = postsRef.orderBy("updated_at", order);
    query = (category !== "") ? query.where("category", "==", category) : query;
       query = (tags !== "") ? query.where("tags", "array-contains", tags) : query;
       query.limit(10).get()
      .then(snapshots => {
        const postList = []
        snapshots.forEach(snapshot => {
          const post = snapshot.data();
          postList.push(post)


        })
             const lastDoc = snapshots.docs[snapshots.docs.length - 1]
        setLastDoc(lastDoc)
         setPostsList(postList)
          console.log(lastDoc)
        dispatch(fetchPostsAction(postList))
        dispatch(hideLoadingAction());
    })
  }
}

  useEffect(() => {
    dispatch(fetchPosts(category,tags))
 setIsEmpty(false)
  }, [query,order])

  const fetchMore = () => {
    setLoading(true);
     let query = postsRef.orderBy("updated_at", order);
    query = (category !== "") ? query.where("category", "==", category) : query;
       query = (tags !== "") ? query.where("tags", "array-contains", tags) : query;
    //  dispatch(showLoadingAction("Loading"));
    query.startAfter(lastDoc).limit(10).get()
      .then((snapshots) => {
            const isCollectionEmpty = snapshots.size === 0;
        if (!isCollectionEmpty) {
            const postList = []
       snapshots.forEach(snapshot => {
          const post = snapshot.data();
          postList.push(post)
          console.log(postList.length - 1)
        })
       const lastDoc = snapshots.docs[snapshots.docs.length - 1]

        setLastDoc(lastDoc)
        setPostsList((postsList)=>[...postsList,...postList])
        dispatch(fetchPostsAction(postList))
        // dispatch(hideLoadingAction());
         }else {
          setIsEmpty(true)
              // dispatch(hideLoadingAction());
    }
 setLoading(false);
      })
  }

  const imageList = postsList.map((post) => post.images[0])
console.log(imageList)
  const tagsList = postsList.map((post) => post.tags)

  const tagNum = count(tagsList.flat())

  const tagNumSlice = tagNum.slice(0, 6)
  console.log(tagNumSlice)
  const popularTag =  tagNumSlice.map((tagName)=>tagName.value)

  return (
    <section className="c-section-wrapin">
      {/* <Carousel
      animation="slide"
      >
            {
                imageList.map((item, i) => <CarouselItem key={item.id} item={item} src = {item.path}/> )
        }

      </Carousel> */}
        <ul  className={classes.sort}>
          <li onClick={changeSortDesc} >新しい順</li>
        <li onClick={changeSortAsc} >古い順</li>
        <Tooltip title="グリッド" interactive>
           <li><GridOnIcon fontSize="large" onClick={() =>setChange(false) } /></li>
        </Tooltip>
        <Tooltip title="短冊まで" interactive>
            <li onClick={()=>setChange(true)} ><ViewColumnIcon  fontSize="large" /></li>
        </Tooltip>

     </ul>


      {/* <button onClick={snackOpen}>snackbar</button> */}
      {tags && <div className="center large_text">「{tags}」の検索結果</div>}
      <div className={change ? styles.p_grid__scroll : styles.p_grid__row }>

        {postsList.length > 0 ?
          postsList.map((post) => (
               <li  className={styles.p_grid__scroll_item}>
              <PostCard
                change={change}
              post={post}
              key={post.id}
              name={post.name}
                images={post.images}
                allImages={post.allImages}
              id={post.id}
              description={post.description}
              username={post.username}
              avatar={post.avatar}
              uid={post.uid}
            />
              </li>
          )): <div style={{
            height: "100vh",
            backgroundColor:"white"
          }}></div>

        }

      </div>
      <div className="center">
        {loading && (<ReactLoading type="spinningBubbles"
           color={"#eeeeee"}
         />)}
      </div>

      {!loading && !isEmpty && <NormalButton
        label={"もっと見る"}
        onClick={
          fetchMore
        }
      />}
      <div className="module-spacer--medium"/>
      {isEmpty && <><SentimentDissatisfiedOutlinedIcon /><h1>これ以上投稿はありません...</h1></>}
       <h1 className ="u-text__headline">人気のタグ</h1>
      <ul className={styles.post_tag}>

               {tagNumSlice && tagNumSlice.map((t,index) => (
              <li key={index} onClick={()=>dispatch(push(`/?tags=${t.value}`))}>{t.value}</li>
            ))}
            </ul>

 </section>
  )
}

export default PostList
