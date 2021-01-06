import React from 'react';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import {makeStyles} from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import {useSelector,useDispatch} from "react-redux";
import {getUserId} from "../../reducks/users/userSlice";
import { db } from "../../firebase/index"
import { push } from "connected-react-router"
import {  Like} from "../../types/likes";

const useStyles = makeStyles({
  list: {
    height: 128
  },
  image: {
    objectFit: "cover",
    margin: 16,
    height: 96,
    width: 96,
    cursor: "pointer"

  },
  text: {
    width: "100%"
  }
})

interface PROPS {
  post: any;
  key: string;
}

const FavoriteListItem:React.FC<PROPS> = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const name = props.post.name
  const uid = useSelector(getUserId)
  const image = props.post.images[0]?.path;
const id = props.post.postId
console.log(props.post.likesId)
  const removePostFromFavorite = (id) => {
    return db.collection("users").doc(uid)
      .collection('likes').doc(id)
    .delete()
}

  return (

    <>
      <ListItem className={classes.list}>

        <ListItemAvatar  >
            <img  onClick={()=>dispatch(push(`/post/${id}`))} className = {classes.image} src={image} alt="作品画像"/>
        </ListItemAvatar>
        <div className={classes.text}>
          <ListItemText primary={name}  />

        </div>
        {/* props.post.likesIdは削除する商品のid */}
        <IconButton onClick={() => removePostFromFavorite(props.post.likesId)}>
          <DeleteIcon/>
        </IconButton>
      </ListItem>
      <Divider/>
    </>

  )
}

export default FavoriteListItem
