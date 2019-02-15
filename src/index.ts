import express from 'express';
import bodyParser from 'body-parser'
import { runInNewContext } from 'vm';
import  session  from 'express-session';
import {userRouter} from "./routers/user.folders.router";
import {authRouter} from "./routers/auth.ts.routers";
import {reimbursementRouter} from "../src/routers/rmb.folders.router";
import { User } from './models/user';
import { Reimbursement } from './models/reimbursement';
import { ReimbursementType } from './models/reimbursementtype';
import { ReimbursementStatus } from './models/reimbursementstatus';
import {authMiddleware} from "../src/middleware/authMiddleware";
import { Role } from './models/role';

const app = express();

// SQL COMMANDS


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

/* ROLE MODEL

create table public.ersrole(
  roleId serial primary key,
  userrole VARCHAR(50) unique not null
  );

*/

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

/* REIMBURSEMENT STATUS

create table public.reimbusementStatus(
  statusId serial primary key,
  rstatus VARCHAR(50) unique not null
  );

/* REIMBURSEMENT TYPE

create table public.reimbusementType(
  typeId serial primary key,
  rtype VARCHAR(50) unique not null
  );


*/


//create some dummy users
let u1 : User = new User(0,"bob", "pass", "robert", "pass", "bobrob@gmail.com", new Role(0, "normal"));
let u2 : User = new User(0,"sam", "pass", "robert", "pass", "bobrob@gmail.com", new Role(0, "normal"));
let u3 : User = new User(0,"meg", "pass", "robert", "pass", "bobrob@gmail.com", new Role(0, "normal"));

let users : User[] = [u1, u2, u3];


// set up body parser to convert json body to js object and attach to req
app.use(bodyParser.json());

// create logging middleware
app.use((req, res, next) => {
  console.log(`request was made with url: ${req.path}
  and method: ${req.method}`);
  next(); // will pass the request on to search for the next piece of middleware
});

// set up express to attach sessions
const sess = {
        secret: 'potato',
        cookie: { secure: false },
        resave: true,
        saveUnitialized: true
      };



// prior to this req.session is nothing
// after this req.session is an object we can store
// any user data we want on
app.use(session(sess));

// allow cross origins
app.use((req, resp, next) => {
  (process.env.MOVIE_API_STAGE === 'prod')
    ? resp.header('Access-Control-Allow-Headers', process.env.DEMO_APP_URL)
    : resp.header('Access-Control-Allow-Origin', `http://localhost:3000`);
  resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  resp.header('Access-Control-Allow-Credentials', 'true');
  resp.header('Access-Control-Allow-Methods', 'PUT,POST,GET,PATCH');
  next();
});

app.use('/users', userRouter);
app.use('/login', authRouter);
app.use('/reimbursements', reimbursementRouter);

/*
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/pokemon', pokemonRouter);
*/




/**
 * Don't do this, this was just to see if environment variables were working
 */
app.get('/env', (req, res) => {
        res.send(process.env.POSTGRESDBHOST);
      });

// app.get('/users', (req, res) => {
//   res.send('here are your users');
// })

// app.post('/users', (req, res) => {
//   const user = req.body;
//   console.log(user)
//   res.sendStatus(201);
// })

// app.get('/pokemon', (req, res) => {
//   res.send('here are your pokemon');
// })





app.listen(3000);
console.log('application started on port: 3000');
