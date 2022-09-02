import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputField } from 'common/form-controls/InputField';
import { IRegister } from 'types';
import { CheckBoxField } from 'common/form-controls/CheckBoxField';
import { Link } from 'react-router-dom';

export interface Props {
  onSubmit: (value: any) => void;
}

const RegisterForm = ({ onSubmit }: Props) => {
  const schema = yup.object().shape({
    email: yup.string().required('Please enter your email address').email('Invalid email address'),
    password: yup
      .string()
      .required(
        'Password must be 8 - 16 characters long and have numbers, uppercase and lowercase letters'
      )
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        'Password must be 8 - 16 characters long and have numbers, uppercase and lowercase letters'
      )
      .min(
        8,
        'Password must be 8 - 16 characters long and have numbers, uppercase and lowercase letters'
      )
      .max(
        16,
        'Password must be 8 - 16 characters long and have numbers, uppercase and lowercase letters'
      ),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
    resolver: yupResolver(schema),
  });

  const handleLoginSubmit: any = async (values: IRegister) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLoginSubmit)}>
      <div className='my-3'>
        <label htmlFor='email'>Email</label>
        <InputField name='email' control={control} type='text' errors={errors} />
      </div>
      <div className='my-3'>
        <label htmlFor='password'>Password</label>
        <InputField name='password' control={control} type='password' errors={errors} />
      </div>
      <div className='flex items-center justify-between my-2'>
        <div className='flex items-center justify-center'>
          <CheckBoxField name='remember' control={control} type='checkbox' />
          <label htmlFor='rb-me' className='ml-2 block ml-2 text-sm cursor-pointer text-gray-900'>Remember me</label>
        </div>
        <Link
          to='/forgot_password'
          className='block ml-2 text-sm text-blue-600 cursor-pointer hover:underine'
        >
          Forgot your password
        </Link>
      </div>

      <button
        type='submit'
        className='w-full p-3 my-2 font-semibold tracking-wider uppercase border-2 hover:bg-gray-200'
      >
        Login
      </button>
    </form>
  );
};

export default RegisterForm;
