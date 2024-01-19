<script>
	import { onMount } from 'svelte';
	import { db } from '../../firebase';
	import { getDocs, collection } from 'firebase/firestore';

	let courses = [];
	let course;

	onMount(async () => {
		const querySnapshot = await getDocs(collection(db, '/courses'));
		querySnapshot.forEach((doc) => {
			console.log(doc.data());
			courses.push(doc.data());
			courses = courses;
			console.log(courses);
		});
	});
</script>

<h1>Courses</h1>
{#if courses}
	<h1>real</h1>
	{#each courses as course}
		<h1>{course.title}</h1>
		<h1>{typeof course}</h1>
	{/each}
	<h1>{typeof courses}</h1>
{:else}
	<h1>gada masbro</h1>
{/if}
<button
	on:click={() => {
		console.log(courses);
		courses.forEach((course) => {
			console.log(course);
		});
	}}
>
	Click
</button>
