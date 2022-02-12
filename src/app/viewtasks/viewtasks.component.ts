import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'

@Component({
  selector: 'app-viewtasks',
  templateUrl: './viewtasks.component.html',
  styleUrls: ['./viewtasks.component.css']
})
export class ViewtasksComponent implements OnInit {

  userTasks;

  constructor(public userServiceObj:UserService) { }

  ngOnInit(): void {
    this.userServiceObj.viewTask().subscribe({
      next:(response)=>{
        console.log("Hello from view tasks")
        this.userTasks=response.payload
        console.log(this.userTasks)
      },
      error:()=>{}
    })
  }

}
