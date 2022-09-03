import { yupResolver } from '@hookform/resolvers/yup';
import { InputField } from 'common/form-controls/InputField';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from 'redux/hooks';
import { IProfile } from 'types';
import * as yup from 'yup';

export interface IProps {
  onSubmit: (value: any) => void;
  loading: boolean;
}

export const ProfileForm = ({ onSubmit, loading }: IProps) => {
  const { profile } = useAppSelector((state) => state.profile);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const schema = yup.object().shape({
    emailContact: yup
      .string()
      .required('Please enter your email address')
      .email('Invalid email address'),
    phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: profile?.fullname,
      emailContact: profile?.emailContact,
      phone: profile?.phone,
      website: profile?.website,
      address: profile?.address,
      about: profile?.about,
    },
    resolver: yupResolver(schema),
  });

  const handleLoginSubmit: any = async (values: IProfile) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <div>
      <div>
        <div className='md:grid md:grid-cols-3 md:gap-6'>
          <div className='md:col-span-1'>
            <div className='px-4 sm:px-0'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>Profile</h3>
              <p className='mt-1 text-sm text-gray-600'>
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className='mt-5 md:mt-0 md:col-span-2'>
            <form onSubmit={handleSubmit(handleLoginSubmit)}>
              <div className='shadow sm:rounded-md sm:overflow-hidden'>
                <div className='px-4 py-5 space-y-6 bg-white sm:p-6'>
                  {/* Full Name */}
                  <div>
                    <label htmlFor='fullname' className='block text-sm font-medium text-gray-700'>
                      Full Name
                    </label>
                    <div className='mt-1'>
                      <InputField name='fullname' control={control} type='text' errors={errors} />
                    </div>
                  </div>
                  {/* Email Contact */}
                  <div>
                    <label
                      htmlFor='emailContact'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Email Contact
                    </label>
                    <div className='mt-1'>
                      <InputField
                        name='emailContact'
                        control={control}
                        type='text'
                        errors={errors}
                      />
                    </div>
                  </div>
                  {/* Address */}
                  <div>
                    <label htmlFor='address' className='block text-sm font-medium text-gray-700'>
                      Address
                    </label>
                    <div className='mt-1'>
                      <InputField name='address' control={control} type='text' errors={errors} />
                    </div>
                  </div>
                  {/* Phone number */}
                  <div>
                    <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>
                      Phone Number
                    </label>
                    <div className='mt-1'>
                      <InputField name='phone' control={control} type='text' errors={errors} />
                    </div>
                  </div>
                  {/* website */}
                  <div>
                    <label htmlFor='website' className='block text-sm font-medium text-gray-700'>
                      Website
                    </label>
                    <div className='mt-1'>
                      <InputField name='website' control={control} type='text' errors={errors} />
                    </div>
                  </div>
                  {/* About */}
                  <div>
                    <label htmlFor='about' className='block text-sm font-medium text-gray-700'>
                      About
                    </label>
                    <div className='mt-1'>
                      <InputField name='about' control={control} type='text' errors={errors} />
                    </div>
                  </div>
                </div>

                {/* Button */}
                <div className='px-4 py-3 text-right bg-gray-50 sm:px-6'>
                  <button
                    type='submit'
                    className='inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Save'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className='hidden sm:block' aria-hidden='true'>
        <div className='py-5'>
          <div className='border-t border-gray-200' />
        </div>
      </div>
    </div>
  );
};
