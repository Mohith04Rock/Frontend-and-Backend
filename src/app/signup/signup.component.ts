import { Component, OnInit , TemplateRef } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import {UserService } from '../user.service'
import { Router } from '@angular/router';  
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  
  userSignUp:FormGroup

  registrationError={
    error:false,
    errorMessage:'',
  }

  constructor(public formBuilderObj:FormBuilder,public userServiceObj:UserService,public routerObj:Router,public modalService:BsModalService) { }

  ngOnInit(): void {
    this.userSignUp=this.formBuilderObj.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      city:['',[Validators.required]]
    })
  }

  fileName:string;
  file:File;
  imageUrl:string | ArrayBuffer="https://bulma.io/images/placeholders/480x480.png"
  onFileSelected(file:File){
      this.file= file
      this.fileName = file.name
      //read content
      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload=()=>{
        this.imageUrl=reader.result
      }
  }

  get username(){
    return this.userSignUp.get("username")
  }

  get password(){
    return this.userSignUp.get("password")
  }

  get email(){
    return this.userSignUp.get("email")
  }

  get city(){
    return this.userSignUp.get("city")
  }

  onSubmit(template:TemplateRef<any>){
    //console.log(this.userSignUp.value)
    //get user obj
    let userObj = this.userSignUp.value
    //create form data
    let formData = new FormData()
    //add userobj to formdata
    formData.append("userObj",JSON.stringify(userObj))
    //add file to formdata
    formData.append("photo",this.file)
    this.userServiceObj.registerUser(formData).subscribe({
      next:(response)=>{
        if(response.message==="User already existed"){
          this.registrationError.error=true
          this.registrationError.errorMessage=response.message
          //alert("Username already taken")
        }
        else{
          this.openModal(template)
          //alert("User created successfully!!!")
          //navigate to user login page
          //this.routerObj.navigateByUrl("/login")
        }
      },
      error:(error)=>{
        alert("Something went wrong..")
        console.log(error)
      }
    })
  }

  modalRef?: BsModalRef;
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirm(): void {
    this.routerObj.navigateByUrl("/login")
    this.modalRef?.hide();
  }
 
  decline(): void {
   this.routerObj.navigateByUrl("/home")
    this.modalRef?.hide();
  }


 
}
