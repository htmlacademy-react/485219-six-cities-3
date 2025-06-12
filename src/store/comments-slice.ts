import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Review} from '../types/comment';
import {fetchComments, postComment} from './api-actions.ts';

type CommentsState = {
  comments: Review[];
  isSending: boolean;
  error: string | null;
};

const initialState: CommentsState = {
  comments: [],
  isSending: false,
  error: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Review[]>) => { // Заменили Comment на reviews
      state.comments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postComment.pending, (state) => {
        state.isSending = true;
        state.error = null;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.comments = [action.payload, ...state.comments];
        state.isSending = false;
      })
      .addCase(postComment.rejected, (state, action) => {
        state.isSending = false;
        state.error = action.error.message || 'Failed to post comment';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.comments = [];
      });
  },
});

export const { setComments } = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;
