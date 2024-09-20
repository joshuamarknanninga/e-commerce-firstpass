// src/redux/reducers/cartReducer.js
const initialState = {
    items: [],
    totalAmount: 0
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        const newItem = action.payload;
        const existingItemIndex = state.items.findIndex(item => item._id === newItem._id);
        let updatedItems;
  
        if (existingItemIndex >= 0) {
          const updatedItem = {
            ...state.items[existingItemIndex],
            quantity: state.items[existingItemIndex].quantity + newItem.quantity
          };
          updatedItems = [...state.items];
          updatedItems[existingItemIndex] = updatedItem;
        } else {
          updatedItems = [...state.items, newItem];
        }
  
        return {
          ...state,
          items: updatedItems,
          totalAmount: state.totalAmount + newItem.price * newItem.quantity
        };
  
      case 'REMOVE_FROM_CART':
        const updatedCartItems = state.items.filter(item => item._id !== action.payload);
        const itemToRemove = state.items.find(item => item._id === action.payload);
  
        return {
          ...state,
          items: updatedCartItems,
          totalAmount: state.totalAmount - itemToRemove.price * itemToRemove.quantity
        };
  
      case 'UPDATE_CART_QUANTITY':
        const { productId, quantity } = action.payload;
        const productIndex = state.items.findIndex(item => item._id === productId);
        const updatedProduct = { ...state.items[productIndex], quantity };
        const items = [...state.items];
        items[productIndex] = updatedProduct;
  
        const newTotalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
        return {
          ...state,
          items,
          totalAmount: newTotalAmount
        };
  
      default:
        return state;
    }
  };
  
  export default cartReducer;
  