import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { UserService } from '../user.service';
import {  Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup

  registrationError={
    error:false,
    errorMessage:'',
  }


  constructor(public formBuilderObj:FormBuilder,public userServiceObj:UserService,public routerObj:Router) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilderObj.group({
      username:[''],
      password:['']
    })
  }

  get username(){
    return this.loginForm.get("username")
  }

  get password(){
    return this.loginForm.get("password")
  }

  onSubmit(){
    console.log(this.loginForm.value)
    this.userServiceObj.loggedUser=this.loginForm.value.username
    this.userServiceObj.loginUser(this.loginForm.value).subscribe({
      next:(response)=>{
        if(response.message!=="Login Success"){
          this.registrationError.error=true
          this.registrationError.errorMessage=response.message
        }
        else{
          //if success
          //store token
          localStorage.setItem("token",response.token)
          //update user behaviour subject with userObj
          this.userServiceObj.getUserBehaviourSubject().next(response.user)
          //navigate to user profile
          this.routerObj.navigateByUrl(`userprofile/${response.user.username}`)
        }
      },
      error:()=>{
        alert("Something went wrong...")
      }
    })
  }


}
