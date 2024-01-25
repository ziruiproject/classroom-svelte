// enrolledStore.js
import { writable } from 'svelte/store';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export function enrolledStore(userUid) {
    const enrolledClasses = writable([]);

    const loadEnrolledClasses = async () => {
        try {
            if (!userUid) {
                enrolledClasses.set([]);
                return;
            }

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

            enrolledClasses.set(filteredEnrolledClasses);
        } catch (error) {
            console.error('Error loading enrolled classes:', error);
        }
    };

    enrolledClasses.set([]); // Set an initial value
    loadEnrolledClasses(); // Load data on store creation

    return {
        subscribe: enrolledClasses.subscribe,
        reload: loadEnrolledClasses, // Add a method to manually reload the data
    };
}
