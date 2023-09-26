import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const fetchPosts = createAsyncThunk('post', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')

    return response.data
})
export const deletePost = createAsyncThunk('posts/deletePost', async (postId) => {
    return postId;
});
const nextPage = createAsyncThunk('posts/nextPage', async () => {
    return null;
});

const prevPage = createAsyncThunk('posts/prevPage', async () => {
    return null;
});

const gotoPage = createAsyncThunk('posts/gotoPage', async (pageNumber) => {
    return pageNumber;
});


const userSlice = createSlice({
    name: 'posts',
    initialState: {
        data: [],
        loading: 'idle',
        currentPage: 1,
        cardsPerPage: 6,
    },
    reducer: {
        deletePostLocally: (state, action) => {
            state.data = state.data.filter((post) => post.id !== action.payload);

            if (state.currentPage < Math.ceil(state.data.length / state.cardsPerPage)) {
                state.currentPage += 1;
            }
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.loading = "loading"
                state.data = action.payload
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = "fulfilled"
                state.data = action.payload

            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = "reject"
                state.data = action.payload

            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.data = state.data.filter((post) => post.id !== action.payload);
            })
            .addCase(nextPage.fulfilled, (state) => {
                if (state.currentPage < Math.ceil(state.data.length / state.cardsPerPage)) {
                    state.currentPage += 1;
                }
            })
            .addCase(prevPage.fulfilled, (state) => {
                if (state.currentPage > 1) {
                    state.currentPage -= 1;
                }
            })
            .addCase(gotoPage.fulfilled, (state, action) => {
                state.currentPage = action.payload;
            });
    }

})
export default userSlice.reducer;
export const { deletePostLocally, setCurrentPage } = userSlice.actions;
export { fetchPosts, nextPage, prevPage, gotoPage }
