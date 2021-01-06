import React, { useCallback, useState } from "react";
import { TextInput, PrimaryButton } from "../components/UI";
import { auth } from "../firebase/index"
import { useDispatch } from "react-redux";
import {useHistory} from "react-router-dom"

const Reset: React.FC= () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
 const history = useHistory()
  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  const resetPassword= (email: string) => {
  return async () => {
    if (email === "") {
   alert('メールアドレスの形式が不正です。')
            return false
    } else {
      auth.sendPasswordResetEmail(email)
        .then(() => {
          alert("入力されたアドレスにパスワードリセット用のメールを送りました。")
          history.push('/signin')
        }).catch(() => {
          alert("パスワードリセットに失敗しました。")
        })
    }
  }
}
  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">パスワードをリセット</h2>
      <div className="module-spacer--medium"></div>

      <TextInput
        fullWidth={true}
        label={"Email"}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={"email"}
        onChange={inputEmail}
      />

      <div className="center">
        <PrimaryButton
          label={"パスワードをリセット"}
          onClick={() => dispatch(resetPassword(email))}
        />
        <div className="module-spacer--medium" />
        <p className="pointer" onClick={() => history.push("/signin")}>
          ログイン画面に戻る
        </p>
      </div>
    </div>
  );
};

export default Reset;
