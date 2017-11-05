import api from './api'


function  setPost(post){
  return{
    type : 'SET_POST',
    payload : post,
  };
}

function setComments(comments){
  return{
    type: 'SET_COMMENTS',
    payload: comments,
  }
}

function setUser(user){
  return{
    type: 'SET_USER',
    payload: user,
  }
}

function postNextPage(){
  return async(dispatch, getState) => {
    console.log("funcion async");
    const state = getState();
    const currentPage = state.posts.page;

    const posts = await api.posts.getList(currentPage);

    dispatch(
      setPost(posts),
    );
    return posts;
  }
}

function loadUser(userId){
  return async (dispatch)=>{
    const user = await api.users.getSingle(userId);
    dispatch(
      setUser(user),
    );
    return user;
  }
}



export default {
  postNextPage,
  loadUser,

  setPost,
  setComments,
  setUser,
};
