export interface Role {
  id?: string;
  name: string;
}

export enum EnumRoles{
  ADMIN = 'ADMIN',
  USER = 'USER',
  SUPERADMIN = 'SUPERADMIN',
  SUP_USER = 'SUP-USER',
}