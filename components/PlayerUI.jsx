"use client";
import React, { useState, useEffect } from "react";

const PlayerUI = ({
  player,
  onIncreaseMoney,
  onDecreaseMoney,
  onDeletePlayer,
  selectedColor,
}) => {
  const [betAmount, setBetAmount] = useState(0);

  const handleIncreaseMoney = () => {
    onIncreaseMoney(player._id);
  };

  const handleDecreaseMoney = () => {
    onDecreaseMoney(player._id);
  };

  const handleDeletePlayer = () => {
    onDeletePlayer(player._id);
  };

  const handleBet = () => {
    const minBet =
      player.money <= 1000 ? player.money : Math.ceil(player.money * 0.11);
    const maxBet = Math.ceil(player.money * 0.19);
    const betAmount =
      Math.floor(Math.random() * (maxBet - minBet + 1)) + minBet;
    setBetAmount(betAmount);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleBet();
    }, 180000); //3min

    return () => {
      clearInterval(timer);
    };
  }, []);

  const calculateResult = () => {
    if (betAmount === 0) {
      console.log("No se ha realizado ninguna apuesta.");
      return;
    }

    const randomNumber = Math.random() * 100;
    let result = `Perdido, color ${selectedColor}`;

    if (selectedColor === "verde" && randomNumber <= 1) {
      result = "Ganado (Verde)";
      player.money += betAmount * 10;
    } else if (
      (selectedColor === "rojo" || selectedColor === "negro") &&
      randomNumber <= 49.5
    ) {
      result = "Ganado (Rojo/Negro)";
      player.money += betAmount * 2;
    }

    setBetAmount(0);
    onDecreaseMoney(player._id, betAmount);

    console.log(`${player.name}: ${result}`);
  };
  return (
    <div className="player-ui">
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold">{player.name}</h2>
        <p className="text-gray-600">Dinero: ${player.money}</p>
        <div className="flex space-x-4 p-2">
          <button
            className="bg-blue-200 rounded-lg text-gray-700 font-semibold p-3 items-center space-x-2 whitespace-nowrap hover:bg-pink-500 hover:text-white transition-all"
            onClick={handleIncreaseMoney}
          >
            Aumentar Dinero
          </button>
          <button
            className="bg-blue-200 rounded-lg text-gray-700 font-semibold p-3 items-center space-x-2 whitespace-nowrap hover:bg-pink-500 hover:text-white transition-all"
            onClick={handleDecreaseMoney}
          >
            Disminuir Dinero
          </button>
          <button
            className="bg-blue-200 rounded-lg text-gray-700 font-semibold p-3 items-center space-x-2 whitespace-nowrap hover:bg-pink-500 hover:text-white transition-all"
            onClick={handleDeletePlayer}
          >
            Eliminar Jugador
          </button>
          <button
            className="bg-blue-200 rounded-lg text-gray-700 font-semibold p-3 items-center space-x-2 whitespace-nowrap hover:bg-pink-500 hover:text-white transition-all"
            onClick={handleBet}
          >
            Realizar Apuesta
          </button>
        </div>
        <p className="text-gray-600">Apuesta Actual: ${betAmount}</p>
        <div className="flex justify-center">
          <button
            className="bg-purple-300 rounded-lg text-gray-700 font-semibold p-3 items-center space-x-2 whitespace-nowrap hover:bg-pink-500 hover:text-white transition-all"
            onClick={calculateResult}
          >
            Calcular Resultado
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerUI;
