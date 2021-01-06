import React, {  useEffect } from "react";

// import { listenAuthState } from "./features/userSlice";
import { getIsSignedIn ,login} from "./reducks/users/userSlice";
import { useDispatch , useSelector } from "react-redux";
import { listenAuthState } from "./reducks/users/operations";
import { auth, db } from "./firebase/index"
import {useHistory} from "react-router-dom"

interface AppProps {
  children?: any
}
const Auth: React.FC<AppProps> = ({ children } ) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isSignedIn = useSelector(getIsSignedIn);
  // signinしていなければ、


  useEffect(() => {
   if (!isSignedIn) {
      // もしサインインしてなければ、listenAuthStateを呼び出し、ログイン画面に遷移させる。
      dispatch(listenAuthState());
    }
  }, []);
  // もしサインインしてなければ空のjsxを返し、してるのなら子要素を返す

  if (!isSignedIn) {
    return <></>;
  } else {
    // サインインしてれば子要素を返す・
    return  children  ;
    // 子要素はauthコンポーネントに入ってくるコンポーネント。
    // ここではホームコンポーネント
  }
};

export default Auth;
