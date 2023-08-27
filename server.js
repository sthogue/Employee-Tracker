const inquirer = require("inquirer");
const queries = require("./queries");

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

const start = () => {
  inquirer.prompt(options).then((response) => {
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
// function to start the app
// include a switch statement to handle the different options

exports.start = start;