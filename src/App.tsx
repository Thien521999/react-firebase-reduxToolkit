import { Header } from 'components/header';
import { auth } from 'Firebase';
import { onAuthStateChanged, sendEmailVerification, signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addUser } from 'redux/slice/authSlice';
import { fetchProfile } from 'redux/slice/profileSlice';
import PageRender from './PageRender';

const App = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  
  const {currentUser} = useAppSelector(state => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const providerId = user.providerData.some((p) => p.providerId === 'password');

        if (providerId && !user.emailVerified) {
          await sendEmailVerification(user);
          await signOut(auth);
          return history.push('/email_verify');
        }

        dispatch(addUser(user));
      }else {
        dispatch(addUser(undefined));
        return history.push('/login');
      }
    });
    return unsubscribe;
  }, [history, dispatch]);

  useEffect(() => {
    if(currentUser?.uid) {
      dispatch(fetchProfile(currentUser?.uid));
    }
  }, [dispatch, currentUser?.uid]);

  return (
    <>
      <Header />
      <main className='container p-4 mx-auto max-w-7xl'>
        <Switch>
          <Route path='/' component={PageRender} exact />
          <Route path='/:page' component={PageRender} exact />
          <Route path='/:page/:id' component={PageRender} exact />
        </Switch>
      </main>
    </>
  );
};

export default App;
