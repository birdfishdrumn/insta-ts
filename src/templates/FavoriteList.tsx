import React,{useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import List from "@material-ui/core/List";
import { getPostsInFavorite } from "../reducks/users/userSlice";
import { FavoriteListItem,PostCard } from "../components/PostProduct"
import styles from "./module.css/PostList.module.css";
import { makeStyles } from "@material-ui/core/styles";
import ListIcon from '@material-ui/icons/List';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
// import { DragDropContext, Droppable } from "react-beautiful-dnd";

const reorder = (
  list,
  startIndex,
  endIndex
) => {

  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '0 auto',
        maxWidth: 512,
        width: '100%'
  },
  listIcon: {
    margin:"auto",
    display: "flex",
    flexFlow: "row",
    justifyContent:"center",
    listStyle: "none",
    color:"grey",
    '& > li': {
      margin:10
    },
  },

}));

const FavoriteList = () => {
     const classes = useStyles();
  const selector = useSelector(state => state);
  const [openList,setOpenList] = useState(false)
  // getPostsInFavoriteの処理により、お気に入りに登録された作品リストをレンダリングされた時点で取得できる。
  const postInFavorite = useSelector(getPostsInFavorite);
  const [sortPost, setSortPost] = useState({ items: postInFavorite })
  console.log(sortPost)

  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }
    const items = reorder(
      sortPost.items,
      result.source.index,
      result.destination.index
    );
    // おそらくstateにドラッグできるようにidを採番したものをsetStateした。

    setSortPost({ items });


  };

  return (
    <div>
      <section className="c-section-wrapin center">

        <h2
          className="u-text__headline"><FavoriteBorderIcon />お気に入りリスト</h2>
        <ul className={classes.listIcon}>
          <li><ListIcon fontSize="large" onClick={() => setOpenList(false)} /></li>
          <li onClick={() => setOpenList(true)}> <ViewColumnIcon fontSize="large" /></li>
        </ul>
<div className={styles.p_grid__scroll}>
        {openList ?
<h1>まだ</h1>
        // <DragDrop/>

          :
          <List className={classes.root}>
          {postInFavorite.length > 0 && (
            postInFavorite.map(post => <FavoriteListItem key={post.likesId} post={post}/>)
          )}
            </List>}
          </div>



      </section>
    </div>
  )
}

export default FavoriteList
