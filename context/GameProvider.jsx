import { FC, useReducer } from "react";
import { GameContext, gameReducer } from ".";

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer);

  return (
    <GameContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
