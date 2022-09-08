import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { data, Role } from '../data';
import {UsersDataService} from '../service/users-data.service'
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  createUserForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    middleName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
  });

  createUser() {
    console.log(this.createUserForm.value);
    type roleV = keyof typeof Role;
    const submitVal = this.createUserForm.value;
    const firstName = submitVal.firstName!;
    const middleName = submitVal.middleName!;
    const lastName = submitVal.lastName!;
    const phoneNumber = submitVal.phoneNumber!;
    const email = submitVal.email!;
    const address = submitVal.address!;

    const obj = {
      lastName,
      middleName,
      address,
      email,
      phoneNumber,
      firstName,
      role: Role[submitVal.role as roleV],
    };
    const user = localStorage.getItem('user');
    // if (!user) {
    
    //   // localStorage.setItem('user', JSON.stringify([obj]));
    // } else {
    //   const userJsn = JSON.parse(user);
    //   userJsn.push(obj);
    //   this.userDataApi.save(obj).subscribe((data)=>{
    //   })
    //   // localStorage.setItem('user', JSON.stringify(userJsn));
    // }
    this.userDataApi.save(obj).subscribe((data)=>{
      console.log(data)
    })
    this.updateDataEvent.emit(obj);

    this.createUserForm.reset();
  }
  constructor(private userDataApi:UsersDataService) {}
  @Output() updateDataEvent = new EventEmitter<data>();
  ngOnInit(): void {}
}
