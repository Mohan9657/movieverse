import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const booking = await prisma.booking.create({
      data: {
        userId: body.userId,
        movieId: body.movieId,
        movieName: body.movieName,
        theater: body.theater,
        date: body.date,
        time: body.time,
        seats: body.seats,
      },
    });

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.log("BOOKING ERROR:", error);
    return NextResponse.json(
      { error: "Booking Failed" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const userId = req.headers.get("user-id");

    if (!userId) {
      return NextResponse.json({ error: "User ID missing" }, { status: 400 });
    }

    const bookings = await prisma.booking.findMany({
      where: { userId },
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.log("FETCH BOOKING ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
