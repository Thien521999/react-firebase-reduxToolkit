import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { ForgotPasswordForm } from 'components/auth/ForgotPasswordForm';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from 'redux/hooks';
import { authForgotPassword } from 'redux/slice/authSlice';

const ForgotPassword = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const handleSubmit = (values: any) => {
    dispatch(authForgotPassword(values.email));
  };

  return (
    <div className='max-w-lg text-gray-600'>
      <h2 className='text-3xl font-semibold'>Forgot Password</h2>

      <ForgotPasswordForm onSubmit={handleSubmit} />

      <button
        className='flex items-center px-4 py-2 text-white bg-gray-600 rouned-md hover: bg-gary-700'
        onClick={() => history.goBack()}
      >
        <ArrowLeftIcon className='w-5 h-5 mr-1' /> Back
      </button>
    </div>
  );
};

export default ForgotPassword;
