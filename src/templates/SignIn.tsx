import React, { useCallback, useState } from "react";
import { TextInput, PrimaryButton } from "../components/UI";
import { signIn } from "../reducks/users/operations";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const SignUp: React.FC = (props: any) => {
  const history = useHistory()
  const dispatch = useDispatch();
  const  [email, setEmail] = useState(""),
    [password, setPassword] = useState("");



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


  const signInAction = () => {

    dispatch(signIn(email, password))
    //  props.history.push("/");
  }
  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">サインイン</h2>
      <div className="module-spacer--medium"></div>

      <TextInput
        fullWidth={true}
        label={"Email"}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={"email"}
        variant="outlined"
        onChange={inputEmail}
      />
      <TextInput
        fullWidth={true}
        label={"パスワード"}
        multiline={false}
        required={true}
        rows={1}
        value={password}
        type={"password"}
        variant="outlined"
        onChange={inputPassword}
      />

      <div className="center">

        <PrimaryButton
          label={"サインイン"}
          onClick={() =>
            signInAction()
          }
        />
        <div className="module-spacer--medium" />
        <p className="pointer" onClick={() => props.history.push("/signup")}>
          アカウントをお持ちの方はこちら
        </p>
         <p className="pointer" onClick={() =>props.history.push("/signin/reset")}>
          パスワードを忘れた方はこちら
        </p>
      </div>
    </div>
  );
};

export default SignUp;
