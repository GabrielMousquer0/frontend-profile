import { auth } from './mutation/auth';
import { register } from './mutation/register';
import { description } from './mutation/user';
import { editLanguages } from './mutation/user';
import {
  EmailUpdate,
  UsernameUpdate,
  PasswordUpdate,
  AvatarUpdate,
} from './mutation/edit';
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
