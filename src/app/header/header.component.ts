import { Component, OnInit } from '@angular/core';
import { AnyForUntypedForms } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
userDetails: any;
userTokenShow: boolean = false;
token: any;

  constructor(private router: Router,
    private service: UserService) {
      
     }

  ngOnInit(){
    this.token = localStorage.getItem('token');
    if(this.token == null){
      this.userTokenShow = true;
    }
  }
  onLogout(){
    this.userTokenShow = false;
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    this.router.navigate(['/login']);
    window.location.reload();
  }
}
