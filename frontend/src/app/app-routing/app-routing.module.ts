import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { EmployeeComponent } from '../employee/employee.component';
import { CreateComponent } from './create/create.component';
import { FormsModule} from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { AuthGuardService} from '../auth/auth-guard.service';
import { SearchPipePipe } from '../search-pipe.pipe';
import { OrderByPipe } from '../app-routing/order-by.pipe';

const appRoutes: Routes = [
      {path: 'users', component: EmployeeComponent, canActivate: [AuthGuardService]},
      {path : 'create', component:CreateComponent},
      {path : 'login', component:LoginComponent},
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: '**', redirectTo: 'login', pathMatch: 'full'}
]; 

@NgModule({
  providers: [AuthGuardService],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(appRoutes,{useHash:false})],
  declarations: [
    EmployeeComponent,
    CreateComponent,
    LoginComponent,
    SearchPipePipe,
    OrderByPipe
    
  ],
  exports:[RouterModule]
})

export class AppRoutingModule { }
