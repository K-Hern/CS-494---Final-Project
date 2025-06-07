import { getUserInfo, updateUserInfo } from "@/services/firestore"
import { UserInfo } from "@/types/userInfo"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (userId){
        const user: UserInfo = await getUserInfo(userId);
        return Response.json(user, { status: 200 })
    }
    return Response.json({error: "Missing Id param"}, { status: 400 })
}

export async function POST(req: Request) {
  const userInfo: UserInfo = await req.json();
  await updateUserInfo(userInfo);
  return Response.json({ status: 200 })
}