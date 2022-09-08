import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { data, Role, userKey } from '../data';
import {UsersDataService} from '../service/users-data.service'
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit, OnChanges {
  usersData:any;
  keys: Array<keyof typeof userKey[0]>;
  faEdit = faEdit;
  faRemove = faTrash;
  editable = {
    id: 0,
    value: false,
  };

  @Input() hero: data[] = [];
  constructor(private userDataApi:UsersDataService) {
    userDataApi.users().subscribe((data)=>{
    console.log(data,"api call")
    
      this.usersData=data
    })
    this.keys = Object.keys(userKey[0]) as Array<keyof typeof userKey[0]>;
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['hero'].currentValue[0],"ng change");
   if (changes['hero'].currentValue[0]){
     this.usersData.push(changes['hero'].currentValue[0]);
   } 
  }

  ngOnInit(): void {
  }

  removeRow(id: number) {
    this.usersData = this.usersData.filter((el:any, ind:number) => el.id !== id);
    // localStorage.setItem('user', JSON.stringify(this.usersData));
    this.userDataApi.deleteUserApi(id).subscribe()
  }

  editRow(index: number) {
    this.editable = {
      id: index,
      value: true,
    };
  }
  save(id: number,index:number) {
    this.editable = {
      id: id,
      value: false,
    };
    const table = document.querySelector('.table')!;
    const tr = table.getElementsByTagName('tr')!;
    const td1 = tr[index+1].getElementsByTagName('td')!;

    // console.log(tr[index], 'tr', td1.item(7), 'td');
    console.log(td1)
    type ObjectKey = keyof typeof userKey[0];
    type roleV = keyof typeof Role;

    const newObj : any = {
      firstName: '',
      middleName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      address: '',
      role: 0,
    };

    for (let i = 0; i < td1.length - 1; i++) {
      if(i==td1.length-2){
        newObj['role'] = td1.item(i)?.innerHTML? Number(td1.item(i)?.innerHTML) :0
      }else{
        newObj[this.keys[i] as ObjectKey] = td1.item(i)?.innerHTML!;
      }
    }
    // const newArr = [
    //   ...this.usersData.slice(0, index),
    //   newObj,
    //   ...this.usersData.slice(index + 1),
    // ];
    // localStorage.setItem('user', JSON.stringify(newArr));
   console.log(newObj,"new obj")
    this.userDataApi.patchUserApi(newObj,id).subscribe(data=>console.log(data,"patch api"))
  }

  cancel(index: number) {
    this.editable = {
      id: index,
      value: false,
    };
    this.ngOnInit();
  }
}
