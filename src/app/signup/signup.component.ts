import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

  errors: any[] =[];

  constructor(private router: Router,
    public service: UserService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.formModel.reset();
  }
 

  login(){
    this.router.navigateByUrl('/login');
  }

  onSubmit(){
    this.service.register().subscribe(
      data => {
        this.toastr.success('New user created!', 'Registration successful.')
        this.router.navigateByUrl('/');}
      
    );
  }
}
