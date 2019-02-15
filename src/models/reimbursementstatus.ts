export class ReimbursementStatus{
        statusId: number; // primary key
        status: string; // not null, unique

//insert into public.reimbusementstatus (rstatus) values ('Pending')
//insert into public.reimbusementstatus (rstatus) values ('Approved')
//insert into public.reimbusementstatus (rstatus) values ('Denied')

constructor(statusId : number, status: string)
{
        
        this.statusId = statusId, // primary key
        this.status = status // not null, unique
        
}

}