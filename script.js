const connection = require("./db/connection");
const inquirer = require("inquirer");

// -- Build a command-line application that at a minimum allows the user to:
function main(){
    inquirer.prompt({
        name: "main",
        type:"list",
        message: "What would you like to do?",
        choices: ["View All Employees", "View Employees by Department", "View Employees by Role", "Add an Employee", "Update an Employee","EXIT"]
    })
    .then(function(answer){
        if(answer.main === "View All Employees"){
            viewAll();
        }
        else if(answer.main === "View Employees by Department"){
            viewDepartment();
        }
        else if(answer.main === "View Employees by Role"){
            viewRole();
        }
        else if(answer.main === "Add an Employee"){
            addEmployee();
        }
        else if(answer.main === "Update an Employee"){
            updateEmployee();
        }
        else {
            connection.end();
        }
});
}
// -- Add departments, roles, employees
function addEmployee()


// -- View departments, roles, employees
function viewAll()
viewDepartment()
viewRole()
// -- Update employee roles
function updateEmployee()



// -- Bonus points if you're able to:

// -- Update employee managers
// updateManager()
// -- View employees by manager
// viewByManager()
// -- Delete departments, roles, and employees
// function deleteEmployee()
// -- View the total utilized budget of a department -- ie the combined salaries of all employees in that department
// totalSalaries()