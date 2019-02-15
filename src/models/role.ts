export class Role{
roleId:number;
role:string;

//insert into ersrole (userrole) values ('normal')
//insert into ersrole (userrole) values ('finance-manager')
//insert into ersrole (userrole) values ('admin')

constructor(roleId : number, role : string)
{
        this.roleId = roleId, // primary key
        this.role = role // not null, unique
    
}

}