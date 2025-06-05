import { getAllBudgets } from "@/services/firestore";
import { Budget } from "@/types/budget";
import { NextRequest } from "next/server"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (userId){
        const budget: Budget[] = await getAllBudgets(userId);
        return Response.json(budget, { status: 200 });
    }
    return Response.json({ error: "Missing userId" }, { status: 400 });
}