import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgForm, Form } from '@angular/forms';
import { Observable } from 'rxjs';
import { EmployeDataService } from '../employe-data.service';
import { IEmployee } from '../iemployee';
import { AppSettings } from '../app-settings';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeDataService]
})
export class EmployeeComponent implements OnInit {
  searchStr: string = '';
  currentUser: any = AppSettings.CURRENT_USER;
  _empService: EmployeDataService;
  employees: IEmployee[];
  user = {
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    order: ''
  }
  errorMessage: String;
  loading = false;
  error = '';
  success = '';
  items: any;
  order = "order";
  ascending = true;


  constructor(private empService: EmployeDataService, private router: Router) {
    this._empService = empService;
  }

  getUsers(): void {
    this._empService
      .getEmpData()
      .subscribe(res => {
        this.employees = res;
        for (var i = 0; i < this.employees.length; i++) {
          this.employees[i]['order'] = i;
        }
      },
      error => this.errorMessage = <any>error);
  }

  getUserByID(Id: number): void {
    this._empService
      .getEmpDataId(Id)
      .subscribe(res => {
        this.user.id = res[0].id;
        this.user.name = res[0].name;
        this.user.email = res[0].email;
        this.user.address = res[0].address;
        this.user.phone = res[0].phone;
        this.user.password = res[0].password;
      },
      error => this.errorMessage = <any>error);
  }

  deletUser(id: number) {
    if (confirm('Are you sure to delete?' + id)) {
      this._empService.deleteUser(id).subscribe((res) => {
        window.location.reload();
      });
    }
  }

  updateUser(form: NgForm) {
    delete this.user['order'];
    this.loading = true;
    this._empService.updateEmpData(this.user)
      .subscribe((res) => {
        this.success = 'information has been successfully updated';
        this.getUsers();
        this.loading = false;
        //this.router.navigate(['/users']);
      }),
      error => {
        // this.alertService.error(error);
        this.error = 'Error';
        this.loading = false;
      };
  }

  favorite(id: number): void {
    this._empService
      .getEmpData()
      .subscribe(res => {
        this.employees = res;
        for (var i = 0; i < this.employees.length; i++) {
          if ((this.employees[i]['id'] === id && (id > 0))) {
            this.employees[i]['order'] = 0;
          } else {
            this.employees[i]['order'] = i+1;
          }
        }
      },
      error => this.errorMessage = <any>error);

  }

  ngOnInit() {
   for (var x = 0; x < this.currentUser.length; x++) {
          console.log('this.currentUser');
        }  
  

    this.getUsers();
  }


}
