import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: true,
  // https://splendid-tan-python.cyclic.app
  apiUrl: 'https://envoice-nest-app.onrender.com',
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
