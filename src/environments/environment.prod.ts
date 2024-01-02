import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: true,
  // https://splendid-tan-python.cyclic.app
  apiUrl: 'https://blue-violet-snapper-sock.cyclic.app',
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
