import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: true,
  apiUrl: 'http://localhost:4000',
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
