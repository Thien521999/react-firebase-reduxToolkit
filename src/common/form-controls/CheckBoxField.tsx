import React from 'react';
import { Control, Controller } from 'react-hook-form';

export interface Props {
  control: Control<any>;
  name: string;
  type: string;
}

export const CheckBoxField = ({ control, name, type }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <div className=''>
            <input {...field} type={type} name={name} className='w-4 h-4' />
          </div>
        </>
      )}
    />
  );
};
