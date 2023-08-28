// calls on the inquirer package and the queries.js file
const inquirer = require("inquirer");
const queries = require("./queries");

// options for user to do in the app
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
        "End Application" ]
  }];

  // starts the application and prompts the user with the options
const start = () => {
  inquirer.prompt(options).then((response) => {
    // switch statement to handle the different options and call on the appropriate class and function
    switch (response.option) {
      case "View All Departments":
        const viewDepartments = new queries.ViewDepartments();
        viewDepartments.view();
        break;
      case "View All Roles":
        const viewRoles = new queries.ViewRoles();
        viewRoles.view();
        break;
      case "View All Employees":
        const viewEmployees = new queries.ViewEmployees();
        viewEmployees.view();
        break;
      case "Add a Department":
        const addDept = new queries.addDepartment();
        addDept.add();
        break;
      case "Add a Role":
        const addRole = new queries.addRole();
        addRole.add();
        break;
      case "Add an Employee":
        const addEmployee = new queries.addEmployee();
        addEmployee.add();
        break;
      case "Update an Employee Role":
        const updateRole = new queries.updateEmployeeRole();
        updateRole.update();
        break;
      case "End Application":
        const endApplication = new queries.endApplication();
        endApplication.close();
        break;
    };
  });
};

start();

//exports the start function out to the server.js file to the query.js file to be used after the user has completed the action they originally selected
exports.start = start;