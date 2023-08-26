const inquierer = require("inquierer");

const queries = require("./queries");

// what does the user want to do?
const options = [
  {
    type: "list",
    name: "option",
    message: "What would you like to do?",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Update an Employee Role",
    ],
  },
];
// options
// 1. view all departments
// 2. view all roles
// 3. view all employees 
// 4. add a department
// 5. add a role
// 6. add an employee
// 7. and update an employee role

// function to start the app
// include a switch statement to handle the different options
