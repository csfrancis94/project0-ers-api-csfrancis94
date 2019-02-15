export class ReimbursementType{
        typeId: number; // primary key
        type: string; // not null, unique

//insert into public.reimbusementtype (rtype) values ('Lodging')
//insert into public.reimbusementtype (rtype) values ('Travel')
//insert into public.reimbusementtype (rtype) values ('Food')
//insert into public.reimbusementtype (rtype) values ('Other')

constructor(typeId : number, type: string)
{
        
        this.typeId = typeId, // primary key
        this.type = type // not null, unique
        
}

}