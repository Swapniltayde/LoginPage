-- Run these queries in your MySQL workbench or terminal

-- Step 1: Create the database
CREATE DATABASE IF NOT EXISTS logindb;

-- Step 2: Use the database
USE logindb;

-- NOTE: The "users" table will be automatically created by Spring Boot (Hibernate) 
-- when the application starts, because we set "spring.jpa.hibernate.ddl-auto=update" 
-- in the application.properties file. 

-- However, if you want to create it manually, use the query below:
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Step 3: View current Users in the table
SELECT * FROM users;

-- Stop here. The REST API will handle inserting and checking user data
