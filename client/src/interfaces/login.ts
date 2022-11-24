// Types
import { ResultsType } from './swPeople';

export enum AllTypesLogin {
  user = 'user',
  password = 'password'
}

export enum AllTypesSignUp {
  name = 'name',
  lastName = 'lastName',
  motherLastName = 'motherLastName',
  dateBirth = 'dateBirth',
  phone = 'phone',
  gender = 'gender',
  user = 'user',
  password = 'password'
}

export type LoginType = {
  [key in AllTypesLogin]: string;
};

export type SignUpType = {
  [key in AllTypesSignUp]: string;
};

export type UserType = {
  [key in AllTypesSignUp]: string;
} & {
  favoriteThings?: ResultsType[];
};
