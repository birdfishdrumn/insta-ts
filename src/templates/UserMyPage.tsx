import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {PrimaryButton, TextDetail} from "../components/UI";
import {getUserAvatar, getUsername,getEmail} from "../reducks/users/userSlice";
import {useHistory} from "react-router-dom"
import { makeStyles} from "@material-ui/core/styles"
import { Avatar } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: "auto"
  },
}));

interface PROPS{
 props: any
}

const UserMyPage: React.FC<PROPS> = (props) => {
    const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
    const username = useSelector(getUsername);
const email = useSelector(getEmail)
     const avatar = useSelector(getUserAvatar)
    const transition = useCallback((path) => {
       history.push(path)
    }, []);
  console.log(avatar)
    return (
        <section className="c-section-container">
            <h2 className="u-text__headline u-text-center">マイページ</h2>
            <Avatar className={classes.large} src={avatar} />
            <div className="module-spacer--medium" />
            <TextDetail label="ユーザー名" value={username} />
        <div className="module-spacer--small" />
         <TextDetail label="メールアドレス" value={email} />
            <div className="center">
 <PrimaryButton label={"プロフィールを編集する"} onClick={() => transition('/user/edit')}/>
                <PrimaryButton label={"投稿した作品"} onClick={() => transition('/user/post')}/>
            </div>
        </section>
    );
};

export default UserMyPage;
