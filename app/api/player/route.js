import { db } from "@/database";
import Player from "@/models/Player";
import { NextResponse } from "next/server";

export async function GET() {
  await db.connect();
  const players = await Player.find().sort({ createAt: "ascending" });
  await db.disconnect();

  return NextResponse.json(players);
}
export async function POST(request) {
  const { description = "" } = request.body;

  const newPlayer = new Player({
    description,
    createAt: Date.now(),
  });
  try {
    await db.connect();
    await newPlayer.save();
    await db.disconnect();

    return NextResponse.json(newPlayer);
  } catch (error) {
    await db.disconnect();
    console.log(error);

    return NextResponse.json({
      message: "Algo salio mal, revisar consola del servidor",
    });
  }
}
