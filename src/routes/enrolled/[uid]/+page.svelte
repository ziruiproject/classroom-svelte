<script>
	import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
	import { db } from '$lib';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let enrolledUid = $page.params.uid;
	let enrolled,
		teacher,
		assignments = [];
	export let data;

	const currentDate = new Date();

	console.log($page.data.value);
	console.log(data.value);

	onMount(async () => {
		console.log(data.cachedEnrolledClasses);

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
			const formattedDueDate = formatDueDate(doc.data().due);
			assignments.push({ ...doc.data(), formatted: formattedDueDate, uid: doc.id });
		});

		enrolled = classDoc.data();
		teacher = teacherDoc.data();
		assignments = assignments;
	});

	function formatDueDate(firebaseTimestamp) {
		const dueDate = firebaseTimestamp.toDate();

		const timeDiff = dueDate - currentDate;

		if (dueDate.getDay() - currentDate.getDay() < 7) {
			const dayOfWeek = dueDate.toLocaleDateString('id-ID', { weekday: 'long' });
			const time = dueDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
			return `${dayOfWeek} pukul ${time}`;
		}

		return dueDate.toLocaleDateString() + ' ' + dueDate.toLocaleTimeString();
	}
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
		<div class="grid gap-y-5">
			<h2 class="text-2xl font-semibold">Task Due</h2>
			{#each assignments as assign}
				<a href={'/assignments/' + assign.uid} class="bg-gray p-4 rounded-2xl">
					<div class="flex gap-x-4 items-center">
						<div class="bg-purple p-2 rounded-xl w-fit h-fit">
							<svg
								width="24px"
								height="24px"
								stroke-width="1.5"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								color="#ffffff"
								><path
									d="M19 3L5 3C3.89543 3 3 3.89543 3 5L3 19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
									stroke="#ffffff"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path><path
									d="M7 7L17 7"
									stroke="#ffffff"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path><path
									d="M7 12L17 12"
									stroke="#ffffff"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path><path
									d="M7 17L13 17"
									stroke="#ffffff"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path></svg
							>
						</div>
						<div>
							<h2 class="text-lg font-medium">{assign.title}</h2>
							<div class="flex items-center gap-x-1">
								<svg
									width="18px"
									height="18px"
									stroke-width="1.5"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									color="#64656c"
									><path
										d="M12 6L12 12L18 12"
										stroke="#64656c"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path><path
										d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
										stroke="#64656c"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path></svg
								>
								<span class="text-text-gray font-light -mb-1">
									{assign.formatted}
								</span>
							</div>
						</div>
					</div>
				</a>
			{/each}

			{#each assignments as assign}
				<a href={'/assignments/' + assign.uid} class="bg-gray p-4 rounded-2xl grid gap-y-5">
					<div class="flex gap-x-4 items-center">
						<div class="bg-purple p-2 rounded-xl w-fit h-fit">
							<svg
								width="24px"
								height="24px"
								stroke-width="1.5"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								color="#ffffff"
								><path
									d="M19 3L5 3C3.89543 3 3 3.89543 3 5L3 19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
									stroke="#ffffff"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path><path
									d="M7 7L17 7"
									stroke="#ffffff"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path><path
									d="M7 12L17 12"
									stroke="#ffffff"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path><path
									d="M7 17L13 17"
									stroke="#ffffff"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path></svg
							>
						</div>
						<div>
							<h2 class="text-lg font-medium">{assign.title}</h2>
							<div class="flex items-center gap-x-1">
								<svg
									width="18px"
									height="18px"
									stroke-width="1.5"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									color="#64656c"
									><path
										d="M12 6L12 12L18 12"
										stroke="#64656c"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path><path
										d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
										stroke="#64656c"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path></svg
								>
								<span class="text-text-gray -mb-1">
									{assign.formatted}
								</span>
							</div>
						</div>
					</div>
					<div class="grid gap-y-5">
						<p class="font-light">
							{assign.description}
						</p>
						<ul class="grid gap-y-2">
							{#each assign.attachments as attachment, index}
								<a
									href={attachment}
									class="bg-light-gray w-fit h-fit px-3 py-1 rounded-full flex justify-between gap-x-1 items-center"
								>
									<svg
										width="20px"
										height="20px"
										stroke-width="1.5"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										color="#ffffff"
										><path
											d="M14 11.9976C14 9.5059 11.683 7 8.85714 7C8.52241 7 7.41904 7.00001 7.14286 7.00001C4.30254 7.00001 2 9.23752 2 11.9976C2 14.376 3.70973 16.3664 6 16.8714C6.36756 16.9525 6.75006 16.9952 7.14286 16.9952"
											stroke="#ffffff"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path><path
											d="M10 11.9976C10 14.4893 12.317 16.9952 15.1429 16.9952C15.4776 16.9952 16.581 16.9952 16.8571 16.9952C19.6975 16.9952 22 14.7577 22 11.9976C22 9.6192 20.2903 7.62884 18 7.12383C17.6324 7.04278 17.2499 6.99999 16.8571 6.99999"
											stroke="#ffffff"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path></svg
									>
									<span class="text-xs"> attachment {index + 1}</span>
								</a>
							{/each}
						</ul>
						<button
							class="bg-green py-3 rounded-xl font-semibold flex justify-center items-center gap-x-1"
						>
							<svg
								width="24px"
								height="24px"
								stroke-width="1.5"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								color="#ffffff"
								><path
									d="M6 20L18 20"
									stroke="#ffffff"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path><path
									d="M12 16V4M12 4L15.5 7.5M12 4L8.5 7.5"
									stroke="#ffffff"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path></svg
							>
							<span class="-mb-1"> Upload </span>
						</button>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</main>
