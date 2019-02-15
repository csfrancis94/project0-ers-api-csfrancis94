import { SessionFactory} from "./session-factory";
import {Reimbursement} from '../models/reimbursement';


/* USER MODEL

/* REIMBURSEMENT MODEL

create table public.reimbursement(
reimbursementId serial primary key,
author integer not null,
constraint author_fkey foreign key (author) references ersuser(userId) match simple on update no action on delete no action,
amount integer not null,
dateSubmitted integer not null,
dateResolved integer not null,
description VARCHAR(50) not null,
resolver integer,
rstatus integer not null,
rtype integer,
constraint resolver_fkey foreign key (resolver) references ersuser(userId) match simple on update no action on delete no action,
constraint rstatus_fkey foreign key (rstatus) references reimbusementStatus(statusId) match simple on update no action on delete no action,
constraint rtype_fkey foreign key (rtype) references reimbusementType(typeId) match simple on update no action on delete no action

);

*/

export class ReimbursementDao{

    public async getReimbursementsByUsers(id): Promise<Reimbursement[]> {
    let pool = SessionFactory.getConnectionPool();

    const client = await pool.connect();
    const result = await client.query("SELECT * from public.reimbursement WHERE author = '" + id + "' ORDER BY dateSubmitted DESC");
    return result.rows;
    }

    public async getReimbursementById(id): Promise<Reimbursement[]> {
        let pool = SessionFactory.getConnectionPool();
    
        const client = await pool.connect();
        const result = await client.query("SELECT * from public.reimbursement WHERE reimbursementId = '" + id + "' ORDER BY dateSubmitted DESC");
        return result.rows;
        }
    

    public async getReimbursementsByStatus(id): Promise<Reimbursement[]> {
        let pool = SessionFactory.getConnectionPool();
    
        const client = await pool.connect();
        const result = await client.query("SELECT * from public.reimbursement WHERE rstatus = '" + id + "' ORDER BY dateSubmitted DESC");
        return result.rows;
    }

    public async submitReimbursement(author, amount, dateSubmitted, dateResolved, description, resolver, rstatus, rtype): Promise<Reimbursement[]> {
        let pool = SessionFactory.getConnectionPool();
    
        const client = await pool.connect();
        const result = await client.query("INSERT INTO public.reimbursement(author, amount, dateSubmitted, dateResolved, description, resolver, rstatus, rtype) VALUES ('" + author + "'" + ", '" + amount + "'" + ", '" + dateSubmitted + "', " + " '" + dateResolved + "', '" + description + "', '" + resolver + "', '" + rstatus + "', '" + rtype + "')");
        return result.rows;
    }

    public async updateReimbursement(id, author, amount, dateSubmitted, dateResolved, description, resolver, rstatus, rtype): Promise<Reimbursement[]> {
        let pool = SessionFactory.getConnectionPool();
    
        const client = await pool.connect();
        const result = await client.query("UPDATE public.reimbursement SET author = '" + author + "'" + ", amount = '" + amount + "'" + ", dateSubmitted = '" + dateSubmitted + "', " + " dateResolved = '" + dateResolved + "', description = '" + description + "', resolver = '" + resolver + "', rstatus ='" + rstatus + "', rtype = '" + rtype + "' WHERE reimbursementId = " + id);
        return result.rows;
    }

}