import { upsertBudget, getBudgetById } from "@/services/firestore"
import { Budget } from "@/types/budget"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id == null){
        return Response.json({error: "Missing Id param"}, { status: 400 })
    }

    if (id){
        const budget: Budget | null = await getBudgetById(id);
        return Response.json(budget, { status: 200 });
    }
    
}

export async function POST(req: Request){
    const body = await req.json();
    if (body) {
        upsertBudget(body as Budget);
    }
    return Response.json({"Insertion": "Success"}, { status: 201 }) 
}