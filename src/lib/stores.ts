import { Auth, onAuthStateChanged } from "firebase/auth";
import { writable } from "svelte/store";

export function userStore(auth: Auth) {
    let unsubscribe: () => void;

    const { subscribe } = writable(auth.currentUser, (set) => {
        unsubscribe = onAuthStateChanged(auth, async (user) => {
            await set(user);
        });
        return () => unsubscribe();
    });

    return {
        subscribe,
    };
}