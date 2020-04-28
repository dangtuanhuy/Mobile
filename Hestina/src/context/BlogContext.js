/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import createDataContext from './createDataContext';
import JsonServer from '../api/JsonServer';
const blogReducer = (state, action) => {
    switch (action.type) {
        case 'get_blogposts':
            return action.payload;
        case 'add_blogpost':
            return [...state, {
                id: Math.floor(Math.random() * 99999), title: action.payload.title, content: action.payload.content,
            },
            ];
        case 'edit_blogpost':
            return state.map((blogPost) => {
                return blogPost.id === action.payload.id ? action.payload : blogPost;
            });
        case 'delele_blogpost':
            return state.filter((blogPost) => blogPost.id !== action.payload);
        default:
            return state;
    }
};

const getBlogPosts = dispatch => {
    return async () => {
        const response = await JsonServer.get('/blogposts');
        // response. data === [{},{},{}]
        dispatch({ type: 'get_blogposts', payload: response.data });
    };
};

const addBlogPost = (dispatch) => {
    return async (title, content, callback) => {
        dispatch({ type: 'add_blogpost', payload: { title: title, content: content } });
        if (callback) {
            callback();
        }
    };
};
const deleteBlogPost = dispatch => {
    return (id) => {
        dispatch({ type: 'delele_blogpost', payload: id });
    };
};
const editBlogPost = dispatch => {
    return (id, title, content, callback) => {
        dispatch({ type: 'edit_blogpost', payload: { id: id, title: title, content: content } });
        if (callback) {
            callback();
        }
    };
};
export const { Context, Provider } = createDataContext(blogReducer, { getBlogPosts, addBlogPost, deleteBlogPost, editBlogPost });
