import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userBehaviourSubject = new BehaviorSubject(null)

  loggedUser;
  userTasks;

  constructor(public httpClientObj:HttpClient) { }

  getUserBehaviourSubject(){
    return this.userBehaviourSubject;
  }

  registerUser(userObj):Observable<any>{
    return this.httpClientObj.post<any>("http://localhost:5000/user/createuser",userObj)
  }

  loginUser(userCredObj):Observable<any>{
    return this.httpClientObj.post<any>("http://localhost:5000/user/login",userCredObj)
  }

  userLogout(){
    localStorage.removeItem("token")
    this.getUserBehaviourSubject().next(null)
  }

  addTask(newTask):Observable<any>{
    this.userTasks={username:this.loggedUser,taskList:[newTask]}
    return this.httpClientObj.post<any>("http://localhost:5000/user/addtask",this.userTasks)
  }

  viewTask():Observable<any>{
    return this.httpClientObj.get<any>(`http://localhost:5000/user/viewtasks/${this.loggedUser}`)
  }


}
