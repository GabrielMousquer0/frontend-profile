import {
  auth,
  description,
  EmailUpdate,
  UsernameUpdate,
  PasswordUpdate,
  AvatarUpdate,
  editLanguages,
  register,
} from './mutation';
import { userLanguages, users, viewUser } from './query';

export {
  auth,
  register,
  EmailUpdate,
  UsernameUpdate,
  PasswordUpdate,
  AvatarUpdate,
  description,
  editLanguages,
  userLanguages,
  users,
  viewUser,
};
