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
        type: "rawlist",
        message: "Who is this person reporting to?",
        choices: function(){
            var choiceArray = [];
            for (var i =0; i < results.length; i++){
                choiceArray.push(results[i].manager_id);
            }
            return choiceArray;
        }
    }
]).then(function(answer){
    connection.query(
        "INSERT INTO employee SET ?",
        {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.role_id,
            management_id: answer.management_id
        },
        function(err){
            if(err) throw err;
            console.log("Employee Added!")
        }
    )
})
}


// -- View departments, roles, employees
function viewAll(){
    connection.query("SELECT * FROM employee", function(err,results){
        if (err) throw err;
        console.table(results)
    })
    main();
}
function viewDepartment(){
    inquirer
    .prompt({
      name: "artist",
      type: "rawlist",
      message: "Which department would you like to search for?",
      choices: ["Accounting","Sales","Engineering","Management"]
    }).then( function(answer){
    connection.query(
        "SELECT employee.first_name, employee.last_name, employee.role_id, department.id, department.name FROM department INNER JOIN employee ON employee.role_id = department.id WHERE department.name = ?", 
        [answer.artist],function(err, results){
        if (err) throw err;
        console.table(results)
        main();
    })
    
})

}
function viewRole(){
    inquirer
    .prompt({
      name: "artist",
      type: "rawlist",
      message: "Which role would you like to search for?",
      choices: ["Accountant","Salesman","Engineer","Manager"]
    }).then( function(answer){
    connection.query("SELECT employee.first_name, employee.last_name, employee.role_id, role.id, role.title, role.salary FROM role INNER JOIN employee ON employee.role_id = role.id WHERE role.title=?", 
    [answer.artist], function(err, results){
        if (err) throw err;
        console.table(results)
        main();
    })
   
})
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
        var chosenPerson;
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

main();

// -- Bonus points if you're able to:

// -- Update employee managers
// updateManager()
// -- View employees by manager
// viewByManager()
// -- Delete departments, roles, and employees
// function deleteEmployee()
// -- View the total utilized budget of a department -- ie the combined salaries of all employees in that department
// totalSalaries()