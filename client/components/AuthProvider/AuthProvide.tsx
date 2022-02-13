import React from 'react';

import { useDispatch } from 'react-redux';

import nookies from 'nookies';

import axios from 'axios';

import { onIdTokenChanged, getAuth, getTokens } from '../../firebase.client';

import { setAuth, setAuthID, setLoaded, setRole } from '../../redux/authSlice';

async function tokensFunc() {
  const tokens = await getTokens();

  return tokens;
}

const AuthProvider = ({ children }: any) => {
  const dispatch = useDispatch();

  const auth = getAuth();

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).nookies = nookies;
    }

    return onIdTokenChanged(auth, async (user: any) => {
      if (user) {
        const usersData: any = await axios.get(
          `http://127.0.0.1:4000/users/${user.uid}`
        );

        const mesToken = await tokensFunc();

        if (mesToken) {
          await axios.put(`http://127.0.0.1:4000/firebase/tokens`, {
            uid: user.uid,
            token: mesToken,
          });
        }

        const userData = usersData.data.user;

        if (userData !== undefined && userData.length > 0) {
          dispatch(setAuth({ isAuth: true }));
          dispatch(setLoaded({ isLoaded: true }));
          dispatch(setAuthID({ authID: user.uid }));
          dispatch(setRole({ role: userData[0].role }));

          const token = await user.getIdToken();

          nookies.destroy(null, 'token');
          nookies.set(null, 'token', token, { path: '/' });
        } else {
          try {
            await axios.post(`http://127.0.0.1:4000/users`, {
              email: user.email,
              role: 'user',
              uid: user.uid,
            });

            dispatch(setAuth({ isAuth: true }));
            dispatch(setLoaded({ isLoaded: true }));
            dispatch(setAuthID({ authID: user.uid }));
            dispatch(setRole({ role: 'user' }));

            const token = await user.getIdToken();

            nookies.destroy(null, 'token');
            nookies.set(null, 'token', token, { path: '/' });
          } catch (e) {
            dispatch(setAuth({ isAuth: false }));
            dispatch(setLoaded({ isLoaded: true }));
            dispatch(setAuthID({ authID: '' }));
            dispatch(setRole({ role: '' }));

            nookies.destroy(null, 'token');
            nookies.set(null, 'token', '', { path: '/' });
          }
        }
      } else {
        dispatch(setAuth({ isAuth: false }));
        dispatch(setLoaded({ isLoaded: true }));
        dispatch(setAuthID({ authID: '' }));
        dispatch(setRole({ role: '' }));

        nookies.destroy(null, 'token');
        nookies.set(null, 'token', '', { path: '/' });
      }
    });
  }, [auth, dispatch]);

  React.useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;

      if (user) {
        await user.getIdToken(true);
      }
    }, 10 * 60 * 1000);
    return () => clearInterval(handle);
  }, [auth.currentUser]);

  return <>{children}</>;
};

export default React.memo(AuthProvider);
