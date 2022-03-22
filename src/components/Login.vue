<template>
      <h2>LOGIN</h2>
      <form @submit.prevent="handleSubmit" class="form">
        <div>
            <input
            type="email"
            required
            placeholder="email"
            v-model="email"
        />
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
        <button>Login</button>
      </form>
</template>

<script>
import useLogin from '../composables/useLogin'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
    setup() {
        const email = ref('')
        const password = ref('')
        const router = useRouter()

        const { error, login } = useLogin()

        const handleSubmit = async() => {
            await login(email.value, password.value)
            if(!error.value) {
                router.push({
                    name: 'messages',
                    })
            }
        }

        return { email, password, handleSubmit, error }

    }
}
</script>

<style>

</style>