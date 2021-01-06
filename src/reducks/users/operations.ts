import { AppThunk, RootState } from '../../store';
import { useDispatch } from "react-redux";
// import { history } from "../store";
import { db, auth, FirebaseTimestamp } from "../../firebase/index";
import { hideLoadingAction, showLoadingAction } from "../loadingSlice";
import {login,logout,fetchPostsInFavoriteAction,getUserId} from "./userSlice"
import { push } from "react-router-redux";
import { POST } from "../../types/posts"
import {useSelector} from "react-redux"
import { addLike } from "../../types/likes"

export const signIn = (email: string, password: string): AppThunk => {

  return async (dispatch) => {

          dispatch(showLoadingAction("サインインしています..."));
    if (email === "" || password === "") {
        dispatch(hideLoadingAction());
      alert("必須項目が未入力です。")
      return false
    }
   return auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        const userState = result.user
        if (!userState) {
              dispatch(hideLoadingAction());
        throw new Error('ユーザーIDを取得できません');
      }
        const uid = userState.uid

   return db.collection("users").doc(uid).get().then(snapshot => {
        const data = snapshot.data();
        if (!data) {
            dispatch(hideLoadingAction());
          throw new Error('ユーザーデータが存在しません');
        }


              dispatch(login({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username
              }))
  //
   }).then(() => {
     dispatch(push("/"))

               dispatch(hideLoadingAction());
            })

      }).catch(() => {
                dispatch(hideLoadingAction());
            });
  }
}


export const signUp = (username: string, email: string, password: string, confirmPassword: string): AppThunk  => {
  return async (dispatch) => {
        dispatch(showLoadingAction("アカウントを登録しています..."));
    if (username === "" || email === "" || password === "" || confirmPassword === "") {
      alert("必須項目が未入力です。")
      return false
    }
    if (password !== confirmPassword) {
      alert("パスワードが一致しません。もう一度お試しください。")
      return false
    }
    return auth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user

        if (user) {
          const uid = user.uid
          const timestamp = FirebaseTimestamp.now()

          const userInitialData= {
            created_at: timestamp,
            email: email,
            role: "customer",
            uid: uid,
            updated_at: timestamp,
            username: username
          }

          db.collection("users").doc(uid).set(userInitialData)
            .then(() => {
                dispatch(hideLoadingAction());
          })
         }
    })
  }
}
export const signOut = ():AppThunk => {
  return async (dispatch) => {
     dispatch(showLoadingAction("Sign out..."))
    auth.signOut()
      .then(() => {
        dispatch(logout())
          dispatch(hideLoadingAction());

    })
  }
}

export const listenAuthState = ():AppThunk => {
  return async (dispatch) => {
    return auth.onAuthStateChanged(user => {
      if (user) {
 const uid = user.uid

          db.collection("users").doc(uid).get()
            .then(snapshot => {
              const data:any= snapshot.data()
             console.log(data)
              dispatch(login({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                email: data.email,
                username: data.username,
                avatar: data.avatar
              }))

            })

      } else {
        dispatch(push("/signin"))
      }
    })

  }
}

export const addPostToFavorite = (addedPost: any,uid:string):AppThunk => {
  return async (getState:any) => {
    // カートに入れるユーザーが誰かを取得する。
    // const uid = getState().users.uid;
    console.log(uid)
  //  const uid = useSelector(getUserId)
    const favoriteRef = db.collection("users").doc(uid).collection("likes").doc();
    // // likesIdにはドキュメントと同じidが入る。
    addedPost["likesId"] = favoriteRef.id;
    addedPost["uid"] = uid;
    // await favoriteRef.set(addedPost)
     await favoriteRef.set(addedPost)
    // dispatch(push('/likes'))
  }
};

// export const fetchPush = () => {
//   return async (dispatch,getState) => {
// const uid = getState().users.uid
//        const userRef = db.collection("users").doc(uid)
//     userRef.collection("message").orderBy("createdAt","desc").get().then((snapshots) => {
//       const newDate = new Date()
//       const newHour = newDate.getDate()
//       const list = []
//       snapshots.forEach((snapshot) => {
//         const data = snapshot.data()
//         const date = data.createdAt.toDate().getDate()

//         const numDate = Number(date)
//         const checkDate = newHour - numDate
//         console.log(checkDate)
//         list.push(data)
//         userRef.collection("message").where("timeLimit", "<=",checkDate).get().then((querySnapshot) => {
//           querySnapshot.forEach((doc) => {
//             const id = doc.data().id
//             return userRef.collection("message").doc(id).delete()
//           })
//           // setPush(data)
//           // setMsgDate(date)
//           //   console.log(date)
//           // console.log(uid)
//         })

//       }

//       )
//        dispatch(pushMessageAction(list))
//     })
//   }
//  }

export const fetchPostsInFavorite = (posts: string[]):AppThunk => {
  return async (dispatch) => {
    dispatch(fetchPostsInFavoriteAction(posts))
  }
}
