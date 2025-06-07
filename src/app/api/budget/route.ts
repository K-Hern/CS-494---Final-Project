import { upsertBudget, getBudgetById, deleteBudget } from "@/services/firestore"
import { Budget } from "@/types/budget"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("budgetId");

    if (id){
        const budget: Budget | null = await getBudgetById(id);
        return Response.json(budget, { status: 200 });
    }
    return Response.json({error: "Missing Id param"}, { status: 400 })
}

export async function POST(req: Request){
    const body = await req.json();
    if (body) {
        upsertBudget(body as Budget);
    }
    return Response.json({"Insertion": "Success"}, { status: 201 }) 
}

export async function DELETE(req: Request){
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("budgetId");

    if (id){
        await deleteBudget(id);
        return Response.json({ status: 204 });
    }
    return Response.json({error: "Missing Id param"}, { status: 400 })
}