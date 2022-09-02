import { auth } from 'Firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import { IRegister } from 'types';

export const registerApi = async (user: IRegister) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, user.email, user.password);

    await updateProfile(res.user, {
      displayName: user.name,
    });

    return res.user;
  } catch (err: any) {
    toast.error(err.message);
  }
};
