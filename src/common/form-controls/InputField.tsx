import React from 'react';
import { Control, Controller } from 'react-hook-form';

export interface Props {
  control: Control<any>;
  name: string;
  type: string;
  errors?: any;
  placeholder?: string;
}

export const InputField = ({ control, name, type, errors, placeholder }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <div className=''>
            <input {...field} type={type} name={name} placeholder={placeholder} className='w-full p-3 border' />
          </div>
          <div className='text-red-600 text-xs font-semibold'>{errors[name]?.message}</div>
        </>
      )}
    />
  );
};
