import { ref } from "@vue/reactivity";
import { fireAuth } from "../firebase/firebase";

const error = ref(null);
const signup = async (email, password, displayName) => {
  error.value = null;

  try {
    const res = await fireAuth.createUserWithEmailAndPassword(email, password);
    if (!res) {
      throw new Error("could not complete the signups");
    }
    await res.user.updateProfile({ displayName });

    error.value = null;

    return res;
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
  }
};

export const useSignup = () => {
  return { error, signup };
};
