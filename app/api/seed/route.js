import { db, seedData } from "@/database";
import Player from "@/models/Player";
import { NextResponse } from "next/server";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return new Response("No tiene acceso al servicio");
  }
  await db.connect();

  await Player.deleteMany();
  await Player.insertMany(seedData);

  await db.disconnect();

  return NextResponse.json({ message: "Proceso realizado Correctamente" });
}
