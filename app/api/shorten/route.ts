export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { success: false, error: "URL is required" },
        { status: 400 }
      );
    }

    const shortCode = nanoid(6);

    const record = await prisma.shortUrl.create({
      data: {
        originalUrl: url,
        shortCode,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        id: record.id,
        originalUrl: record.originalUrl,
        shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${record.shortCode}`,
        shortCode: record.shortCode,
        clicks: record.clicks,
        createdAt: record.createdAt,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to shorten URL" },
      { status: 500 }
    );
  }
}
