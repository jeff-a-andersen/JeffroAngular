import { Role } from './role';

export class User {
  id: number;
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  email: string;
  newPassword: string;
  roles: Role[];
}
