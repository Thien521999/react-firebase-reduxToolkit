import { InputField } from 'common/form-controls/InputField';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from 'redux/hooks';
import { IForgot } from 'types';

export interface Props {
  onSubmit: (value: any) => void;
}

export const ForgotPasswordForm = ({ onSubmit }: Props) => {
  const { loading } = useAppSelector((state) => state.auth);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const handleForgotSubmit: any = async (values: IForgot) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleForgotSubmit)} className='my-3'>
      <label htmlFor='email'>Email address</label>
      <div className='flex w-full'>
        <div>
          <InputField
            name='email'
            control={control}
            type='text'
            errors={errors}
            placeholder='email@example.com'
          />
        </div>
        <button type='submit' className='px-4 ml-1 border hover:bg-gray-50' disabled={loading}>
          {loading ? 'loading...' : 'Send'}
        </button>
      </div>
    </form>
  );
};
