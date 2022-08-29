import { Component, OnInit, Input } from '@angular/core';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { data, userKey } from '../data';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  usersData: data[];
  keys: Array<keyof typeof userKey[0]>;
  faEdit = faEdit;
  faRemove = faTrash;
  editable= {
    index:0,
    value:false
  }

  constructor() {
    const users = localStorage.getItem('user');
    const dat: data[] = users ? JSON.parse(users) : [];
    this.usersData = this.newData.length ? this.newData : dat;
    this.keys = Object.keys(userKey[0]) as Array<keyof typeof userKey[0]>;
    console.log(this.usersData, this.keys, this.newData, 'aa');
  }
  @Input() newData: data[] = [];
  ngOnInit(): void {
    console.log(this.newData, 'ss');
    const users = localStorage.getItem('user');
    const dat: data[] = users ? JSON.parse(users) : [];
    this.usersData = this.newData.length ? this.newData : dat;
  }

  removeRow(index: number) {
    this.usersData = this.usersData.filter((el, ind) => ind !== index);
    localStorage.setItem('user', JSON.stringify(this.usersData));
  }

  editRow(index: number) {
    this.editable={
      index:index,value:true
    }
 

  }
save(index:number){
  this.editable={
    index:index,
    value:false
  }
  const table = document.querySelector('.table')!;
  const tr = table.getElementsByTagName('tr')!;
  const td1 = tr[index + 1].getElementsByTagName('td')!;

  console.log(tr[index + 1], 'tr', td1.item(7), 'td');
  type ObjectKey = keyof typeof userKey[0];

  const newObj  = {
    firstName:'',
    middleName:'',
    lastName:'',
    phoneNumber:'',
    email:'',
    address:'',
    role:''
  }

  for (let i = 0; i < td1.length - 1; i++) {
    newObj[this.keys[i] as ObjectKey] = td1.item(i)?.innerHTML!
  }
  const newArr = [...this.usersData.slice(0,index),newObj ,...this.usersData.slice(index+1)]
  localStorage.setItem('user',JSON.stringify(newArr))

}

cancel(index:number){
  this.editable={
    index:index,
    value:false
  }
  this.ngOnInit()
}

}
