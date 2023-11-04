// 

import { HttpHeaders } from '@angular/common/http';


export const environment = {
  production: true,
  apiUrl: 'https://relieved-kimono-clam.cyclic.app',
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

