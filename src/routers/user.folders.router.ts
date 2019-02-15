import express from 'express';
import { User } from '../models/user';
import { Role } from '../models/role';
import { authMiddleware } from '..//middleware/authMiddleware';
import { UserDao } from '../data/user-data';
import { ReimbursementDao } from '../data/reimbursement-data';
import { Reimbursement } from '../models/reimbursement';
import { endianness } from 'os';

// we will assume all routes defined with this router
// start with '/users'
export const userRouter = express.Router();

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


//see all users
userRouter.get('/', (req, res) => {

  let userList;
  let financeManager = true;
  if (req.session.role > 1)
  {
          //set session variable here
          let userDao = new UserDao()
          userDao.getAllUsers().then(userArray => {userList = userArray;  
          let uuu : User[] = [];
          for (let v = 0; v < userList.length; v++)
          {
          let uu = new User(userList[v].userid, userList[v].username, userList[v].password, userList[v]["firstname"], userList[v]["lastname"], userList[v].email, userList[v]["userrole"]);
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

//lookup user by ID
userRouter.get('/:id', (req, res) => {

  let userList;
  let financeManager = true;
  if (req.session.role > 1)
  {
          //set session variable here
          let userDao = new UserDao()
          userDao.getUserById(req.params["id"]).then(userArray => {userList = userArray;
            
            let uu = new User(userList[0].userid, userList[0].username, userList[0].password, userList[0]["firstname"], userList[0]["lastname"], userList[0].email, userList[0]["userrole"]);
            
            
            console.log(JSON.stringify(uu)); res.send(JSON.stringify(uu));});

  }
  else    
  {
    res.status(401);
    res.json({"message": "The incoming token has expired"});
  }
  
});

//update user
userRouter.patch('/', (req, res, next) => {

  let Us : User = new User(0,"","","","","",null);
  let admin = true;
  if (req.session.role > 2)
  {
        let user;
          if (req.body["userId"] == undefined)
          {
            res.status(400);
            res.json("User ID must be supplied");
            return;
          }
          let userDao = new UserDao()
          userDao.getUserById(req.body["userId"]).then(userArray => {
            
             user = userArray;
          
          
          
            Us = user[0]; //set dummy user's info to the first match's info for that id
            
            for (let prop in Us)
                for (let prop2 in req.body)
                    if (prop.toString().toLowerCase() == prop2.toString().toLowerCase())
                    {
                        //users[req.body["userId"]][prop] = req.body[prop2];
                        Us[prop] = req.body[prop2]; //update dummy user
                        
                    }

              Us["password"] = Us["passwd"];
                  
            if (req.body["userId"] != undefined)
            {
              let uu = new User(req.body["userId"], Us.username, Us.password, Us["firstname"], Us["lastname"], Us.email, Us["userrole"]);
              userDao.updateUser(uu.userId, uu.username, uu.password, uu.firstName, uu.lastName, uu.email, uu.role).then(userArray => {
                res.send(JSON.stringify(uu));
                console.log(JSON.stringify(uu));
              });
                    
            }
          
          
          });


  }
  else    
  {
    res.status(401);
    res.json({"message": "The incoming token has expired"});
  }
  
});

//update reimbursement
userRouter.patch('/', (req, res, next) => {

let Re : Reimbursement = new Reimbursement(0,0,0,0,0,"",0,0,0);
let admin = true;
if (req.session.role > 2)
{
      let rem;
        if (req.body["reimbursementId"] == undefined)
        {
          res.status(400);
          res.json("User ID must be supplied");
          return;
        }
        let reDao = new ReimbursementDao()
        reDao.getReimbursementById(req.body["reimbursementId"]).then(userArray => { rem = userArray;});

        Re = rem[0]; //set dummy user's info to the first match's info for that id

        for (let prop in Re)
            for (let prop2 in req.body)
                if (prop.toString() == prop2.toString())
                {
                    //users[req.body["userId"]][prop] = req.body[prop2];
                    Re[prop] = req.body[prop2]; //update dummy user

                }
                
        if (req.body["userId"] != undefined)
        {
          
          reDao.updateReimbursement(req.body["reimbursementId"], req.body["amount"], req.body["dateSubmitted"], req.body["dateResolved"], req.body["description"], req.body["status"], req.body["resolver"], req.body["status"], req.body["type"]);
                res.send(JSON.stringify(Re));
        }
}
else    
{
  res.status(401);
  res.json({"message": "The incoming token has expired"});
}

});


//update user
userRouter.post('/', (req, res, next) => {

  let Us : User = new User(0,"","","","","",null);
  let admin = true;
  if (req.session.role > 2)
  {
        let user;
          if (req.body["userId"] == undefined)
          {
            res.status(400);
            res.json("User ID must be supplied");
            return;
          }
          let userDao = new UserDao()
          userDao.getUserById(req.body["userId"]).then(userArray => {
            
             user = userArray;
          
          
          
            Us = user[0]; //set dummy user's info to the first match's info for that id
            
            for (let prop in Us)
                for (let prop2 in req.body)
                    if (prop.toString().toLowerCase() == prop2.toString().toLowerCase())
                    {
                        //users[req.body["userId"]][prop] = req.body[prop2];
                        Us[prop] = req.body[prop2]; //update dummy user
                        
                    }

              Us["password"] = Us["passwd"];
                  
            if (req.body["userId"] != undefined)
            {
              let uu = new User(req.body["userId"], Us.username, Us.password, Us["firstname"], Us["lastname"], Us.email, Us["userrole"]);
              userDao.updateUser(uu.userId, uu.username, uu.password, uu.firstName, uu.lastName, uu.email, uu.role).then(userArray => {
                res.send(JSON.stringify(uu));
                console.log(JSON.stringify(uu));
              });
                    
            }
          
          
          });


  }
  else    
  {
    res.status(401);
    res.json({"message": "The incoming token has expired"});
  }
  
});