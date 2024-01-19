<script>
	function place() {
		return 1;
	}
</script>

<form on:submit|preventDefault={place}>
	<label for="title">Judul</label>
	<input type="text" name="title" />
	<br />
	<label for="date">Tanggal</label>
	<input type="date" name="date" />
	<br />
	<label for="time">Waktu</label>
	<input type="time" name="time" />
</form>
