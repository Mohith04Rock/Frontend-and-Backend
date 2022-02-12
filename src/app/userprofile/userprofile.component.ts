import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  userObj;

  constructor(public userServiceObj:UserService) { }

  ngOnInit(): void {
    this.userObj = this.userServiceObj.getUserBehaviourSubject().getValue()
  }

}
