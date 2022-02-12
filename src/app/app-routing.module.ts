import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FooterComponent } from './footer/footer.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { ViewtasksComponent } from './viewtasks/viewtasks.component';
const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'signup',component:SignupComponent},
  {path:"login",component:LoginComponent},
  {path:"footer",component:FooterComponent},
  {path:'userprofile/:username',component:UserprofileComponent,children:[
    {path:'addtask',component:AddtaskComponent},
    {path:'viewtasks',component:ViewtasksComponent},
    {path:"",redirectTo:"addtask",pathMatch:"full"}
  ]},
  {path:'',redirectTo:"home",pathMatch:"full"}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
