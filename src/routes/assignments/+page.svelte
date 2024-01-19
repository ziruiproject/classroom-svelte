<script>
	import { storage } from './../../firebase.js';
	import { ref, uploadBytes } from 'firebase/storage';

	const storageRef = ref(storage, '/assignments');

	let file;

	async function asign() {}
</script>

<h1>Assignments</h1>
<form on:submit|preventDefault={asign}>
	<label for="file">Upload gan</label>
	<input type="file" name="file" />
</form>
