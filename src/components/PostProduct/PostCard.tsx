import React,{useState,useCallback,useEffect} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Avatar from '@material-ui/core/Avatar';

import CardMedia from "@material-ui/core/CardMedia";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../templates/module.css/Detail.module.css";
import { POST } from "../../types/posts";
import NoImage from "../../assets/img/src/no_image.png";
import { push } from "connected-react-router"
import IconButton from "@material-ui/core/IconButton";
import Favorite from "./Favorite"
// import {  LoginModal} from "../UI";
import { addPostToFavorite } from "../../reducks/users/operations";
import { getUserId, getPostsInFavorite } from "../../reducks/users/userSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      margin: "0px auto",
      width: "187.5px",
    },
    [theme.breakpoints.up("md")]: {
      margin: "24px",
      width: "280px",

    },
        [theme.breakpoints.between("sm","md")]: {
      margin: "16px",
      width: "210px",

    }
  },
  content: {
    display: "flex",
   justifyContent:"space-between",
    textAlign: "left",
    "&:last-child": {
      paddingBottom: "16px",
    },
  },
  media: {
    height: 0,
    paddingTop: "100%",
    position: "relative"
  },
  title:{
    marginTop: "8px"
  },
  avatar:{
    position: "absolute",
    top: 5,
    left:5,
    opacity: 0.5,
      "&:hover": {
           opacity: 1
      }
  },
  favorite: {
     position: "absolute",
    top: 3,
    right: 0

  }

}));

const changeStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      margin: "8px",
      width: "130px",
      height: "360px",
         display: "inlineBlock"

    },
    [theme.breakpoints.up("md")]: {
      margin: "10px",
      width: "130px",

    },
    [theme.breakpoints.between("sm", "md")]: {
      margin: 5,
      width: "120px",
    }
  },
  content: {
    display: "flex",
   justifyContent:"space-between",
    textAlign: "left",
    "&:last-child": {
      paddingBottom: "16px",
    },
  },
  media: {
    height: 360,
    width:130,
    paddingTop: "100%",
    position: "relative"
  },

}));

// interface PROPS{
//   post: any
//   images: any;
//   allImages: string[];
//   id: string;
//   name: string;
//   avatar: string;
//   description
// }



const PostCard:React.FC<POST> = (props) => {
  const classes = useStyles();
  const changeClass = changeStyles()
  // const sizes = props.sizes;
  const dispatch = useDispatch();

  const uid = useSelector(getUserId)
   const [open,setOpen] =useState(false)
  const id = props.id
  const change =props.change

 const postInFavorite =useSelector(getPostsInFavorite);
console.log(postInFavorite)
  const likesId= postInFavorite.map((post: any) =>
    post.postId)
  const handleChange = () => {

      setOpen(true)
    }



  const images = props.images.length > 0 ? props.images : [{ path: NoImage }];
  const allImages =  props.allImages.length ?  props.allImages : [{ path: NoImage }]

  return (
    <div>
 <Card className={change ? changeClass.root : classes.root}>
        <CardMedia
          // 複数登録した画像のうちの最初のものを選択
          className={change ? changeClass.media : classes.media}
          image={change ? allImages[0].path : images[0].path}
          onClick = {()=>dispatch(push("/post/" + props.id))}
        >
          { !change &&
            <>
              <Avatar src={props.avatar} aria-label="recipe" className={classes.avatar} />
                 <div className={classes.favorite}>

              {<Favorite id={id} uid={uid} likesId={likesId} post={props.post} props="true" />}
            </div>
                  </>}


        </CardMedia>

      </Card>
      {/* <LoginModal open={open} setOpen={setOpen}/> */}
    </div>
  )
}

export default PostCard

// import React,{useState} from 'react'
// import { makeStyles } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import Avatar from '@material-ui/core/Avatar';
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import { useDispatch } from "react-redux";
// import Typography from "@material-ui/core/Typography";
// import NoImage from "../../assets/img/src/no_image.png";
// import { useHistory } from "react-router-dom";
// import IconButton from "@material-ui/core/IconButton";
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
// // import { deleteposts } from "../../reducks/posts/operations"

// const useStyles = makeStyles((theme) => ({
//   root: {
//     [theme.breakpoints.down("sm")]: {
//       margin: "8px",
//       width: "150px",
//     },
//     [theme.breakpoints.up("md")]: {
//       margin: "24px",
//       width: "280px",

//     },
//         [theme.breakpoints.between("sm","md")]: {
//       margin: "16px",
//       width: "210px",

//     }
//   },
//   content: {
//     display: "flex",
//    justifyContent:"space-between",
//     textAlign: "left",
//     "&:last-child": {
//       paddingBottom: "16px",
//     },
//   },
//   media: {
//     height: 0,
//     paddingTop: "100%",
//   },
//   title:{
//     marginTop: "8px"
//   },

// }));


// interface PROPS{
//   images: any;
//   id: string;
//   name: string;
//   avatar: string;
// }

// const PostCard: React.FC<PROPS> = (props) => {
//     const classes = useStyles();
// const history = useHistory()
//   const dispatch = useDispatch();

//   // const [anchorEl, setAnchorEl] = useState(null);

//   // const handleClick = (event) => {
//   //   setAnchorEl(event.currentTarget)
//   // };

//   // const handleClose = () => {
//   //   setAnchorEl(null)
//   // };
// // console.log(sizes)
//   const images = props.images.length > 0 ? props.images : [{ path: NoImage }];


//   return (
//     <div>
//  <Card className={classes.root}>
//         <CardMedia
//           // 複数登録した画像のうちの最初のものを選択
//           className={classes.media}
//           image={images[0].path}
//           onClick = {()=>history.push("/post/" + props.id)}
//         />
//         <CardContent className={classes.content}>

//           <Avatar src={props.avatar} aria-label="recipe" />


//           <div  onClick = {()=>history.push("/post/" + props.id)}>
//           <Typography color="textSecondary" component="p" className={classes.title}>
//             {props.name}
//           </Typography>

//           </div>
//           {/* <IconButton onClick={handleClick}>
//             <MoreVertIcon/>
//           </IconButton> */}

//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export default PostCard
