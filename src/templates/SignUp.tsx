import React, { useCallback, useState } from "react";
import { TextInput, PrimaryButton } from "../components/UI";
import { signUp } from "../reducks/users/operations";
import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";


const SignUp: React.FC = (props: any) => {
  // const history = useHistory()
  const dispatch = useDispatch();
  const [username, setUsername] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [confirmPassword, setConfirmPassword] = useState("");

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
  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );
  const inputConfirmPassword = useCallback(
    (event) => {
      setConfirmPassword(event.target.value);
    },
    [setConfirmPassword]
  );

  const signUpAction = async() => {
    dispatch(signUp(username, email, password, confirmPassword))

    props.history.push("/")
  }
  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">アカウント登録</h2>
      <div className="module-spacer--medium"></div>
      <TextInput
        fullWidth={true}
        label={"ユーザー名"}
        multiline={false}
        required={true}
        rows={1}
        value={username}
        type={"text"}
        onChange={inputUsername}
        variant="outlined"
      />
      <TextInput
        fullWidth={true}
        label={"Email"}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={"email"}
        onChange={inputEmail}
        variant="outlined"
      />
      <TextInput
        fullWidth={true}
        label={"パスワード"}
        multiline={false}
        required={true}
        rows={1}
        value={password}
        type={"password"}
        onChange={inputPassword}
        variant="outlined"
      />
      <TextInput
        fullWidth={true}
        label={"パスワード(確認)"}
        multiline={false}
        required={true}
        rows={1}
        value={confirmPassword}
        type={"password"}
        onChange={inputConfirmPassword}
        variant="outlined"
      />
      <div className="center">
        <PrimaryButton
          label={"アカウント登録"}
          onClick={() =>
            signUpAction()
          }
        />
        <div className="module-spacer--medium" />
        <p className="pointer" onClick={() => props.history.push("/signin")}>
          アカウントをお持ちの方はこちら
        </p>
      </div>
    </div>
  );
};

export default SignUp;
