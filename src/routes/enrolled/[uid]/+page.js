/** @type {import('./$types').PageLoad} */

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '$lib';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';

export async function load() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            return
        }

        if (browser) {
            goto('/login')
        }

    })
}
