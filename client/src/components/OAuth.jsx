import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import { app } from '../firebase.js';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Handle redirect result when returning from Google
    const handleRedirect = async () => {
      try {
        const auth = getAuth(app);
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          const res = await fetch('/api/auth/google', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: result.user.displayName,
              email: result.user.email,
              photo: result.user.photoURL || null,
            }),
          });
          const data = await res.json().catch(() => null);
          if (data) dispatch(signInSuccess(data));
          navigate('/');
        }
      } catch {
        // swallow specific cross-origin popup/close errors
        // they can be caused by browser COOP/ORB policies or extensions
      }
    };

    handleRedirect();
  }, [dispatch, navigate]);

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      await signInWithRedirect(auth, provider);
    } catch (error) {
      // Ignore popup/close errors from COOP/ORB; log others if needed
      console.error("Google redirect sign-in failed:", error.message || error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg hover:opacity-90 uppercase relative z-50"
    >
      Continue with Google
    </button>
  );
}