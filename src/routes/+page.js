/** @type {import('./$types').PageLoad} */

import { db, auth } from '$lib'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

export async function load() {
    try {
        const user = await getAuthUser();

        if (user) {
            const enrolled = await getEnrolledClasses(user.uid);

            return {
                value: "halo",
                user: user,
                enrolled: enrolled
            };
        } else {
            return {
                value: "halo",
                user: null,
                enrolled: []
            };
        }
    } catch (error) {
        console.error('Error loading page:', error);
        throw error;
    }
}

function getAuthUser() {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => resolve(user ? user : null));
    });
}

async function getEnrolledClasses(userUid) {
    try {
        const enrolledRef = collection(db, 'enrolled');
        const enrolledQuery = query(enrolledRef, where('userUid', '==', userUid));
        const querySnapshotEnrolled = await getDocs(enrolledQuery);

        const classesPromises = querySnapshotEnrolled.docs.map(async (enrolledDoc) => {
            const classDocRef = doc(db, 'classes', enrolledDoc.data().classUid);
            const classDocSnap = await getDoc(classDocRef);

            if (classDocSnap.exists()) {
                const teacherDocRef = doc(db, 'teachers', classDocSnap.data().teacher);
                const teacherDocSnap = await getDoc(teacherDocRef);

                return {
                    uid: enrolledDoc.id,
                    title: classDocSnap.data().title,
                    active: classDocSnap.data().active,
                    price: classDocSnap.data().price,
                    createdAt: classDocSnap.data().createdAt,
                    teacher: {
                        name: teacherDocSnap.data().displayName,
                        photoURL: teacherDocSnap.data().photoURL,
                    },
                };
            }

            return null;
        });

        const enrolledClassesData = await Promise.all(classesPromises);
        const filteredEnrolledClasses = enrolledClassesData.filter((item) => item !== null);

        return filteredEnrolledClasses;
    } catch (error) {
        console.error('Error loading enrolled classes:', error);
        throw error;
    }
}
