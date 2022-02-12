import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  taskForm:FormGroup

  registrationError={
    error:false,
    errorMessage:'',
  }

  constructor(public formBuilderObj:FormBuilder,public userServiceObj:UserService) { }

  ngOnInit(): void {
    this.taskForm=this.formBuilderObj.group({
      taskName:['',[Validators.required]],
      taskDate:['',[Validators.required]],
      description:['',[Validators.required]]
    })
  }

  get taskName(){
    return this.taskForm.get("taskName")
  }

  get taskDate(){
    return this.taskForm.get("taskDate")
  }

  get description(){
    return this.taskForm.get("description")
  }

  onSubmit(){
    console.log(this.taskForm.value)
    this.userServiceObj.addTask(this.taskForm.value).subscribe({
      next:(response)=>{
        console.log("Response from service",response)
      },
      error:(error)=>{
        console.log("Error",error)

      }
    })
  }

}
