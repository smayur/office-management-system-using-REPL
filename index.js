const fs = require('fs');
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Show all records from json file.
function printData() {
  fs.readFile('empData.json', 'utf8', (err, data) => {
    if (err) console.log(err);
    const users = JSON.parse(data); 
    users.forEach(user => {
      console.log(`ID: ${user.empId}
      Name: ${user.name}
      Email: ${user.email}
      Profile: ${user.profile}
      `);
    });
    showQuestions();
  });
}

const showQuestions = () => {
  let questions = '********************* \n1) Add Employee Details? \n2) Change Employee Details? \n3) Delete Employee Details? \n4) View all Records? \n5) Do you want to exit? \n\nPlease enter appropriate number:';
  rl.question(questions, (answer) => {
    switch (answer) {
      case "1":
        addData();
        break;
      case "2":
        updateData();
        break;
      case "3":
        deleteData();
        break;
      case "4":
        printData();
        break;
      case "5":
        console.log('************ Thank you for your valuable time! ************');
        rl.close();
        break;        
      default:
        console.log('\n************ Please enter correct option! ************');
        showQuestions();
    }
  }); 
}

showQuestions();