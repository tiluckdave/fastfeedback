import { auth } from '@/lib/firebase-admin'
import { getuserFeedback } from "@/lib/db-admin";

export default async function handler(req, res) {
    try {
        const { uid } = await auth.verifyIdToken(req.headers.token);
        const { feedback } = await getuserFeedback(uid)

        res.status(200).json({ feedback });
    } catch (error) {
        res.status(500).json({ error });
    }
}
