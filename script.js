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
function addEmployee(){
    inquirer.prompt([{
        name:"first_name",
        type:"input",
        message:"What is the new first name?"
    },
    {
        name:"last_name",
        type: "input",
        message: "What is the new last name?"
    },
    {
        name:"role_id",
        type: "list",
        message:"What department do you want to add to?",
        choices:["Management","Accounting","Engineering","Sales"]
    },
    {
        name: "management_id",
        type: "list",
        message: "Who is this person reporting to?",
        choices:["someone","N/A"]
    }
])
}


// -- View departments, roles, employees
function viewAll(){

}
function viewDepartment(){

}
function viewRole(){

}
// -- Update employee roles
function updateEmployee(){
    connection.query("SELECT * FROM employee", function(err, results){
        if (err) throw err;
    
    inquirer.prompt([
        {
            name:"choice",
            type: "rawlist",
            choices: function(){
                var choiceArray = [];
                for (var i =0; i<results.length; i++){
                    choiceArray.push(results[i].first_name)
                }
                return choiceArray;
            },
            message: "Which person would you like to update?"
        },
        {
            name: "job",
            type:"input",
            message:"What is the position they are going to be in?"
        }
    ]).then(function(answer){
        const chosenPerson;
        for(var i = 0; i < results.length; i++){
            if(results[i].first_name === answer.choice){
                chosenPerson= results[i]
            }
        }
        if (chosenPerson.job != answer.job){
            connection.query(
                "UPDATE role SET ? WHERE ?",
                [
                    {
                        role: answer.role
                    },
                    {
                        id: chosenPerson.id
                    }
                ],
                function(error){
                    if(error) throw err;
                    console.log("Employee updated");
                    main();
                }
            )
        }
        else {
            console.log("Person has the same job. Try again!")
            main();
        }
        
    })
    })

    
}



// -- Bonus points if you're able to:

// -- Update employee managers
// updateManager()
// -- View employees by manager
// viewByManager()
// -- Delete departments, roles, and employees
// function deleteEmployee()
// -- View the total utilized budget of a department -- ie the combined salaries of all employees in that department
// totalSalaries()