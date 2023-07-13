export class AuthUser {
  email!: string;
  password!: string;
}

export class User {
  id!: string;
  email!: string;
  password!: string;
  taxNumber!: string
  phone!: string;
  name!: string;
  clientId!: string;
  clientSecret1!: string;
  clientSecret2!: string;
  roleId!: string;
  companyId!: string;
  company!: any;
  role!: any;
}
