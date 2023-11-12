import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service-layer/users.service';
import { LocalStorageService } from '../service-layer/local-storage.service';

@Component({
  selector: 'app-comman-header',
  templateUrl: './comman-header.component.html',
  styleUrls: ['./comman-header.component.css'],
})
export class CommanHeaderComponent implements OnInit {
  userName: any;
  userRole: any;
  constructor(
    private router: Router,
    private userService: UserService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.userName = this.localStorage.getItem('userName');
    this.userRole = this.localStorage.getItem('userRole');
  }

  onLogout() {
    console.log('Here');
    const userId = this.localStorage.getItem('userId');
    console.log('5555', userId);

    this.userService.updateUser(userId, { online: false }).subscribe((res) => {
      console.log('set uder offline', res);
    });

    this.localStorage.clear();

    this.router.navigate(['/']);
  }
}
