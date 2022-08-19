import { compareDesc, parseISO } from 'date-fns';

import firestore from "@/lib/firebase-admin";

export async function getAllFeedback(siteId) {
    try {
        const snapshot = await firestore.collection("feedback").where("siteId", "==", siteId).get();
        const feedback = []

        snapshot.forEach(doc => {
            feedback.push({ id: doc.id, ...doc.data() })
        })

        feedback.sort((a, b) =>
            compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
        );

        return { feedback }
    } catch (error) {
        return { error }
    }
}

export async function getAllSites() {
    try {
        const snapshot = await firestore.collection("sites").get();
        const sites = []
        snapshot.forEach(doc => {
            sites.push({ id: doc.id, ...doc.data() })
        })

        return { sites }
    } catch (error) {
        return { error }
    }
}