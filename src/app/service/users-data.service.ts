import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { data } from '../data';

@Injectable({
  providedIn: 'root',
})
export class UsersDataService {
  url = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}

  users() {
    return this.http.get(this.url);
  }
  save(data: data) {
    return this.http.post(this.url, data);
  }
  patchUserApi(data:data,id:number){
   return this.http.patch(`${this.url}/${id}`,data)
  }
  deleteUserApi(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
}
