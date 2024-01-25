<script>
	import { db } from '$lib';
	import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
	import { userStore, auth } from '$lib';

	let title, price;

	const currentUser = userStore(auth);

	async function create() {
		try {
			const docRef = await addDoc(collection(db, 'classes'), {
				title: title,
				price: price,
				active: true,
				teacher: $currentUser?.uid,
				createdAt: serverTimestamp()
			});
		} catch (e) {
			console.error('gagal gan: ', e);
		}
	}
</script>

<main>
	<form on:submit|preventDefault={create}>
		<label for="title">Judul</label>
		<input type="text" name="title" bind:value={title} />
		<br />
		<label for="price">Harga</label>
		<input type="text" name="price" bind:value={price} />
		<br />
		<button type="submit">Buat</button>
	</form>
</main>
