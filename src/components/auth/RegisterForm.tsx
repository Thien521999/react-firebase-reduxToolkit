import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputField } from 'common/form-controls/InputField';
import { IRegister } from 'types';

export interface Props {
  onSubmit: (value: any) => void;
}

const RegisterForm = ({ onSubmit }: Props) => {
  const schema = yup.object().shape({
    name: yup.string(),
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
    cf_password: yup
      .string()
      .required('Please enter confirm password')
      .oneOf([yup.ref('password')], () => 'Password do not match'),
  });

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      cf_password: '',
    },
    resolver: yupResolver(schema),
  });

  const handleRegisterSubmits: any = async (values: IRegister) => {
    if (onSubmit) {
      await onSubmit(values);
    }
    reset({
      ...values,
      password: '',
      cf_password: '',
    });
  };

  return (
    <form onSubmit={handleSubmit(handleRegisterSubmits)}>
      <div className='my-3'>
        <label htmlFor='name'>Display Name</label>
        <InputField name='name' control={control} type='name' errors={errors} />
      </div>
      <div className='my-3'>
        <label htmlFor='email'>Email</label>
        <InputField name='email' control={control} type='text' errors={errors} />
      </div>
      <div className='my-3'>
        <label htmlFor='password'>Password</label>
        <InputField name='password' control={control} type='password' errors={errors} />
      </div>
      <div className='my-3'>
        <label htmlFor='cf_password'>Confirm Password</label>
        <InputField name='cf_password' control={control} type='password' errors={errors} />
      </div>
      <button
        type='submit'
        className='w-full p-3 my-2 font-semibold tracking-wider uppercase border-2 hover:bg-gray-200'
      >
        submit
      </button>
    </form>
  );
};

export default RegisterForm;
