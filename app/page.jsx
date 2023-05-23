"use client";
import { ruletaApi } from "@/api";
import PlayerUI from "@/components/PlayerUI";
import { useEffect, useState } from "react";

export default function Home() {
  const initialData = [
    { _id: 1, name: "Player 1", money: 15000, selectedColor: "verde" },
    { _id: 2, name: "Player 2", money: 15000, selectedColor: "rojo" },
    { _id: 3, name: "Player 3", money: 15000, selectedColor: "negro" },
    { _id: 4, name: "Player 4", money: 15000, selectedColor: "rojo" },
  ];
  const [players, setPlayers] = useState(initialData);

  const refreshPlayers = async () => {
    const { data } = await ruletaApi.get("/player");
    //setPlayers(data);
    console.log(data);
  };

  useEffect(() => {
    refreshPlayers();
  }, []);

  const addPlayer = (playerData) => {
    const newPlayer = {
      name: playerData.name,
      money: 15000,
      selectedColor: "verde",
    };

    setPlayers([...players, newPlayer]);
  };

  const increaseMoney = (playerId) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        if (player._id === playerId) {
          return {
            ...player,
            money: player.money + 1000,
          };
        }
        return player;
      })
    );
  };

  const decreaseMoney = (playerId, betAmount = 1000) => {
    setPlayers(
      (prevPlayers) =>
        prevPlayers
          .map((player) => {
            if (player._id === playerId) {
              const updatedMoney = player.money - betAmount;
              if (updatedMoney <= 0) {
                return null;
              } else {
                return {
                  ...player,
                  money: updatedMoney,
                };
              }
            }
            return player;
          })
          .filter(Boolean) // Eliminar
    );
  };

  const deletePlayer = (playerId) => {
    setPlayers((prevPlayers) =>
      prevPlayers.filter((player) => player._id !== playerId)
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div>
        <h1 className="bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent text-lg font-bold">
          Ruleta Master
        </h1>
        {players.map((player) => (
          <PlayerUI
            key={player._id}
            player={player}
            onIncreaseMoney={increaseMoney}
            onDecreaseMoney={decreaseMoney}
            onDeletePlayer={deletePlayer}
            selectedColor={player.selectedColor}
          />
        ))}
      </div>
    </main>
  );
}
