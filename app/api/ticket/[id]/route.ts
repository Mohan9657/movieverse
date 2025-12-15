import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: "Missing ticket ID" }, { status: 400 });
    }

    const booking = await prisma.booking.findUnique({ where: { id } });

    if (!booking) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    // ----------------------------
    // CREATE PDF
    // ----------------------------
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let y = 780;

    // Title
    page.drawText("MovieVerse Ticket", {
      x: 180,
      y,
      size: 24,
      font,
      color: rgb(0, 0, 0),
    });

    y -= 50;

    page.drawText(`Movie: ${booking.movieName}`, { x: 50, y, size: 16, font });
    y -= 25;

    page.drawText(`Theater: ${booking.theater}`, { x: 50, y, size: 16, font });
    y -= 25;

    page.drawText(`Seats: ${booking.seats}`, { x: 50, y, size: 16, font });
    y -= 25;

    page.drawText(`Date: ${booking.date}`, { x: 50, y, size: 16, font });
    y -= 25;

    page.drawText(`Time: ${booking.time}`, { x: 50, y, size: 16, font });
    y -= 50;

    // ----------------------------
    // GENERATE QR CODE
    // ----------------------------
    const qrData = `TICKET:${booking.id}|MOVIE:${booking.movieName}|SEATS:${booking.seats}`;

    const qrBase64 = await QRCode.toDataURL(qrData); // generates PNG base64
    const qrImageBytes = Buffer.from(qrBase64.split(",")[1], "base64");

    const qrImage = await pdfDoc.embedPng(qrImageBytes);

    page.drawImage(qrImage, {
      x: 200,
      y: 300,
      width: 200,
      height: 200,
    });

    // SAVE PDF
    const pdfBytes = await pdfDoc.save();
    const buffer = Buffer.from(pdfBytes);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=ticket-${id}.pdf`,
      },
    });
  } catch (error) {
    console.error("PDF ERROR:", error);
    return NextResponse.json({ error: "Failed to generate ticket" }, { status: 500 });
  }
}
