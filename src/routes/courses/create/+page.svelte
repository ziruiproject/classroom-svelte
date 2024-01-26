<script>
	import { db } from '$lib';
	import { addDoc, collection } from 'firebase/firestore';

	let title, date, time;

	async function create() {
		try {
			const docRef = await addDoc(collection(db, 'meetings'), {
				title: title,
				date: date,
				time: time,
				status: true
			});
		} catch (e) {
			console.error('gagal gan: ', e);
		}
	}
</script>

<form on:submit|preventDefault={create}>
	<label for="title">Judul</label>
	<input type="text" name="title" bind:value={title} />
	<br />
	<label for="date">Tanggal</label>
	<input type="date" name="date" bind:value={date} />
	<br />
	<label for="time">Waktu</label>
	<input type="time" name="time" bind:value={time} />
	<br />
	<button type="submit">Buat</button>
</form>
