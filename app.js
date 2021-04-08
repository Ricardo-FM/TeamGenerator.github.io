const inquirer = require('inquirer');

const fs = require('fs');

const team = [];

let manager;

let title;





function manager() {
    inquirer.prompt([

        {   
            type: "input",
            message: "Project name?",
            name: "title"
        },

        {   
            type: "input",
            message: "Manager name?",
            name: "mName"
        },
        {   
            type: "input",
            message: "Manager ID?",
            name: "mID"
        },
        {   
            type: "input",
            message: "Manager email?",
            name: "mEmail"
        } ] ).then(userInput => {
            manager = new Manager(userInput.mName, userInput.maID, userInput.mEmail);
            title = userInput.title;
            employee();
        });
}


function employee() {


    inquirer.prompt([


        {
            type: "list",
            message: "Employee's role?",
            name: "eRole",
            choices: ["intern", "engineer"]
        },
        {
            type: "input",
            message: "Employee's name?",
            name: "eName"
        },
        {
            type: "input",
            message: "Employee's id?",
            name: "eId"
        },
        {
            type: "input",
            message: "Employee's email?",
            name: "eEmail"
        },
        {
            type: "input",
            message: "Employee's Github?",
            name: "github",
        },
        {
            type: "input",
            message: "Employee's education?",
            name: "school",
        },
        {
            type: "confirm",
            name: "newEmployee",
            message: "Would you like to add another team member?" // if yes, go back again. If no, renderHTML
        }

    
    ]).then(inputU => {

        if (inputU.eRole === "Intern") {
            team.push(new Intern(inputU.eName, inputU.eId, inputU.eEmail, inputU.school, inputU.github));
        } 
        if (inputU.eRole === "Engineer") {
            team.push(new Engineer(inputU.eName, inputU.eId, inputU.eEmail, inputU.school, inputU.github));
        }




            var card = fs.readFileSync('./templates/Manager.html');
            card = card.replace('{{name}}', manager.getName());
            card = card.replace('{{role}}', manager.getRole());
            card = card.replace('{{id}}', manager.getId());
            card = card.replace('{{email}}', manager.getEmail());
            card = card.replace('{{officeNumber}}', manager.getOfficeNumber());




            main = main.replace('{{cards}}', cards);


            fs.writeFileSync('./output/team.html', main);

    }
    );


}






manager();
