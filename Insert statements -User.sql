/*
-- Query: select * from User
LIMIT 0, 1000

-- Date: 2021-09-30 18:31
*/

CREATE TABLE User (
  email     VARCHAR(255)    NOT NULL ,
  password      VARCHAR(255)   NOT NULL,
  UserName     VARCHAR(255) PRIMARY KEY NOT NULL
);



INSERT INTO User (`email`,`password`,`UserName`) VALUES ('bs548@njit.edu','test2','Rocky');
INSERT INTO User (`email`,`password`,`UserName`) VALUES ('rocky1@gmail.com','test3','Rocky1');
INSERT INTO User (`email`,`password`,`UserName`) VALUES ('sai@gmail.com','test1','sairam');
