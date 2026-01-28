import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function ShortCodePage({
  params,
}: {
  params: Promise<{ shortcode: string }>;
}) {
  const { shortcode } = await params;

  if (!shortcode) {
    notFound();
  }

  const record = await prisma.shortUrl.findUnique({
    where: { shortCode: shortcode },
  });

  if (!record) {
    notFound();
  }

  await prisma.shortUrl.update({
    where: { id: record.id },
    data: { clicks: { increment: 1 } },
  });

  redirect(record.originalUrl);
}
