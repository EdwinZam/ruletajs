export const gameReducer = (state, action) => {
  switch (action.type) {
    case "AddMoney":
      return {
        ...state,
      };

    default:
      return state;
  }
};
