import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder,
    private http: HttpClient) { }

    readonly userAPIUrl = "https://localhost:7240/api";

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: ['', Validators.required],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, {validator: this.comparePasswords})
    
  });

  comparePasswords(fb: FormGroup){
    let confirmPswrdCtrl = fb.get('ConfirmPassword'); 
    let pw = fb.get('Password')
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch: true}
    if(confirmPswrdCtrl?.errors == null || 'passwordMissmatch' in confirmPswrdCtrl.errors) {
      if(pw?.value != confirmPswrdCtrl?.value) {
        confirmPswrdCtrl?.setErrors({passwordMissmatch: true})
      }
      else {
        confirmPswrdCtrl?.setErrors(null);
      }

    }
  }


  register(){
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      Password: this.formModel.value.Passwords.Password,
      FullName: this.formModel.value.FullName,
      Role: ''
    };
    return this.http.post(this.userAPIUrl+'/ApplicationUser/Register', body);
  }

  login(formData: any){
    return this.http.post(this.userAPIUrl+'/ApplicationUser/Login', formData);

  }

  getUserProfile(){
    var tokenHeader = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')})
    return this.http.get(this.userAPIUrl+ '/UserProfile', {headers: tokenHeader});
  }

  roleMatch(allowedRoles: any[]): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1]));
    var userRole = payLoad.role;
    // allowedRoles.forEach((element: any) => {
    //   if (userRole == element) {
    //     isMatch = true;
    //     return false;
    //   }
    // });
    return isMatch;
  }
  
}
