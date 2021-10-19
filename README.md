# NodeJs-REST-API-
NodeJs, REST API, JWT Authentication, MySQL, POSTMAN collection

## File configuration
* **clone the file**
* **npm install**

## Database Configuration
* **create database node;**



* CREATE TABLE customers(
  id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  email varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  password varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (id),
  ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



* CREATE TABLE category(
  category_id int(11) NOT NULL AUTO_INCREMENT,
  category_name varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  category_description varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  category_count varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  category_status varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (category_id),
  ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


**Or use the node.sql file and import into 'node' database**

![alt text](https://github.com/parththeepan/NodeJs-REST-API-/blob/master/document/postman.png?raw=true)

## Register API
User can add new customers with validation.

## Login API
using the username and password customer can login with validation.

## Authorized API
It contains all authorized API.

* **Get User:**
It will get customer's details from Login api.

* **Add Category:** 
customer can add data into category table with validation.

* **Get Category:**
customer can get category datas from table

* **Get category_id:**
customer can get a particular data from table

* **Update Category:**
customer can update category details.

* **Delete category:**
customer can delete the category details.
