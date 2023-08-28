DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- uses employee database -- 
USE employee_db;

-- creates department table
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(30) NOT NULL
);

-- creates roles table with title, salary, and department_id columns REFERENCES department id
CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id) 
  REFERENCES department(id)
  ON DELETE SET NULL
);

-- creates employee table with first_name, last_name, role_id, and manager_id columns REFERENCES roles id
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT DEFAULT NULL,
  FOREIGN KEY (role_id) REFERENCES roles(id)
  ON DELETE SET NULL 
);