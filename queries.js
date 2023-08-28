// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const init = require('./server');
require('dotenv').config();

// Connect to database
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    // MySQL Username that are in the .env file
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the ${process.env.DB_NAME} database.`)
);

// view all objects
class ViewAll {
  constructor(options) {
    this.options = options;
  }
  add() {}
  view (){}
  update () {} 
  end () {}
}
// class to view all departments 
class ViewDepartments extends ViewAll {
  constructor(options) {
    super(options);
  }
  // function to view all departments
  view() {
    const sql = `SELECT id AS ID, dept_name AS Department FROM department;`;
    db.query(sql, function (err, results) {
      if (err) {
        console.log(err);
      }
      console.table(results);
      init.start();
    });
  }
}

// class to view all roles
class ViewRoles extends ViewAll {
  constructor(options) {
    super(options);
  }
  // function to view all roles
  view() {
    const sql ='SELECT roles.id AS ID, roles.title AS Title , department.dept_name AS Department, roles.salary AS Salary FROM roles LEFT JOIN department ON department_id=department.id';
    db.query(sql , function (err, results) {
      if (err) {
        console.log(err);
      }
      console.table(results);
      init.start();
    });
  }
}

// class to view all employees
class ViewEmployees extends ViewAll {
  constructor(options) {
    super(options);
  }
  // function to view all employees
  view() {
    const sql = 'SELECT employee.id AS ID, employee.first_name AS First, employee.last_name AS Last, roles.title AS Title, roles.salary AS Salary, department.dept_name AS Department, CONCAT(Managers.first_name," ", managers.last_name) AS Managers FROM employee LEFT JOIN roles AS roles ON role_id=roles.id LEFT JOIN department AS department ON department_id=department.id LEFT JOIN employee AS Managers ON Managers.id=employee.manager_id '; 
    // query function to view all employees
    db.query(sql , function (err, results) {
      if (err) {
        console.log(err);
      }
      console.table(results);
      init.start();
    });
  }
}

// class to add a department
class addDepartment extends ViewAll {
  constructor(options) {
    super(options);
  }
  // function to add a department
  add() {
    // will first prompt what is the name of the department you would like to add
    inquirer.prompt([
      {
        type: 'input',
        name: 'department',
        message: 'What is the name of the department you would like to add?',
        // this makes sure that the user enters a valid department name essentially make sure its not null
        validate: (department) => {
          if (department) {
            return true;
          } else {
            console.log('Please enter a valid department name!');
            return false;
          }
        },
      },
    ]).then((response) => {
      // then take the reponse and insert it into the department table
      db.query(`INSERT INTO department (dept_name) VALUES ('${response.department}')`, function (err, results) {
        if (err) {
          console.log(err);
        }
        console.log('Department added!');
        init.start();
      });
    });
  }
}
// class to add role 
class addRole extends ViewAll {
  constructor(options) {
    super(options);
  }
  // add role function
  add() {
    // first query the database to get the department list
    db.query('SELECT * FROM department', (err, results) => {
      if (err) {
        console.log(err);
        throw err;
      }
      // this will grab the department by name but it will return the id when injecting into the database
      const departmentList = results.map((department) => ({
          name: department.dept_name,
          value: department.id,
      }));
      // inquirer prompt to ask what is the name of the role you would like to add, salary, and department
        inquirer.prompt([
          {
            type: 'input',
            name: 'title',
            message: 'What is the name of the role you would like to add?',
            validate: (title) => {
              if (title) {
                return true;
              } else {
                console.log('Please enter a valid role name!');
                return false;
              }
            },
          },
          {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of this role?',
            validate: (salary) => {
              if (salary) {
                return true;
              } else {
                console.log('Please enter a valid salary!');
                return false;
              }
            },
          },
          {
            type: 'list',
            name: 'department_id',
            message: 'Choose the corresponding department ID for this role:',
            choices: departmentList
            },
          
        ])
        
        .then((response) => {
          // this query will insert the response into the roles table
          db.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${response.title}', '${response.salary}', '${response.department_id}')`, function (err, results) {
            if (err) {
              console.log(err);
            }
            console.log(`${response.title} role added!`);
            init.start();
          });
        });       
      })
    }
  }

// add employee class
class addEmployee extends ViewAll{
  constructor(options) {
    super(options);
  }
  // add employee function
    add() {
      db.query('SELECT * FROM roles', (err, results) => {
        if (err) {
          console.log(err);
          throw err;
        }
        // this will grab all the roles by title to display but will return the id when injecting into the database
        const roleList = results.map((role) => ({
            name: role.title,
            value: role.id,
        }));
          db.query('SELECT * FROM employee', (err, results) => {
            if (err) {
              console.log(err);
              throw err;
            }
            // managerList will grab all employees first and last and will show first and last name but will return just their id when injecting into the database
            const managerList = results.map((employee) => ({
                name: employee.first_name + " " + employee.last_name,
                value: employee.id,
            }));
        inquirer.prompt([
          {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of the employee you would like to add?',
            validate: (first_name) => {
              if (first_name) {
                return true;
              } else {
                console.log('Please enter a valid first name!');
                return false;
              }
            },
          },
          {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the employee you would like to add?',
            validate: (last_name) => {
              if (last_name) {
                return true;
              } else {
                console.log('Please enter a valid last name!');
                return false;
              }
            },
          },
          {
            type: 'list',
            name: 'role_id',
            message: 'Choose the corresponding role ID for this employee:',
            choices: roleList
            },
          {
            type: 'list',
            name: 'manager_id',
            message: 'Choose the corresponding manager for this employee:',
            choices: managerList
            },
        ])
        .then((response) => {
          db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${response.first_name}', '${response.last_name}', '${response.role_id}', '${response.manager_id}')`, function (err, results) {
            if (err) {
              console.log(err);
            }
            console.log(`${response.first_name} ${response.last_name} added!`);
            init.start();
          });
        });       
      })
    })
  } 
}

class updateEmployeeRole extends ViewAll {
  constructor(options) {
    super(options);
  }
  update() {
    // query to get all employees
    db.query('SELECT * FROM employee', (err, results) => {
      if (err) {
        console.log(err);
        throw err;
      }
      // this is to get the employees by first and last name but will return the id when injecting into the database
      const employeeList = results.map((employee) => ({
          name: employee.first_name + " " + employee.last_name,
          value: employee.id,
      }));
      // query to get all roles
        db.query('SELECT * FROM roles', (err, results) => {
          if (err) {
            console.log(err);
            throw err;
          }
          // roleList will grab all roles by title and display the title only but will return the id when injecting into the database
          const roleList = results.map((role) => ({
              name: role.title,
              value: role.id,
          }));
        inquirer.prompt([
          {
            type: 'list',
            name: 'employee_id',
            message: 'Choose the corresponding employee for this employee:',
            choices: employeeList
            },
          {
            type: 'list',
            name: 'role_id',
            message: 'Choose the corresponding role ID for this employee:',
            choices: roleList
            },
        ])
        .then((response) => {
          db.query(`UPDATE employee SET role_id = '${response.role_id}' WHERE id = '${response.employee_id}'`, function (err, results) {
            if (err) {
              console.log(err);
            }
            console.log(`Employee role updated!`);
            init.start();
          });
        });       
      })
    })
  }
}

// Class and function to end the application
class endApplication extends ViewAll {
  constructor(options) {
    super(options);
  }
  close() {
    db.end(function(err) {
      // The connection is terminated now
    });
  }
}

// exports all the classes and functions
module.exports = {
  ViewAll,
  ViewDepartments,
  ViewRoles,
  ViewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  endApplication,
};