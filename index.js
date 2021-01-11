const fs = require('fs');
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Show all records from json file.
const printData = () => {
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

const nameValidation = (empName) => {
  let regexForText=/^[a-z A-Z]+$/;
  if (empName.match(regexForText)) {
    return true;
  }
  return false;
}

const emailValidation = (empEmail) => {
  let regexForEmail=/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (empEmail.match(regexForEmail)) {
    return true;
  }
  return false;
}

// Add data into json file
const addData = () => {
  fs.readFile('empData.json', 'utf8', (err, data) => {
    if (err) console.log(err);
    const users = JSON.parse(data); 
    const empDetails = {};
    rl.question("Enter employee id, (eg. emp999): ", (id) => {
      for (let i = 0; i < users.length; i++) {
        if (users[i].empId === id) {
          console.log("\n******* Id is already present, Please take a look into all records, Then choose Id... *******\n");
          showQuestions();
        }
        else {
          empDetails.empId = id;
        }
      }
      rl.question("Enter employee name: ", (name) => {
        if (nameValidation(name)) {
          empDetails.name = name; 
        } else {
          console.log("\n******* Please do not use any number or alph-numeric value... *******\n");
          showQuestions();
        }
        rl.question("Enter employee email, eg.(name@domain.com): ", (email) => {
          if (emailValidation(email)) {
            empDetails.email = email;
          } else {
            console.log("\n******* Please enter coorect mail id, eg.(name@domain.com)... *******\n");
            showQuestions();
          }
          rl.question("Enter employee profile: ", (profile) => {
            empDetails.profile = profile;
            users.push(empDetails)
            fs.writeFile("empData.json", JSON.stringify(users), err => { 
              if (err) throw err;  
              console.log("\n******* Employee details is added... *******\n"); 
              showQuestions();
            }); 
          });
        });
      });
    });
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