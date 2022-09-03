import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { profileUpdate } from 'redux/slice/profileSlice';
import { IProfile } from 'types';
import { ProfileForm } from './ProfileForm';

export interface IProps {
  setOnSetting: (onSetting: boolean) => void;
}

export const Settings = ({ setOnSetting }: IProps) => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: IProfile) => {
    if (!currentUser) return;
    setLoading(true);
    await dispatch(profileUpdate({ user: currentUser, data: values }));
    setLoading(false);
  };

  return (
    <div className='p-3 rounded-md shadow'>
      {/* ProfileForm */}
      <ProfileForm onSubmit={handleSubmit} loading={loading} />
      {/* Account */}

      {/* Change Password */}

      <button
        onClick={() => setOnSetting(false)}
        className='px-4 py-2 mt-5 font-semibold tracking-wider text-white uppercase bg-gray-500 rounded-md hover:bg-gray-600'
      >
        Cancel
      </button>
    </div>
  );
};
