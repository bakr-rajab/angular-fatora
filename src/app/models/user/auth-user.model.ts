export class AuthUser {
  taxNumber!: number;
  password!: string;
}

export interface User {
  email: string;
  password: string;
  activity: string;
  taxNumber: string
  phone: string;
  name: string;
  clientId: string;
  clientSecret1: string;
  branchId: string;
  clientSecret2: string;
  role: string;
}

export interface userList {
  email: string;
  password: string;
  activity: string;
  taxNumber: string
  phone: string;
  name: any;
  clientId: string;
  clientSecret1: string;
  branch: object;
  clientSecret2: string;
  role: object;
}
