const initialState = {
  items: [
    // { id: 1, name: "PS4", price: 123, count: 1 }
  ],
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case 'ADD_TO_BASKET':
      const targetIndex = state.items.findIndex(item => item.id === action.payload.id);

      if (targetIndex >= 0 && state.items.length > 0) {
        return {
          ...state,
          items: state.items.map((item, index) => {
            if (index === targetIndex) {
              return { ...item, count: item.count + 1 };
            } 
              return {
                ...item,
                count: item.count,
              };
            
          }),
        };
      } 
        return {
          ...state,
          items: [
            ...state.items,
            {
              id: action.payload.id,
              name: action.payload.name,
              price: action.payload.price,
              count: 1,
            },
          ],
        };
      

    case 'REMOVE_FROM_BASKET':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };

    case 'CHANGE_AMOUNT':
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.payload.id) {
            const newCount = (item.count += action.payload.value);

            return {
              ...item,
              count: newCount < 1 ? 1 : newCount,
            };
          } 
            return item;
          
        }),
      };

    default:
      return state;
  }
};
