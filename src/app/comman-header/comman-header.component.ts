import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comman-header',
  templateUrl: './comman-header.component.html',
  styleUrls: ['./comman-header.component.css']
})
export class CommanHeaderComponent implements OnInit {

  userName:any
  userRole:any
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userName = sessionStorage.getItem('userName')
    this.userRole = sessionStorage.getItem('userRole')
  }

  onLogout(){
    sessionStorage.clear()
    this.router.navigate(['/salesInvoice']);
    
  }
}
