import { ref } from "vue";
import { fireAuth } from "../firebase/firebase";

const user = ref(fireAuth.currentUser);

fireAuth.onAuthStateChanged((_user) => {
  console.log("state changed", _user);
  user.value = _user;
});

const getUser = () => {
  return { user };
};

export default getUser;
