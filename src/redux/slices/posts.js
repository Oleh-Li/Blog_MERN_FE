import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await axios.get('/posts')
    return data
})

export const fetchSortedPosts = createAsyncThunk('posts/fetchSortedPosts', async (sortType) => {
    try {
        const { data } = await axios.get(`/posts?sort=${sortType}`);
        return data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const { data } = await axios.get('/tags')
    return data
})

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
    const { data } = await axios.delete(`/posts/${id}`)
    return data
})

const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    }
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },

        //sorted posts
        [fetchSortedPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchSortedPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchSortedPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },



        [fetchTags.pending]: (state) => {
            state.tags.items = [];
            state.tags.status = 'loading';
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = 'loaded';
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = [];
            state.tags.status = 'error';
        },

        [fetchRemovePost.pending]: (state, action) => {
            console.log({ state, action })
            state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg)
        },
    }
})

export const postsReducer = postsSlice.reducer