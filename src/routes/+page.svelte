<script>
	export let data;
	let user = data.user,
		enrolled = data.enrolled,
		meetings = data.meetings;

	let photoProfile;

	photoProfile =
		user?.photoProfile ||
		`https://placehold.co/500x500/green/white/?text=${user?.displayName?.[0]}`;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<main class="gap-y-8 grid">
	<div class="flex items-center justify-between align-middle">
		<div class="gap-x-4 flex items-center align-middle">
			<img src={photoProfile} alt="" class="w-16 rounded-full" />
			<div>
				<h1 class="text-xl font-semibold">{user?.displayName}</h1>
				<span class="text-text-gray text-lg font-light">Semangat Belajar</span>
			</div>
		</div>
		<div class="bg-green rounded-xl p-3">
			<svg
				width="24px"
				height="24px"
				stroke-width="1.5"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				color="#ffffff"
				><path
					d="M14 20.4V14.6C14 14.2686 14.2686 14 14.6 14H20.4C20.7314 14 21 14.2686 21 14.6V20.4C21 20.7314 20.7314 21 20.4 21H14.6C14.2686 21 14 20.7314 14 20.4Z"
					stroke="#ffffff"
					stroke-width="1.5"
				></path><path
					d="M3 20.4V14.6C3 14.2686 3.26863 14 3.6 14H9.4C9.73137 14 10 14.2686 10 14.6V20.4C10 20.7314 9.73137 21 9.4 21H3.6C3.26863 21 3 20.7314 3 20.4Z"
					stroke="#ffffff"
					stroke-width="1.5"
				></path><path
					d="M14 9.4V3.6C14 3.26863 14.2686 3 14.6 3H20.4C20.7314 3 21 3.26863 21 3.6V9.4C21 9.73137 20.7314 10 20.4 10H14.6C14.2686 10 14 9.73137 14 9.4Z"
					stroke="#ffffff"
					stroke-width="1.5"
				></path><path
					d="M3 9.4V3.6C3 3.26863 3.26863 3 3.6 3H9.4C9.73137 3 10 3.26863 10 3.6V9.4C10 9.73137 9.73137 10 9.4 10H3.6C3.26863 10 3 9.73137 3 9.4Z"
					stroke="#ffffff"
					stroke-width="1.5"
				></path></svg
			>
		</div>
	</div>
	<div class="gap-x-4 caraousel grid w-full grid-flow-col">
		{#if enrolled}
			{#each enrolled as enrolledClass (enrolledClass.uid)}
				<a
					href={'/enrolled/' + enrolledClass.uid}
					class="bg-[#ff8c0b] rounded-xl p-3 grid gap-y-20 snap-start min-w-48"
				>
					<span class="text-2xl font-bold">{enrolledClass.title}</span>
					<div class="flex justify-between">
						<div class="w-fit flex items-center gap-1 p-1 pr-4 align-middle bg-white rounded-full">
							<img src={enrolledClass.teacher.photoURL} alt="" width="20" class="rounded-full" />
							<span class="text-light-gray text-xs text-center">
								{enrolledClass.teacher.name}
							</span>
						</div>
					</div>
				</a>
			{/each}
		{:else}
			<p>No enrolled classes found.</p>
		{/if}
	</div>
	<div class="gap-y-5 grid">
		<h2 class="text-2xl font-semibold">Meetings</h2>
		<div class="gap-y-5 grid">
			{#each meetings as meeting}
				<div class="bg-gray rounded-2xl p-4">
					<div class="gap-x-4 flex items-center">
						<div class="bg-[#2349d1] rounded-xl w-fit h-fit p-2">
							<svg
								width="24px"
								height="24px"
								stroke-width="1.5"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								color="#ffffff"
								><path
									d="M15 12V16.4C15 16.7314 14.7314 17 14.4 17H3.6C3.26863 17 3 16.7314 3 16.4V7.6C3 7.26863 3.26863 7 3.6 7H14.4C14.7314 7 15 7.26863 15 7.6V12ZM15 12L20.0159 7.82009C20.4067 7.49443 21 7.77232 21 8.28103V15.719C21 16.2277 20.4067 16.5056 20.0159 16.1799L15 12Z"
									stroke="#ffffff"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path></svg
							>
						</div>
						<div class="gap-y-1 grid">
							<div class="gap-x-1 flex items-center">
								<h2 class="text-lg font-medium">{meeting.title}</h2>
								<span class="text-text-gray mt-1">
									- {meeting.className}
								</span>
							</div>
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
									{meeting.formattedDate + ' pukul ' + meeting.time}
								</span>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>
