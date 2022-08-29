
export enum Role {Admin,SuperAdmin,Subscriber}
export interface data {
    firstName:string;
    middleName:string;
    lastName:string;
    phoneNumber:string;
    email:string;
    address:string;
    role:Role;
    // action:string;

}
export let userKey: data[] =[
  {firstName:'rahul',
   middleName:'',
   lastName:'kasana',
   phoneNumber:'987654321',
   email:'rahul@mail.com',
   address:'eeerdkfd',
   role:Role.Admin,
   
  },

]
