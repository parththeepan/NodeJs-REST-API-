const express = require('express');
const router = express.Router();
const db  = require('./dbConnection');
const { signupValidation, loginValidation,categoryValidation } = require('./validation');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//Register user
router.post('/register', signupValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }else{
  db.query(
    `SELECT * FROM customers WHERE LOWER(email) = LOWER(${db.escape(req.body.email)});`,
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: 'This customer is already in use!'
        });
      } else {
        // username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err
            });
          } else {
            // has hashed pw => add to database
            db.query(
              `INSERT INTO customers (username, email, password) VALUES ('${req.body.username}', ${db.escape(req.body.email)}, ${db.escape(hash)})`,
              (err, result) => {
                if (err) {
                  throw err;
                  return res.status(400).send({
                    msg: err
                  });
                }
                return res.status(201).send({
                  msg: 'The customer has been registerd successfully!'
                });
              }
            );
          }
        });
      }
    }
  );
  }
});


//user login
router.post('/login', loginValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }else{
  db.query(
    `SELECT * FROM customers WHERE username = ${db.escape(req.body.username)};`,
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: 'Username or password is incorrect!'
        });
      }

      
      bcrypt.compare(
        req.body.password,
        result[0]['password'],
        (bErr, bResult) => {
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: 'UserName or password is incorrect!'
            });
          }
          if (bResult) {
            const token = jwt.sign({id:result[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });
            return res.status(200).send({
              msg: 'Logged in!',
              token,
              user: result[0]
            });
          }
          return res.status(401).send({
            msg: 'Username or password is incorrect!'
          });
        }
      );
    }
  );
  }
});

//get user details
router.get('/get-user', signupValidation, (req, res, next) => {


    if(
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
    ){
        return res.status(422).json({
            message: "Please provide the token",
        });
    }

    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'the-super-strong-secrect');

    db.query('SELECT * FROM customers where id=?', decoded.id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Fetch Successfully.' });
    });


});


//get one category
router.get('/category/:id',(req,res)=>{

  if(
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer') ||
    !req.headers.authorization.split(' ')[1]
  ){
    return res.status(422).json({
        message: "Please provide the token",
    });
  }

  const theToken = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(theToken, 'the-super-strong-secrect');


  db.query('SELECT*FROM category WHERE category_id=?',[req.params.id],(err,rows,fields)=>{

    if(!err){
      res.send(rows);
    }else{
      console.log(err);
    }

  });

});


//get all catgory details
router.get('/category',(req,res)=>{

  if(
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer') ||
    !req.headers.authorization.split(' ')[1]
  ){
    return res.status(422).json({
        message: "Please provide the token",
    });
  }

  const theToken = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(theToken, 'the-super-strong-secrect');
  db.query('SELECT*FROM category',(err,rows,fields)=>{

    if(!err){
      res.send(rows);
    }else{
      console.log(err);
    }

  });

});



//post category
router.post('/category',categoryValidation,(req,res,next)=>{
  if(
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer') ||
    !req.headers.authorization.split(' ')[1]
  ){
    return res.status(422).json({
        message: "Please provide the token",
    });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }else{

  const theToken = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(theToken, 'the-super-strong-secrect');

  let cat=req.body;
  let data={category_name:cat.category_name,category_description:cat.category_description,category_count:cat.category_count,category_status:cat.category_status};
  var sql='INSERT INTO category SET ?';

  db.query(sql,data,(err,rows,fields)=>{

    if(!err){
      
        res.send("Inserted category successfully");
    
      
    }else{
      console.log(err);
    }

  });

}

});




//update catgory
router.put('/category/:category_id',categoryValidation,(req,res)=>{
  if(
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer') ||
    !req.headers.authorization.split(' ')[1]
  ){
    return res.status(422).json({
        message: "Please provide the token",
    });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }else{
  const theToken = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(theToken, 'the-super-strong-secrect');

  let cat=req.body;
  var sql='UPDATE category SET category_name=?,category_description=?,category_count=?,category_status=? WHERE category_id=?';
  db.query(sql,[cat.category_name,cat.category_description,cat.category_count,cat.category_status,req.params.category_id],(err,rows,fields)=>{

    if(!err){
        res.send("Updated successfully ");
  
    }else{
      console.log(err);
    }

  });

}

});


//delete category
router.delete('/category/:id',(req,res)=>{
  if(
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer') ||
    !req.headers.authorization.split(' ')[1]
  ){
    return res.status(422).json({
        message: "Please provide the token",
    });
  }

  const theToken = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(theToken, 'the-super-strong-secrect');

  db.query('DELETE FROM category WHERE category_id=?',[req.params.id],(err,rows,fields)=>{

    if(!err){
      res.send("deleted successfully");
    }else{
      console.log(err);
    }

  });

});





module.exports = router;
