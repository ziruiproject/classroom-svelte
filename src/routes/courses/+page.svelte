<script>
	import { onMount } from 'svelte';
	import { db } from '$lib';
	import { getDocs, collection } from 'firebase/firestore';

	let courses = [];

	onMount(async () => {
		const querySnapshot = await getDocs(collection(db, '/courses'));
		querySnapshot.forEach((doc) => {
			courses.push(doc.data());
			courses = courses;
		});
	});
</script>

<h1>Courses</h1>
{#each courses as course}
	<div>
		<span>{course.title}</span>
		<span>{course.date}</span>
		<span>{course.time}</span>
		<a href="https://its-ac-id.zoom.us/j/2452008973">Ikuti</a>
	</div>
{/each}
