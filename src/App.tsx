import Header from 'components/header';
import { auth } from 'Firebase';
import { onAuthStateChanged, sendEmailVerification, signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import PageRender from './PageRender';

const App = () => {
  const history = useHistory();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log(user);

      if (user) {
        if (!user.emailVerified) {
          await sendEmailVerification(user);
          await signOut(auth);
          return history.push('/email_verified');
        }
      }
    });
    return unsubscribe;
  }, [history]);
  return (
    <>
      <Header />
      <Switch>
        <Route path='/' component={PageRender} exact />
        <Route path='/:page' component={PageRender} exact />
        <Route path='/:page/:id' component={PageRender} exact />
      </Switch>
    </>
  );
};

export default App;
