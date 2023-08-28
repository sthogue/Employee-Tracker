// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const init = require('./server');
require('dotenv').config();

// Connect to database
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    // MySQL Username
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

class ViewDepartments extends ViewAll {
  constructor(options) {
    super(options);
  }
  view() {
    db.query('SELECT * FROM department', function (err, results) {
      if (err) {
        console.log(err);
      }
      console.table(results);
      init.start();
    });
  }
}

class ViewRoles extends ViewAll {
  constructor(options) {
    super(options);
  }
  view() {
    db.query('SELECT * FROM roles', function (err, results) {
      if (err) {
        console.log(err);
      }
      console.table(results);
      init.start();
    });
  }
}

class ViewEmployees extends ViewAll {
  constructor(options) {
    super(options);
  }
  view() {
    db.query('SELECT * FROM employee', function (err, results) {
      if (err) {
        console.log(err);
      }
      console.table(results);
      init.start();
    });
  }
}

class addDepartment extends ViewAll {
  constructor(options) {
    super(options);
  }
  add() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'department',
        message: 'What is the name of the department you would like to add?',
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

class addRole extends ViewAll {
  constructor(options) {
    super(options);
  }
  // need to add query to get department list
  // need to add department list to choices

  add() {
    db.query('SELECT * FROM department', function (err, results) {
      if (err) {
        console.log(err);
        throw err;
      }
      const departmentList = results.map((department) => {
        return {
          name: department.dept_name,
          value: department.id,
        };
      });
    });

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
      db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${response.title}', '${response.salary}', '${response.department_id}')`, function (err, results) {
        if (err) {
          console.log(err);
        }
        console.log(`${response.title} role added!`);
        init.start();
      });
     });       
  }
}

class addEmployee extends ViewAll{
  constructor(options) {
    super(options);
  }
  // need to add query to get role list
  // need to add role list to choices
  // need to add query to get manager list
  // need to add manager list to choices
  add() {
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
        choices: rolelist
        },
      {
        type: 'list',
        name: 'manager_id',
        message: 'Choose the corresponding manager ID for this employee:',
        choices: managerlist
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
  }
}

class updateEmployeeRole extends ViewAll {
  constructor(options) {
    super(options);
  }
  // need to add query to get employee list
  // need to add employee list to choices
  // need to add query to get role list
  // need to add role list to choices
  update() {
    inquirer.prompt([
      {
        type: 'list',
        name: 'employee_id',
        message: 'Choose the corresponding employee ID for this employee:',
        choices: employeelist
        },
      {
        type: 'list',
        name: 'role_id',
        message: 'Choose the corresponding role ID for this employee:',
        choices: rolelist
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
  }
}

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