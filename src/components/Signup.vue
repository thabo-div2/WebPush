<template>
	<h2>SIGN-UP</h2>
	<form @submit.prevent="handleSubmit" class="form">
		<div>
			<input type="text" required placeholder="full name" v-model="displayName" />
		</div>
		<div>
			<input type="email" required placeholder="email" v-model="email" />
		</div>
		<div>
			<input
				type="password"
				required
				placeholder="password"
				v-model="password"
			/>
		</div>
		<div>
			{{ error }}
		</div>
		<button>Signup</button>
	</form>
</template>

<script>
import { useSignup } from "../composables/useSignup.js";
import addToCollection from "../composables/addToCollection";
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
	setup() {
		const { error, signup } = useSignup();
		const { error: err, addDoc } = addToCollection("users");
		const displayName = ref("");
		const email = ref("");
		const password = ref("");
		const router = useRouter();

		const handleSubmit = async () => {
			await signup(email.value, password.value, displayName.value);

			const user = {
				displayName: displayName.value,
				email: email.value,
				password: password.value,
			};

			await addDoc(user);

			await fetch(`http://localhost:3000/users`, {
				method: "POST",
				body: JSON.stringify({
					displayName: displayName.value,
					email: email.value,
					password: password.value,
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			})
				.then((res) => res.json())
				.then((data) => console.log(data));

			if (!error.value || !err.value) {
				router.push({
					name: "messages",
				});
			}
		};

		return { displayName, email, password, handleSubmit, error };
	},
};
</script>

<style>
.form input {
	width: 25%;
	height: 40px;
	border: none;
	border-bottom: 2px solid black;
	font-size: 15px;
	margin: 10px;
	outline: none;
}
.form button {
	height: 40px;
	width: 90px;
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
</style>
