/** @type {import('./$types').PageLoad} */

import { db, auth } from '$lib'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

export async function load() {
    try {
        const user = await getAuthUser();

        if (user) {
            const enrolled = await getEnrolledClasses(user.uid);
            const meetings = await getMeetings(user.uid)

            return {
                user: user,
                enrolled: enrolled,
                meetings: meetings
            };
        } else {
            return {
                user: null,
                enrolled: [],
                meetings: [],
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

async function getMeetings(userUid) {
    try {
        const classesRef = collection(db, 'enrolled');
        const classesQuery = query(classesRef, where('userUid', '==', userUid));
        const classesSnap = await getDocs(classesQuery);

        const meetingsRef = collection(db, 'meetings');

        const meetingsPromises = classesSnap.docs.map(async (classDoc) => {
            console.log('classUid:', classUid);

            const meetingsQuery = query(meetingsRef, where('classUid', '==', classUid));
            const meetingsSnap = await getDocs(meetingsQuery);
            const meetingsData = meetingsSnap.docs.map(meetingDoc => meetingDoc.data());

            console.log('meetingsData:', meetingsData);

            return meetingsData;
        });

        const meetingsDataArrays = await Promise.all(meetingsPromises);
        const meetings = meetingsDataArrays.flat();

        return meetings;
    } catch (error) {
        console.error('Error loading meetings:', error);
        throw error;
    }
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
                    classUid: classDocSnap.id,
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
