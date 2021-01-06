import React, { useState, useCallback, useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch,useSelector } from "react-redux";
import { TextInput, SelectBox, PrimaryButton } from "../components/UI/index";
import { db } from "../firebase/index"
import {savePost} from "../reducks/posts/operations"
import { ImageArea,TagArea } from "../components/PostProduct";
import { getUsername, getUserAvatar, getUserId } from "../reducks/users/userSlice";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Switch from "@material-ui/core/Switch";
import HelpIcon from '@material-ui/icons/Help';
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
helpIcon:{
    position: "absolute",
    top:10,
  right:5
}

})
)

const PostEdit = () => {
    const dispatch = useDispatch();
   const classes = useStyles()
let id = window.location.pathname.split("/posts/edit")[1];

  if (id) {
    id = id.split("/")[1];
  }



 const username = useSelector(getUsername);

  const avatar = useSelector(getUserAvatar);
const uid =useSelector(getUserId)
  const [name, setName] = useState<string>(""),
    [description, setDescription] = useState<string>(""),
    [category, setCategory] = useState<string>(""),
    [postUid,setPostUid] = useState<string>(""),
    [tags, setTags] = useState<string[]>([]),
    // [tagMenu,setTagMenu] = useState([]),
    [open,setOpen]=useState<boolean>(false),
    [categories, setCategories] = useState([]),
    [images, setImages] = useState<string[]>([]),
    [allImages, setAllImages] = useState<string[]>([]),
    [check, setCheck] = useState<boolean>(false);


  const toggleChecked = () => {
    setCheck((prev) => !prev);
  };

 const inputName = useCallback(
    (event:React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    [setName]
  );

  const inputDescription = useCallback(
    (event:React.ChangeEvent<HTMLInputElement>) => {
      setDescription(event.target.value);
    },
    [setDescription]
  );


  useEffect(() => {
    if (id !== "") {
            db.collection("posts")
        .doc(id)
        .get()
        .then((snapshot) => {
          const data: any = snapshot.data();
          const tags=data.tags
          setImages(data.images);
          setAllImages(data.allImages);
          setName(data.name);
          setDescription(data.description);
          setCategory(data.category);
          setTags(data.tags)

        }
        )


    }
  }, []);

  // カテゴリー一覧
useEffect(() => {
  const unSub = db.collection("categories").orderBy("order", "desc").onSnapshot((snapshot: any) => {
    setCategories(
       snapshot.docs.map((doc :any)=>({
         id: doc.data().id,
         name: doc.data().name
       }))
    )
    return () => {
      unSub()
    }
  })
}, [])

  // const arrayTagName = tagsName.map((t) => t.tagName)
  // console.log(arrayTagName)
  console.log(tags)


// useEffect(() => {
//
// }, [tags])

  useEffect(() => {
    if (id) {
      db.collection("posts").doc(id).get().then((snapshot) => {
        const data: any = snapshot.data()
        setPostUid(data.uid)
      })
    }
  },[])

  if ( postUid === uid || !id ) {
    return (
    <div>
      <section>

          <div className="c-section-container">
            <h2 className="u-text__headline u-text-center">作品の登録・編集</h2>
            <div className={classes.helpIcon}>
              <IconButton onClick={()=>setOpen(!open)}>
                   <HelpIcon />
            </IconButton>
</div>
{/* <HelpModal title="お気に入りに登録しました" open={open} setOpen={setOpen} /> */}
 <TextInput
          fullWidth={true}
          label={"作品タイトル"}
          multiline={false}
          required={true}
          onChange={inputName}
          rows={1}
          value={name}
              type={"text"}
              variant="outlined"
        />

        <TextInput
          fullWidth={true}
          label={"作品に込めた思い"}
          multiline={true}
          required={true}
          onChange={inputDescription}
          rows={5}
          value={description}
              type={"text"}
               variant="outlined"
          />

        <SelectBox
          label={"カテゴリー"}
          required={true}
          options={categories}
          select={setCategory}
              value={category}

          />

          <div className="module-spacer--medium" />

            <TagArea tags={tags} setTags={setTags}/>

                   <div className="module-spacer--medium" />
          <div className="center">

              <ImageArea images={images} setImages={setImages} />
              <div className="module-spacer--small" />
              <h1>風鈴から短冊までの写真</h1>
                <div className="module-spacer--medium" />
 <ImageArea images={allImages} setImages={setAllImages}  all="true" />
              <div className="module-spacer--small" />

               <FormControl component="fieldset">

      <FormGroup>
      <FormControlLabel
        control={<Switch checked={check} onChange={toggleChecked} />}
        label="コメントを非表示にする"
      />
      </FormGroup>
              </FormControl>

            <PrimaryButton
              disabled={name === "" || description==="" || category === "" || images.length === 0 }
            label={"作品を投稿！"}
            onClick={() =>
              dispatch(
                savePost(
                  id,
                  name,
                  description,
                  category,
                  images,
                  allImages,
                  username,
                  avatar,
                  uid,
                  tags,
                  check
                )
              )
            }
            />
            </div>
        </div>
      </section>
    </div>
  )
  } else {
    return (
      <h1>お探しのページは見つかりません。</h1>
    )
  }

}

export default PostEdit


// import React, { useState, useCallback, useEffect } from 'react'
// import { useDispatch } from "react-redux";
// import { TextInput, SelectBox, PrimaryButton } from "../components/UI/index";
// import {savePost} from "../reducks/postSlice"
// import { db } from "../firebase/index"
// import {ImageArea} from "../components/PostProduct";
// const PostEdit: React.FC = () => {

// let id = window.location.pathname.split("/posts/edit")[1];

//   if (id !== "") {
//     id = id.split("/")[1];
//   }

//  const dispatch = useDispatch();

//   const [name, setName] = useState(""),
//     [description, setDescription] = useState(""),
//     [category, setCategory] = useState(""),
//     // [categories, setCategories] = useState([]),
//     [images, setImages] = useState([]);

//  const inputName = useCallback(
//     (event) => {
//       setName(event.target.value);
//     },
//     [setName]
//   );

//   const inputDescription = useCallback(
//     (event) => {
//       setDescription(event.target.value);
//     },
//     [setDescription]
//   );


//    const categories = [
//     { id: "cute", name: "可愛い系" },
//     { id: "summer", name: "夏らしい" },
//     { id: "fuji", name: "富士山" },
//    ];

//   useEffect(() => {
//     if (id !== "") {
//       db.collection("posts").doc(id).get()
//         .then(snapshot => {
//           const data: any = snapshot.data()
//           setName(data.name);
//           setImages(data.images);
//           setCategory(data.category)
//           setDescription(data.description)
//       })
//       }
//   }, []);

//   return (
//     <div>
//       <section>
//         <h2 className="u-text__headline u-text-center">作品の登録・編集</h2>
//         <div className="c-section-container">
//  <TextInput
//           fullWidth={true}
//           label={"作品タイトル"}
//           multiline={false}
//           required={true}
//           onChange={inputName}
//           rows={1}
//           value={name}
//           type={"text"}
//         />

//         <TextInput
//           fullWidth={true}
//           label={"作品に込めた思い"}
//           multiline={true}
//           required={true}
//           onChange={inputDescription}
//           rows={5}
//           value={description}
//           type={"text"}
//         />
//         <SelectBox
//           label={"カテゴリー"}
//           required={true}
//           options={categories}
//           select={setCategory}
//           value={category}
//           />
//           <div className="module-spacer--medium" />
//           <div className="center">
//              <ImageArea images={images} setImages={setImages} />
//           <PrimaryButton
//             label={"商品を登録"}
//             onClick={() =>
//               dispatch(
//                 savePost(
//                   id,
//                   name,
//                   description,
//                   category,
//                   images,
//                 )
//               )
//             }
//             />
//             </div>
//         </div>
//       </section>
//     </div>
//   )
// }

// export default PostEdit
