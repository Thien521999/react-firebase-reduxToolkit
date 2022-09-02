import { Loading } from 'common/Loading';
import LoginForm from 'components/auth/LoginForm';
import { LoginSocial } from 'components/auth/LoginSocial';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { authLogin } from 'redux/slice/authSlice';

const Login = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const { loading, currentUser } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (currentUser) return history.replace('/');
  }, [currentUser, history]);

  const handleSubmit = (values: any) => {
    dispatch(authLogin(values));
  };

  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-6rem)]'>
      <div className='container max-w-md p-5 shadow-sm'>
        <h2 className='my-3 text-2xl font-semibold tracking-widest text-center uppercase'>
          MARTIN TRAN
        </h2>
        <LoginForm onSubmit={handleSubmit} />
        <div className='text-center'>Or</div>
        <LoginSocial />
        <div>
          Are you have an account?{' '}
          <Link to='/register' className='text-red-500 hover:underine'>
            Register
          </Link>
        </div>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default Login;
