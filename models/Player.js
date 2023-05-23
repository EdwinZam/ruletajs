import mongoose, { Schema, model } from "mongoose";

const playerSchema = new Schema({
  name: { type: String, require: true },
  money: { type: String, require: true },
  selectedColor: {
    type: String,
    enum: {
      values: ["verde", "rojo", "negro"],
      message: "{VALUE} no es un color valido",
      default: "client",
      require: true,
    },
  },
});

const Player = mongoose.models.Player || mongoose.model("Player", playerSchema);

export default Player;
