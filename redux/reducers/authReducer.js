// src/redux/reducers/authReducer.js
const initialState = {
    isAuthenticated: false,
    user: null
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_AUTH':
        return {
          ...state,
          isAuthenticated: action.payload.isAuthenticated,
          user: action.payload.user
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  