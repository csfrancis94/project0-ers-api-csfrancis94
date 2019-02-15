import express from 'express';
import { User } from '../models/user';
import { Role } from '../models/role';
import { Reimbursement } from '../models/reimbursement';
import { authMiddleware } from '..//middleware/authMiddleware';
import { ReimbursementDao } from '../data/reimbursement-data';

// we will assume all routes defined with this router
// start with '/users'
export const reimbursementRouter = express.Router();

/*
// /users - find all
userRouter.get('', [
authMiddleware,
(req, res) => {
  res.json(users);
}])

// /users/:id - find by id
userRouter.get('/:id', (req, res) => {
  console.log(req.params);
  const idParam = +req.params.id;
                                      // +'1' - will convert to number
  const user = users.find(ele => ele.id === idParam);
  res.json(user);
})

userRouter.post('', (req, res) => {
  users.push(req.body);
  res.sendStatus(201);
})*/

//create some dummy users
let u1 : User = new User(0,"bob", "pass", "robert", "pass", "bobrob@gmail.com", new Role(0, "normal"));
let u2 : User = new User(0,"sam", "pass", "robert", "pass", "bobrob@gmail.com", new Role(0, "normal"));
let u3 : User = new User(0,"meg", "pass", "robert", "pass", "bobrob@gmail.com", new Role(0, "normal"));

let users : User[] = [u1, u2, u3];


//Find Reimbursements By Status
reimbursementRouter.get('/status/:statusId', (req, res) => {

  let reList;
  let financeManager = true;
  if (req.session.role > 1)
  {
          //set session variable here
          let reDao = new ReimbursementDao()
          reDao.getReimbursementsByStatus(req.params["statusId"]).then(reArray => {reList = reArray;  
          let uuu : Reimbursement[] = [];
          for (let v = 0; v < reList.length; v++)
          {
          let uu = new Reimbursement(reList[v]["reimbursementid"], reList[v]["author"], reList[v]["amount"], reList[v]["datesubmitted"], reList[v]["dateresolved"], reList[v]["description"], reList[v]["resolver"], reList[v]["rstatus"], reList[v]["rtype"]);
          uuu.push(uu);  
            
          
          }
          console.log(JSON.stringify(uuu)); res.send(JSON.stringify(uuu));
        });
  }
  else    
  {
    res.status(401);
    res.json({"message": "The incoming token has expired"});
  }
  
});



//Find Reimbursements By User
reimbursementRouter.get('/author/userId/:userId', (req, res) => {

  let reList;
  let financeManager = true;
  if (req.session.role > 1)
  {
          //set session variable here
          let reDao = new ReimbursementDao()
          reDao.getReimbursementsByUsers(req.params["userId"]).then(reArray => {reList = reArray;  
          let uuu : Reimbursement[] = [];
          for (let v = 0; v < reList.length; v++)
          {
          let uu = new Reimbursement(reList[v]["reimbursementid"], reList[v]["author"], reList[v]["amount"], reList[v]["datesubmitted"], reList[v]["dateresolved"], reList[v]["description"], reList[v]["resolver"], reList[v]["rstatus"], reList[v]["rtype"]);
          uuu.push(uu);  
            
          
          }
          console.log(JSON.stringify(uuu)); res.send(JSON.stringify(uuu));
        });
  }
  else    
  {
    res.status(401);
    res.json({"message": "The incoming token has expired"});
  }
  
});
//Submit Reimbursement
reimbursementRouter.post('/', (req, res, next) => {

  let admin = true;
  if (req.session.role > 0)
  {
          if (req.body["reimbursementId"] != 0)
          {
            res.status(400);
            res.json("reimbursementID must be 0");
            next();
          }
          let time = Date.now();
          time = time/100000;
          time = parseInt(""+time);

          let r = new Reimbursement(0, req.body["author"], req.body["amount"], time, 0, req.body["description"], req.body["resolver"], req.body["status"], req.body["type"]);
          console.log(JSON.stringify(r));
          //set session variable here
          let reDao = new ReimbursementDao()
          reDao.submitReimbursement(+r.author, +r.amount, +r.dateSubmitted, +r.dateResolved, +r.description, +r.resolver, +r.status, +r.type ).then(reArray => {console.log(reArray); });

          req.body["userId"]
          for (let prop in users[req.body["userId"]])
              for (let prop2 in req.body)
                  if (prop.toString() == prop2.toString())
                  {
                      users[req.body["userId"]][prop] = req.body[prop2];
                      
                  }
                  
          if (req.body["userId"] != undefined)
                  res.status(201);
                  res.send(JSON.stringify(r));
  }
  else    
  {
          res.status(401);
          res.json({"message": "The incoming token has expired"});
  }
  
});
