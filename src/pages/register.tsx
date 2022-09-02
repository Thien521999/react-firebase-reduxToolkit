import { Loading } from 'common/Loading';
import RegisterForm from 'components/auth/RegisterForm';
import { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { authRegister } from 'redux/slice/authSlice';

const Register = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  
  const { loading, currentUser } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (currentUser) return history.replace('/');
  }, [currentUser, history]);

  const handleSubmit = (values:any) => {
    dispatch(authRegister(values));
  };

  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-6rem)]'>
        <div className='container max-w-md p-5 shadow-sm'>
            <h2 className='my-3 text-2xl font-semibold tracking-widest text-center uppercase'>
              MARTIN TRAN
            </h2>
            <RegisterForm onSubmit={handleSubmit} />
            <div>
                You already have an account? <Link to='/login' className='text-red-500 hover:underine'>Login</Link>
            </div>
        </div>
        {loading && <Loading />}
    </div>
  )
}

export default Register