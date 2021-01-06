import React from "react";
import { Route, Switch } from "react-router";

import {FavoriteList,PostList,SignIn,SignUp,Reset,PostDetail,PostEdit,UserMyPage,UserEdit,UserPost} from "./templates/index";

import Auth from "./Auth";


const Router = () => {
  return (

    <Switch>

      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/signin/reset"} component={Reset} />
      <Auth>
            <Route exact path={"/"} component={PostList} />

        <Route exact path={"/post/:id"} component={PostDetail}
        />
        <Route path={"/posts/edit(/:id)?"} component={PostEdit} />
        <Route exact path={"/user/mypage"} component={UserMyPage} />
        <Route exact path={"/user/edit"} component={UserEdit} />
         <Route exact path={"/user/post"} component={UserPost} />
            <Route exact path={"/likes"} component={FavoriteList} />
      </Auth>

      </Switch>

  )
}

export default Router
