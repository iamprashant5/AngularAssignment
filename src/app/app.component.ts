import { Component } from '@angular/core';
import { data } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-assignment';
  userData:data[]=[]
  dat:data[]=[]
  updateData(obj:data){
    this.userData.push(obj)
     this.dat=this.userData
    console.log(this.userData,"app")
  }
}
