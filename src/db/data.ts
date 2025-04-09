import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { cache } from "react";
import { db } from ".";
import { account } from "./schema";

export const getAccount = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const data = await db
    .select()
    .from(account)
    .where(eq(account.userId, session?.user.id as string));

  return data[0];
});
