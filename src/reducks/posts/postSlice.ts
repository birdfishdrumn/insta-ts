import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../store';
import { useHistory } from "react-router-dom";

import {db } from "../../firebase/index"
import firebase from "firebase/app"

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    post:{
      list: [],
        userList:[]
    }
  },
  reducers: {
    //  actionsに相当する箇所　actionとpayloadが統合している。
    fetchPostsAction: (state, action: PayloadAction<string[]>) => {
      state.post.list = [...action.payload];

    },
    //  actionsに相当する箇所　actionとpayloadが統合している。
    fetchUserPostsAction: (state, action: PayloadAction<string[]>) => {
      state.post.userList = action.payload;


    },
      deletePostAction: (state, action: PayloadAction<string[]>) => {
      state.post.userList = action.payload;

    },
  }
});

export const { fetchPostsAction,fetchUserPostsAction,deletePostAction} = postSlice.actions;
// postの中にpostというオブジェクトが入っている。stateはinitialState,postはname:"post"に該当する。

export const selectPost = (state: RootState )=> state.post;

export const getPosts = (state: RootState )=> state.post.post.list;
export const getUserPosts = (state: RootState) => state.post.post.userList;
// export const getpostname = createSelector(
//   [selectpost],
//   state => state.postname
// )

export default postSlice.reducer
