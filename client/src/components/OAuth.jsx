import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import {useDispatch} from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';
import { useNavigate }from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch ('/api/auth/google',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: result.user.email,
          name: result.user.displayName,
          photo: result.user.photoURL
        }),
      })
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log("Can't sign in with Google", error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button" // Yeh type="button" form submit hone se rokta hai, jo ke bilkul sahi hai!
      className="bg-red-700 text-white p-3 rounded-lg hover:opacity-90 z-50"
    >
      Continue with Google
    </button>
  );
}