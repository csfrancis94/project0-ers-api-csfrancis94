import { Pool } from "pg";

export class SessionFactory
{

    static cred = {
            database: process.env.POSTGRESDBNAME, //process.env.POSTGRESDBNAME,
            host: process.env.POSTGRESDBHOST, //process.env.POSTGRESDBHOST,
            user: process.env.POSTGRESDBUSER, //process.env.POSTGRESDBUSER,
            password: "asia987ASDzkjciusad", //process.env.POSTGRESDBPASS,
            max: 10
    }
    static pool: Pool;
    static created = false;

    static getConnectionPool() : Pool{

        if (!this.created)
        {
            this.pool = new Pool(this.cred);
            this.created = true;
        }
        return this.pool;
    }


}