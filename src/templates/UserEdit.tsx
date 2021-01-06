import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch,useSelector } from "react-redux";
import { TextInput, SelectBox, PrimaryButton } from "../components/UI/index";
import styles from "./module.css/SignUp.module.css";
import { db,storage ,FirebaseTimestamp} from "../firebase/index"
import firebase from "firebase/app"
import { getUsername, getUserAvatar, getUserId, getEmail } from "../reducks/users/userSlice";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import IconButton from "@material-ui/core/IconButton";
import { hideLoadingAction, showLoadingAction } from "../reducks/loadingSlice";


const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: "auto"
  },
}));


const UserEdit: React.FC = () => {
    const dispatch = useDispatch();

const classes = useStyles();
  const currentUsername = useSelector(getUsername);
  const currentEmail = useSelector(getEmail);
  const currentAvatar = useSelector(getUserAvatar);
const uid =useSelector(getUserId)
  const [username, setUsername] = useState(currentUsername),
    [email, setEmail] = useState(currentEmail),
    [avatar, setAvatar] = useState(currentAvatar)

 const inputUsername = useCallback(
    (event) => {
      setUsername(event.target.value);
    },
    [setUsername]
  );

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

    const onChangeImageHandler = (e:  React.ChangeEvent<HTMLInputElement>) => {
    // ![0]はTypeScriptの使用でnull,undefinedではないことを示す。登録された0番目の配列を返す。
        dispatch(showLoadingAction("uploading..."))
 const file: any = e.target.files![0];
        let blob = new Blob([file], { type: "image/jpeg" });

        // Generate random 16 digits strings
        const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N=16;
        const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n)=>S[n%S.length]).join('')

        const uploadRef = storage.ref('avatars').child(fileName);
        const uploadTask = uploadRef.put(blob);

        uploadTask.then(() => {
            // Handle successful uploads on complete
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                const newImage = downloadURL;
              setAvatar(newImage)

                dispatch(hideLoadingAction())
            });
        }).catch(() => {
            dispatch(hideLoadingAction())
        });
    }

  const updateUser = (avatar: string,username: string,email: string) => {
    const timestamp = FirebaseTimestamp.now()
    const userInitialData = {
            email: email,
            updated_at: timestamp,
            username: username,
      avatar: avatar,
            uid: uid
        }

    // user情報を書き換えた後に、過去の情報が全て書き換えられる処理
          db.collection("users").doc(uid).set(userInitialData,{merge: true})
            .then(() => {
              const postUser = db.collection("posts").where("uid", "==", uid);
              postUser.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  const dataId = doc.data().id

                  db.collection("posts").doc(dataId).set({
                    avatar: avatar,
                    username: username
                  }, {
                    merge: true
                  })

                })
              }).then(() => {
                db.collection("users").doc(uid).get().then((doc :any) => {
                  const comId: any  = doc.data().commentId
                  if (comId) {
                    for (let i = 0; i < comId.length; i++) {
                      const commentUser = db.collection("posts").doc(comId[i]).collection("comments")
                      commentUser.where("id", "==", uid).get().then((snapshot) => {
                        snapshot.forEach((doc) => {
                          const allId = doc.data().comId

                          commentUser.doc(allId).set({
                            avatar: avatar,
                            username: username
                          }, {
                            merge: true
                          });

                        })
                      }).then(() => {
                        window.location.href = "/"
                      });
                    }
                  }else {
                           window.location.href = "/"
                  }
                });

              });

//     const commentUser = db.collection("posts").doc(allId).collection("comments")
//               commentUser.get().then((querySnapshot) => {
//                 querySnapshot.forEach((doc) => {
//                   const comId = doc.data().id;
//                   console.log(comId)
//     })
//  })

          })
}

  return (
    <div>
      <section>
        <h2 className="u-text__headline u-text-center">ユーザー情報の登録・編集</h2>
        <div className="c-section-container">
  <Box textAlign="center">

                <IconButton>
              <label>

                <Avatar className={classes.large} src={avatar}/>
                    <input
                      className={styles.login_hiddenIcon}
                      type="file"
              onChange={onChangeImageHandler}
                />

                  </label>
            </IconButton>
             <p>アバターをタップして変更</p>
</Box>

                  <div className="module-spacer--medium" />
 <TextInput
          fullWidth={true}
          label={"お名前"}
          multiline={false}
          required={true}
          onChange={inputUsername}
          rows={1}
          value={username}
          type={"text"}
        />

        <TextInput
          fullWidth={true}
          label={"メールアドレス"}
          multiline={false}
          required={true}
          onChange={inputEmail}
          rows={1}
          value={email}
          type={"email"}
        />

          <div className="module-spacer--medium" />
          <div className="center">
          <PrimaryButton
            label={"ユーザー情報を更新"}
            onClick={() =>
              updateUser(
                    avatar,username,email
            )
             }
            />
            </div>
        </div>
      </section>
    </div>
  )
}

export default UserEdit
