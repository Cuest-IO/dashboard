import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../config/store';

export interface ClustersState {
  lists: {
    items: object[],
    columns: { name: string, title: string }[],
    loading: boolean;
  };
}

const initialState: ClustersState = {
  lists: {
    items: [],
    columns: [
      { name: 'id', title: 'Cluster name' },
      { name: 'created_at', title: 'Since' },
      { name: 'last_connected_at', title: 'Last Connect' },
    ],
    loading: true,
  }
};

export const counterSlice = createSlice({
  name: 'clusters',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setListItems: (state, action: PayloadAction<object[]>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.lists.items = action.payload;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setListLoading: (state, action: PayloadAction<boolean>) => {
      state.lists.loading = action.payload;
    },
  },
});

export const { setListItems, setListLoading } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectors = Object.freeze({
  selectListItems: (state: RootState) => state.clusters.lists.items,
  selectListColumns: (state: RootState) => state.clusters.lists.columns,
  selectListLoading: (state: RootState) => state.clusters.lists.loading,
})

export default counterSlice.reducer;
