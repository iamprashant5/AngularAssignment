import { AfterViewInit, Component, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { data, userKey } from './data';
import { ListUsersComponent } from './list-users/list-users.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // @ViewChild(ListUsersComponent) listUsers;
  title = 'angular-assignment';
  userData:data[]=[]
  dat:data[]=[]
  buttonText="Load Data"
  show=false
  newObj:data=userKey[0]
  
  updateData(obj:data){
    this.userData.push(obj)
    console.log(this.userData,"app")
  this.newObj = obj
  }
  loadData(){
     if(!this.show) this.show=true
     this.buttonText='Refresh Data'
  }

  refreshData(){
  if(this.newObj!==userKey[0] && this.dat[0]!==this.newObj){
    this.dat=[this.newObj]
  }

  }

 
}
