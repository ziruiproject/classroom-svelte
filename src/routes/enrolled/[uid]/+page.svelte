<script>
	import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
	import { db } from '$lib';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let enrolledUid = $page.params.uid;
	let enrolled,
		teacher,
		assignments = [];

	const currentDate = new Date();

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
			const formattedDueDate = formatDueDate(doc.data().due);
			assignments.push({ ...doc.data(), formatted: formattedDueDate, uid: doc.id });
		});

		enrolled = classDoc.data();
		teacher = teacherDoc.data();
		assignments = assignments;
	});

	function formatDueDate(firebaseTimestamp) {
		const dueDate = firebaseTimestamp.toDate();

		if (dueDate.getDay() - currentDate.getDay() < 7) {
			const dayOfWeek = dueDate.toLocaleDateString('id-ID', { weekday: 'long' });
			const time = dueDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
			return `${dayOfWeek} pukul ${time}`;
		}

		return dueDate.toLocaleDateString() + ' ' + dueDate.toLocaleTimeString();
	}
</script>

<main class="gap-y-20 grid">
	{#if !enrolled}
		<span>Loading</span>
	{:else}
		<div class="bg-[#ff8c0b] self-start -mx-6 -my-12 p-7 grid gap-y-7">
			<div class="flex items-center justify-between">
				<button class="md:hidden border-light-gray rounded-2xl block">
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
		<div class="gap-y-5 grid">
			<h2 class="text-2xl font-semibold">Task Due</h2>
			{#each assignments as assign}
				<div class="bg-gray rounded-2xl gap-y-5 grid p-4">
					<div class="gap-x-4 flex items-center">
						<div class="bg-purple rounded-xl w-fit h-fit p-2">
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
							<div class="gap-x-1 flex items-center">
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
					<div class="gap-y-5 grid">
						<p class="font-light">
							{assign.description}
						</p>
						<ul class="gap-y-2 grid">
							{#each assign.attachments as attachment, index}
								<a
									href={attachment}
									class="bg-light-gray w-fit h-fit gap-x-1 flex items-center justify-between px-3 py-1 rounded-full"
								>
									<svg
										width="18px"
										height="18px"
										stroke-width="1.5"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										color="#ffffff"
										><path
											d="M21.4383 11.6622L12.2483 20.8522C11.1225 21.9781 9.59552 22.6106 8.00334 22.6106C6.41115 22.6106 4.88418 21.9781 3.75834 20.8522C2.63249 19.7264 2 18.1994 2 16.6072C2 15.015 2.63249 13.4881 3.75834 12.3622L12.9483 3.17222C13.6989 2.42166 14.7169 2 15.7783 2C16.8398 2 17.8578 2.42166 18.6083 3.17222C19.3589 3.92279 19.7806 4.94077 19.7806 6.00222C19.7806 7.06368 19.3589 8.08166 18.6083 8.83222L9.40834 18.0222C9.03306 18.3975 8.52406 18.6083 7.99334 18.6083C7.46261 18.6083 6.95362 18.3975 6.57834 18.0222C6.20306 17.6469 5.99222 17.138 5.99222 16.6072C5.99222 16.0765 6.20306 15.5675 6.57834 15.1922L15.0683 6.71222"
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
							class="bg-green rounded-xl gap-x-1 flex items-center justify-center py-3 font-semibold"
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
				</div>
			{/each}
		</div>
	{/if}
</main>
