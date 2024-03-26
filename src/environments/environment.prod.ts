import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: true,
  // https://splendid-tan-python.cyclic.app
  apiUrl: 'https://zany-pear-donkey.cyclic.app',
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
