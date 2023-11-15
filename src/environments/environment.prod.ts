import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: true,
  apiUrl: 'https://wild-tan-scorpion-sock.cyclic.app',
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
