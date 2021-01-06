import React,{useState,useCallback,useEffect} from "react"
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles,createStyles} from '@material-ui/core/styles';
import {push} from "connected-react-router";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../../reducks/users/operations";
import {TextInput} from "../UI";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HistoryIcon from '@material-ui/icons/History';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { db } from "../../firebase";
import { getIsSignedIn } from "../../reducks/users/userSlice";
import { useHistory } from "react-router-dom";
// import {getUserRole} from "../../reducks/users/selectors";
// import { FilterSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) =>
    createStyles({
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: 256,
                flexShrink: 0,
            }
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar, //appbarとtoolbarをセットで使うstyle
        drawerPaper: {
            width: 256,
        },
        searchField: {
            alignItems: 'center',
            display: 'flex',
            marginLeft: 32
        }
    }),
);
interface PROPS {

  onClose: any
  container?: any
  open: boolean

}


interface FILTER {
func: (event: any, path: string) => void;
  label: string;
  id: string;
  value: string
}

const ClosableDrawer: React.FC<PROPS> = (props) => {
  const classes = useStyles()
  const { container } = props;
  const dispatch = useDispatch();
  const isSignedIn = useSelector(getIsSignedIn);

  const history = useHistory()
    const selectMenu = (event: any, path: string) => {
    history.push(path)
    // 選択したらドロワーが閉じる
    props.onClose(event,false)
}
 const [filters, setFilters] = useState<FILTER[]>([
    { func: selectMenu, label: "すべて", id: "all", value: "/" }]
)


  const menus = [
    { func: selectMenu, label: "作品登録", icon: <AddCircleIcon />, id: "register", value: "/posts/edit" },
        { func: selectMenu, label: "お気に入りリスト", icon: <HistoryIcon />, id: "history", value: "/order/history"},
        { func: selectMenu, label: "プロフィール", icon: <PersonIcon />, id: "profile", value: "/user/mypage"}
  ]
  useEffect(() => {
  if (isSignedIn) {
    db.collection("categories")
      .orderBy("order", "asc")
      .get()
      .then((snapshots) => {
        const list = [];
        snapshots.forEach((snapshot) => {
          const data = snapshot.data();
           console.log(data)
          list.push({
            func: selectMenu,
            label: data.name,
            id: data.id,
            value: `/?category=${data.id}`,
          });
        });

        setFilters((prevState) => [...prevState, ...list]);

      });
  }
  }, [isSignedIn]); 

  return (
    <nav className ={classes.drawer}>
      <Drawer
        container={container}
        variant="temporary" //出したり閉じたり
        anchor="right" //右から出てくる。
        open={props.open}
        onClose={(e) => props.onClose(e,false)}
        classes={{ paper: classes.drawerPaper }}
        ModalProps = {{keepMounted: true}} //スマホ表示の際にドロワーのパフォーマンスが上がる
      >
        <div
          onClick={(e: any): any=> props.onClose(e,false)}
          onKeyDown={(e:  React.KeyboardEvent<HTMLDivElement>): any =>props.onClose(e)}
        >

          <Divider />
          <List>
            {menus.map(menu => (
              <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
                <ListItemIcon>
                  {menu.icon}
                </ListItemIcon>
                <ListItemText primary = {menu.label} />
              </ListItem>
            ))}
            <ListItem button key="logout" onClick={() => dispatch(signOut())}>
              <ListItemIcon>
                   <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />

            </ListItem>
          </List>
          <Divider />
       <List>
     {filters.map(filter => (
              <ListItem button key={filter.id}
              onClick={(e)=>filter.func(e,filter.value)}
              >
                <ListItemText primary = {filter.label}/>
              </ListItem>
            ))}
          </List>
</div>
</Drawer>
    </nav>
  )
}

export default ClosableDrawer

// import React,{useState,useCallback,useEffect} from "react"
// import Divider from '@material-ui/core/Divider';
// import Drawer from '@material-ui/core/Drawer';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import {makeStyles,createStyles} from '@material-ui/core/styles';
// import {push} from "connected-react-router";
// import {useDispatch, useSelector} from "react-redux";
// import {signOut} from "../../reducks/users/operations";
// import {TextInput} from "../UI";
// import IconButton from "@material-ui/core/IconButton";
// import SearchIcon from "@material-ui/icons/Search";
// import AddCircleIcon from '@material-ui/icons/AddCircle';
// import Avatar from '@material-ui/core/Avatar';
// import HistoryIcon from '@material-ui/icons/History';
// import PersonIcon from '@material-ui/icons/Person';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import BrushIcon from '@material-ui/icons/Brush';
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
// import { db } from "../../firebase";
// import {getIsSignedIn,getUserAvatar,getUserName} from "../../reducks/users/selectors";


// const useStyles = makeStyles((theme) =>
//     createStyles({
//         drawer: {
//             [theme.breakpoints.up('sm')]: {
//                 width: 286,
//                 flexShrink: 0,
//             }
//         },
//         // necessary for content to be below app bar
//         toolbar: theme.mixins.toolbar, //appbarとtoolbarをセットで使うstyle
//         drawerPaper: {
//             width: 286,
//         },
//         searchField: {
//             alignItems: 'center',
//             display: 'flex',
//             marginLeft: 32
//         }
//     }),
// );


// const ClosableDrawer = (props) => {
//   const classes = useStyles()
//   const { container } = props;
//   const selector = useSelector((state) => state)
//   const avatar = getUserAvatar(selector)
//   const username = getUserName(selector)
//   const dispatch = useDispatch();

//   const [keyword, setKeyword] = useState("");
//   const [search,setSearch] = useState([])

//   // 検索結果　
//   // const inputKeyword = useCallback((event) => {
//   //   setKeyword(event.target.value)
//   // }, [setKeyword])



//   const selectMenu = (event, path) => {
//     dispatch(push(path))
//     // 選択したらドロワーが閉じる
//     props.onClose(event,false)
// }
//   const [filters, setFilters] = useState([
//       { func: selectMenu, label: "すべて", id: "all", value: "/" },

//   ]
// )

//   const menus = [
//     { func: selectMenu, label: "作品登録", icon: <AddCircleIcon />, id: "register", value: "/posts/edit" },
//       { func: selectMenu, label: "絵付け道場", icon: <BrushIcon />, id: "doujou", value: "/doujou"},
//         { func: selectMenu, label: "お気に入りリスト", icon: < FavoriteBorderIcon/>, id: "history", value: "/likes"},
//         { func: selectMenu, label: "プロフィール", icon: <PersonIcon />, id: "profile", value: "/user/mypage"}
//   ]
// // ログイン状態をselector関数で取得する
//      const isSignedIn = getIsSignedIn(selector);
//   useEffect(() => {

//   if (isSignedIn) {
//     db.collection("categories")
//       .orderBy("order", "asc")
//       .get()
//       .then((snapshots) => {
//         const list = [];
//         snapshots.forEach((snapshot) => {
//           const data = snapshot.data();
//            console.log(data)
//           list.push({
//             func: selectMenu,
//             label: data.name,
//             id: data.id,
//             value: `/?category=${data.id}`,
//           });
//         });

//         setFilters((prevState) => [...prevState, ...list]);

//       });
//   }
//   }, [isSignedIn]); 


//   return (
//     <nav className ={classes.drawer}>
//       <Drawer
//         container={container}
//         variant="temporary" //出したり閉じたり
//         anchor="right" //右から出てくる。
//         open={props.open}
//         onClose={(e) => props.onClose(e,false)}
//         classes={{ paper: classes.drawerPaper }}
//         ModalProps = {{keepMounted: true}} //スマホ表示の際にドロワーのパフォーマンスが上がる
//       >
//         <div
//           onClose={(e) => props.onClose(e,false)}
//           onKeyDown={(e)=>props.onClose(e,false)}
//         >
//           <List><ListItem>
//             <ListItemIcon>
//                    <Avatar src={avatar} aria-label="recipe"/>
//             </ListItemIcon>
//             <ListItemText>
//               ようこそ、{username}さん！
//             </ListItemText>
//           </ListItem>


//           </List>

//           <List>
//             {menus.map(menu => (
//               <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
//                 <ListItemIcon>
//                   {menu.icon}
//                 </ListItemIcon>
//                 <ListItemText primary = {menu.label} />
//               </ListItem>
//             ))}
//             <ListItem button key="logout" onClick={() => dispatch(signOut())}>
//               <ListItemIcon>
//                    <ExitToAppIcon />
//               </ListItemIcon>
//               <ListItemText primary={"Logout"} />

//             </ListItem>
//           </List>
//           <Divider />

//           <List>
//             {filters.map(filter => (
//               <ListItem button key={filter.id}
//               onClick={(e)=>filter.func(e,filter.value)}
//               >
//                 <ListItemText primary = {filter.label}/>
//               </ListItem>
//             ))}
//           </List>
// </div>
// </Drawer>
//     </nav>
//   )
// }

// export default ClosableDrawer
