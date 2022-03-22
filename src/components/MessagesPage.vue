<template>
	<div class="display"></div>
	<form class="form" @submit.prevent="handleSubmit">
		<input type="text" v-model="message" placeholder="Type a message..." />
		<button>Send</button>
		<div class="error">{{ error }}</div>
	</form>
</template>

<script>
import { ref } from "vue";
import getUser from "../composables/getUser";
import addToCollection from "../composables/addToCollection";
// import firebaseMessaging from "../firebase/firebase";
export default {
	setup() {
		const { user } = getUser();
		const { addDoc, error } = addToCollection("messages");
		const message = ref("");
		// const messaging = firebaseMessaging();

		const handleSubmit = async () => {
			const chat = {
				fullName: user.value.displayName,
				message: message.value,
			};

			await addDoc(chat);
			fetch("http://localhost:3000/messages", {
				method: "POST",
				body: JSON.stringify({
					displayName: user.value.displayName,
					message: message.value,
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			})
				.then((res) => res.json())
				.then((data) => console.log(data));
			if (!error.value) {
				message.value = "";
			}
		};

		return { message, handleSubmit, error };
	},
};
</script>

<style scoped>
.form {
	display: flex;
}
.form input {
	width: 100%;
	height: 40px;
	border: none;
	border-bottom: 2px solid black;
	font-size: 15px;
	margin: 10px;
	outline: none;
}
.form button {
	height: 40px;
	width: 120px;
	background: none;
	border: 3px solid #00d9ff;
	border-radius: 25px;
	margin: 20px;
	font-size: 15px;
	font-weight: 600;
}

.form button:hover {
	color: white;
	background: #00d9ff;
}

.error {
	position: relative;
	top: 70px;
	right: 200px;
	color: #ff004c;
}

.display {
	height: 80vh;
	width: 80vh;
	background-color: #eeeeee;
}
</style>
