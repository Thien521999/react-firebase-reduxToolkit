import * as FireAuth from 'firebase/auth';

export interface IParams {
  page: string;
  id: string;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
  cf_password: string;
}

export interface ILogin {
  email: string;
  password: string;
  remember: boolean;
}

export interface IForgot {
  email: string;
}

export interface IAuth extends FireAuth.User {}

export interface IProfile {
  fullname: string;
  emailContact: string;
  phone: string;
  website: string;
  address: string;
  about: string;
}
