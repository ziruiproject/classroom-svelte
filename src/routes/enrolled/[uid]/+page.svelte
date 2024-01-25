<script>
	import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
	import { enrolledStore, userStore, auth, db } from '$lib';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let user = userStore(auth);
	let enrolledUid = $page.params.uid;
	let enrolled,
		teacher,
		assignments = [];

	onMount(async () => {
		const enrolledRef = doc(db, 'enrolled', enrolledUid);
		const enrolledDoc = await getDoc(enrolledRef);

		const classRef = doc(db, 'classes', enrolledDoc.data().classUid);
		const classDoc = await getDoc(classRef);

		const teacherRef = doc(db, 'teachers', classDoc.data().teacher);
		const teacherDoc = await getDoc(teacherRef);

		const assignmentsRef = collection(db, 'assignments');
		const assignQuery = query(assignmentsRef, where('classUid', '==', enrolledDoc.data().classUid));
		const assignDocs = await getDocs(assignQuery);

		assignDocs.forEach((doc) => {
			assignments.push(doc.data());
		});

		enrolled = classDoc.data();
		teacher = teacherDoc.data();
		assignments = assignments;
	});
</script>

<main class="grid gap-y-20">
	{#if !enrolled}
		<span>Loading</span>
	{:else}
		<div class="bg-[#ff8c0b] self-start -mx-6 -my-12 p-7 grid gap-y-7">
			<div class="flex items-center justify-between">
				<button class="md:hidden block border-light-gray rounded-2xl">
					<svg
						width="38px"
						height="38px"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="M15 6L9 12L15 18"
							class="stroke-white"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path>
					</svg>
				</button>
				<button>
					<svg
						width="32px"
						height="32px"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						color="#ffffff"
						><path
							d="M1 20V19C1 15.134 4.13401 12 8 12V12C11.866 12 15 15.134 15 19V20"
							stroke="#ffffff"
							stroke-width="1.5"
							stroke-linecap="round"
						></path><path
							d="M13 14V14C13 11.2386 15.2386 9 18 9V9C20.7614 9 23 11.2386 23 14V14.5"
							stroke="#ffffff"
							stroke-width="1.5"
							stroke-linecap="round"
						></path><path
							d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z"
							stroke="#ffffff"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path><path
							d="M18 9C19.6569 9 21 7.65685 21 6C21 4.34315 19.6569 3 18 3C16.3431 3 15 4.34315 15 6C15 7.65685 16.3431 9 18 9Z"
							stroke="#ffffff"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path>
					</svg>
				</button>
			</div>
			<h1 class="text-4xl font-bold">{enrolled?.title}</h1>
			<div class="w-fit flex items-center gap-1 p-1 pr-4 align-middle bg-white rounded-full">
				<img src={teacher?.photoURL} alt="" width="20" class="rounded-full" />
				<span class="text-light-gray text-xs text-center">
					{teacher?.displayName}
				</span>
			</div>
		</div>
		<div>
			<h2 class="text-2xl font-semibold">Task Due</h2>
			{#each assignments as assign}
				<div>
					<h2 class="text-2xl font-semibold">{assign.title}</h2>
				</div>
			{/each}
		</div>
	{/if}
</main>
