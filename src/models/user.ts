import { Role } from './role';

export class User{
userId:number;
username:string;
password:string;
firstName:string;
lastName:string;
email:string;
role:Role;

//insert into ersuser (username, passwd, firstName, lastName, email, userrole) values ('chris123', 'password123', 'Chris', 'Francis', 'cfrancis@usf.edu', '2')
//insert into ersuser (username, passwd, firstName, lastName, email, userrole) values ('admin', 'password123', 'Admin', 'Istrator', 'admin@usf.edu', '3')
//insert into ersuser (username, passwd, firstName, lastName, email, userrole) values ('normie', 'password123', 'Normie', 'Pleb', 'normie@usf.edu', '1')

constructor(userId : number, username : string,  password : string, firstName : string, lastName : string, email : string, role : Role)
{
        this.userId = userId, // primary key
        this.username = username, // not null, unique
        this.password = password, // not null
        this.firstName = firstName, // not null
        this.lastName = lastName, // not null
        this.email = email, // not null
        this.role = role // not null
    
}

}