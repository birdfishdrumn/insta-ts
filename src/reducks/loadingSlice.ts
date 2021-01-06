import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';



export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    loading:{
        state: false,
    text: ""
    }
  },
  reducers: {

     showLoadingAction: (state,action) => {
      state.loading.text = action.payload;
      state.loading.state = true;
  // state.loading.text = "loading...";
    },
    hideLoadingAction:state=> {
      state.loading.text = "";
      state.loading.state = false;
  // state.loading.text = "";
    },


  },
});

export const {showLoadingAction,hideLoadingAction} = loadingSlice.actions;
// loadingの中にloadingというオブジェクトが入っている。stateはinitialState,loadingはname:"loading"に該当する。
export const getLoadingState = (state: RootState )=> state.loading.loading.state;

export const getLoadingText = (state: RootState )=> state.loading.loading.text;

// export const getloadingname = createSelector(
//   [selectloading],
//   state => state.loadingname
// )

export default loadingSlice.reducer
