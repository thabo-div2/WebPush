import { ref } from "@vue/reactivity";
import { fireStore } from "../firebase/firebase.js";

const addToCollection = (collection) => {
  const error = ref(null);

  const addDoc = async (doc) => {
    error.value = null;

    try {
      await fireStore.collection(collection).add(doc);
    } catch (err) {
      console.log(err.message);
      error.value = "Could not send the message";
    }
  };

  return { error, addDoc };
};

export default addToCollection;
