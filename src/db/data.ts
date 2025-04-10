import { db } from "@/db";
import { Account, account } from "@/db/schema";
import { Session } from "better-auth";
import { eq } from "drizzle-orm";

export async function getAccount(session: Session): Promise<Account> {
  'use cache';
  
  const data = await db
    .select()
    .from(account)
    .where(eq(account.userId, session?.userId as string));

  return data[0];
}