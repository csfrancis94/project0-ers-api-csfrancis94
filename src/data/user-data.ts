import { SessionFactory} from "./session-factory";
import {User} from '../models/user';


/* USER MODEL

create table public.ersuser(
userId serial primary key,
username VARCHAR(50) unique not null,
firstname VARCHAR(50) not null,
lastname VARCHAR(50) not null,
passwd VARCHAR(50) not null,
email VARCHAR(355) not null,
userrole VARCHAR(50) not null
);

*/

export class UserDao{

    public async getAllUsers(): Promise<User[]> {
    let pool = SessionFactory.getConnectionPool();

    const client = await pool.connect();
    const result = await client.query("SELECT * from public.ersuser");
    return result.rows;
    }

    public async getUserById(id): Promise<User[]> {
        let pool = SessionFactory.getConnectionPool();
    
        const client = await pool.connect();
        const result = await client.query("SELECT * from ersuser WHERE userId = " + id + "");
        return result.rows;
    }

    public async updateUser(id, username, password, firstname, lastname, email, userrole): Promise<User[]> {
        let pool = SessionFactory.getConnectionPool();
    
        const client = await pool.connect();
        const result = await client.query("UPDATE ersuser SET username = '" + username + "'" + ", passwd = '" + password + "'" + ", firstname = '" + firstname + "', " + " lastname = '" + lastname + "', email = '" + email + "', userrole = '" + userrole + "' WHERE userId = " + id);
        return result.rows;
    }

}