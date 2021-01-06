import React,{useEffect} from 'react'
import IconButton from "@material-ui/core/IconButton"
import  Badge  from "@material-ui/core/Badge"
// import { fetchProductsInCart } from "../../reducks/users/operations"
import {useSelector,useDispatch} from "react-redux"
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import { getUserId } from "../../reducks/users/userSlice";
import {getPostsInFavorite} from "../../reducks/users/userSlice"
import { fetchPostsInFavorite} from "../../reducks/users/operations";
import MenuIcon from "@material-ui/icons/Menu"
import {POST} from "../../types/posts"
// import {getUserId,getUserName} from "../../reducks/users/selectors"

import {db} from "../../firebase/index"

import { push } from "connected-react-router";


interface PROPS {
  handleDrawerToggle: any
}

const HeaderMenus: React.FC<PROPS> = (props) => {
  const dispatch = useDispatch()
  const uid = useSelector(getUserId)
    const likesPost = useSelector(getPostsInFavorite)
  let postInFavorite: any =  []

  console.log(likesPost)

   useEffect(() => {
    db.collection("users").doc(uid).collection("likes").onSnapshot((snapshot) => {
    snapshot.docChanges().forEach(change=>{
      const post: any = change.doc.data()
      console.log(post)

      const changeType = change.type;
      switch(changeType){
        case "added":
          // Object.preventExtensions(postInFavorite)

            postInFavorite.push(post)

          break;
        case "modified":
          const index = postInFavorite.findIndex((post:any) => post.likesId === change.doc.id)
          postInFavorite[index] = post
          break;
        case "removed":
          postInFavorite = postInFavorite.filter((post:any) => post.likesId !== change.doc.id);
          break;
          default:
              break;
      }

    })
      dispatch(fetchPostsInFavorite(postInFavorite))

  })

}, []);
  return (
    <div>
      <IconButton onClick={()=>dispatch(push("/likes"))}>
           <Badge badgeContent={likesPost && likesPost.length} color="error">
                  <FavoriteBorderIcon/>
        </Badge>
      </IconButton>
      <IconButton  onClick = {(event)=>props.handleDrawerToggle(event)}>
        <MenuIcon/>
      </IconButton>
    </div>
  )
}

export default HeaderMenus

// import React,{useEffect,useState} from 'react'
// import IconButton from "@material-ui/core/IconButton"
// import Divider from '@material-ui/core/Divider';
// import  Badge  from "@material-ui/core/Badge"
// // import { fetchProductsInCart } from "../../reducks/users/operations"
// import {TextInput,SearchBox,Hits} from "../UI";
// import {makeStyles,createStyles} from '@material-ui/core/styles';
// import {useSelector,useDispatch} from "react-redux"
// // import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
// import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
// import MenuIcon from "@material-ui/icons/Menu"
// import {getUserId,getUserName} from "../../reducks/users/selectors"
// import {  getPostsInFavorite } from "../../reducks/users/selectors";
// import {db} from "../../firebase/index"
// import { fetchPostsInFavorite,fetchPush } from "../../reducks/users/operations";
// import { push } from "connected-react-router";
// import SearchIcon from "@material-ui/icons/Search";

// import { searchReview } from "../../algolia/algolia";
// import algoliasearch from 'algoliasearch';
// import { getPushMessage } from "../../reducks/users/selectors";

// const client = algoliasearch(process.env.REACT_APP_ALGOLIA_ID,
// process.env.REACT_APP_ALGOLIA_SEARCH_KEY);

// const useStyles = makeStyles((theme) =>
//   createStyles({
//      root: {
//     width: '100%',
//     maxWidth: 500,
//       backgroundColor: theme.palette.background.paper,
//     position: 'absolute',
//       overflow: 'auto',
//       top: 60,
//       // left: 500,
//    paddingBottom:0,
//    paddingTop:0,
//       maxHeight: 300,
//       cursor: "pointer",

//     },
//     searchText: {
//        '&:hover': {
//          background: "#eee",
//       },
//     },
//     headerMenu: {
//          display: 'flex',
//       },
//         searchField: {
//           alignItems: 'center',
//           justifyContent:"center",
//             display: 'flex',
//             marginRight: 32,
//           textAlign: "center",
//            position: 'relative',
//           width: 500,
//           borderRadius:20,
//             focus:500
//     },



//     }),
// );

// const HeaderMenus = (props) => {

//   const isSP = window.matchMedia('screen and (max-width: 767px)').matches;
//   const classes= useStyles()
//   const selector = useSelector((state) => state);
//   const dispatch = useDispatch()
//   const uid = getUserId(selector)
//   const [keyword, setKeyword] = useState("");
//   const [search, setSearch] = useState([])
//   const [flatProps,setFlatProps] = useState([])
//   let postInFavorite = getPostsInFavorite(selector)
//   const pushList =getPushMessage(selector)

//   const inputKeyword = async (event) => {
//     setKeyword(event.target.value)
//     if (!event.target.value) {
//       setSearch([])
//     } else {
//       const result = await searchReview(event.target.value)
//       if (result.hits.length > 0) {
//         const search = result.hits.map((hit) => {
//           return hit;

//         });
//         setSearch(search);
//             //  setSearch([]);
//       } else {
//         setSearch([]);
//       }
//     }
//     document.addEventListener('click', e => {
//   setSearch([])
//   document.removeEventListener('click',inputKeyword)
// })
//   };

//   useEffect(() => {
//      dispatch(fetchPush())
//  },[])
//   useEffect(() => {

//     const unSub = db.collection("users").doc(uid).collection("likes").onSnapshot((snapshot) => {
//     snapshot.docChanges().forEach(change=>{
//       const post = change.doc.data()
//       const changeType = change.type;

//       switch(changeType){
//         case "added":
//           postInFavorite.push(post)

//           break;
//         case "modified":
//           const index = postInFavorite.findIndex(post => post.likesId === change.doc.id)
//           postInFavorite[index] = post
//           break;
//         case "removed":
//           postInFavorite = postInFavorite.filter(post => post.likesId !== change.doc.id);
//           break;
//           default:
//               break;
//       }

//     })
//       dispatch(fetchPostsInFavorite(postInFavorite))

//   })
//   return () => {
//    unSub()
//   };
// }, []);

//   return (
//  <>
//     <div className={classes.headerMenu}>


//         {isSP?
//             <>
//                <IconButton>
//               <SearchIcon onClick={ ()=>dispatch(push("/search"))}/>
//               </IconButton>
//               </>
//           :
// <SearchBox fullWidth={true} style="header"/>
//  }
//         <IconButton onClick={() => dispatch(push("/push"))}>
//             <Badge badgeContent={pushList && pushList.length} color="secondary" >
//           <NotificationsNoneIcon />
//           </Badge>
// </IconButton>


//       <IconButton onClick={()=>dispatch(push("/likes"))}>
//         <Badge badgeContent={postInFavorite && postInFavorite.length} color="error">
//                   <FavoriteBorderIcon/>
//         </Badge>
//       </IconButton>
//       <IconButton onClick = {(event)=>props.handleDrawerToggle(event)}>
//         <MenuIcon/>
//       </IconButton>
//       </div>

//       </>
//   )
// }

// export default HeaderMenus
