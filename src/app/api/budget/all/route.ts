import { getAllBudgets } from "@/services/firestore"
import { Budget } from "@/types/budget"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (userId){
        const myBudgets: Budget[] = await getAllBudgets(userId);
        return Response.json(myBudgets, { status: 200 })
    }
    return Response.json({error: "Missing Id param"}, { status: 400 })
}