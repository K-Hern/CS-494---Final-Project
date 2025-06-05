import { upsertMortgage, getMortgage, deleteMortgage } from "@/services/firestore"
import { Mortgage } from "@/types/mortgage";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (userId){
        const mortgage: Mortgage | null = await getMortgage(userId ?? "");
        return Response.json(mortgage, { status: 200 });
    }
    return Response.json({ error: "Missing userId" }, { status: 400 });
}

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (userId){
        await deleteMortgage(userId);
        return Response.json({success: "Delete Successful"}, { status: 200 });
    }
    return Response.json({ error: "Missing userId" }, { status: 400 });
}

export async function POST(req: Request){
    const body = await req.json();
    if (body) {
        upsertMortgage(body as Mortgage);
        return Response.json({success: "Mortgage Insert Success"}, { status: 201 });
    }
    return Response.json({error: "Mortgage Insert Failure"}, { status: 400 }) 
}