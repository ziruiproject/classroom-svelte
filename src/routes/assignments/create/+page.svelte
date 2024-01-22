<script>
	import { storage } from '$lib';
	import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

	let file, avatar, downloadURL;

	async function handleFileChanges(e) {
		file = e.target.files[0];

		const reader = new FileReader();

		reader.onloadend = () => {
			avatar = reader.result;
		};

		if (file) {
			reader.readAsDataURL(file);
		}
	}

	async function handleUpload(e) {
		e.preventDefault();

		if (file) {
			const storageRef = ref(storage, `/assignments/${file.name}`);

			try {
				await uploadBytes(storageRef, file);

				downloadURL = await getDownloadURL(storageRef);
			} catch (error) {
				console.error('Error uploading file:', error.message);
			}
		}
	}
</script>

<h1>Assignments</h1>
{#if avatar}
	<img src={avatar} alt="" style="max-width: 300px; max-height: 300px;" />
{/if}
{#if downloadURL}
	<p>Download URL: {downloadURL}</p>
{/if}
<form on:submit|preventDefault={handleUpload}>
	<label for="file">Upload gan</label>
	<input
		type="file"
		accept="application/msword, application/vnd.ms-excel,
				application/vnd.ms-powerpoint,
				text/plain, application/pdf"
		name="file"
		on:change={handleFileChanges}
	/>
	<button type="submit">Upload</button>
</form>
