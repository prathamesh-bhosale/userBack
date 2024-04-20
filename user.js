const express = require("express");
const utils = require("../utils");
const database = require("../database");
const crypto = require("crypto-js");

const router = express.Router();

//Registering the user
router.post('/register', (req, res) => {
  const {name, email, password, phone  } = req.body;
  const query = `insert into user (name, email, password, phone ) values (?, ?, ?, ?);`;
  const encryptedPassword = String(crypto.SHA256(password));
  database.pool.execute(query,[name, email, encryptedPassword, phone ], (error, result) => 
  {
      if (error) {
        res.send(utils.createErrorResult(error, "Invalid details"));
      } else {
        res.send(result);
      }
    }
  );
});

//Logging in the user
router.get("/login", (req, res) => {
  const { email, password } = req.body;
  const query = `select uid, name, email, password, phone, createdTimestamp from user where email = ? and password = ?;`;
  const encryptedPassword = String(crypto.SHA256(password));
  database.pool.execute(
    query,
    [email, encryptedPassword],
    (error, users) => {
      if (error) {
        res.send(utils.createErrorResult(error));
      } else {
        if (users.length == 0) {
          res.send(utils.createErrorResult(error, "User not found"));
        } else {
          if (users.length === 0) {
            res.send(
              utils.createErrorResult(error, "You have closed your account")
            );
          } else {
            res.send(utils.createSuccessfulResult(users[0]));
          }
        }
      }
    }
  );
});

//Deleting the user...
// router.delete("/delete", (req, res) => {
//   const { id } = req.params;
//   const query = `update user set isDeleted = 1 where id = 1;`;
//   database.pool.execute(query, [id], (error, result) => {
//     res.send(utils.createResult(error, result));
//   });
// });

module.exports = router;
