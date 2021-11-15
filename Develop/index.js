// GIVEN a command-line application that accepts user input
// WHEN I am prompted for information about my application repository
// THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
// WHEN I enter my project title
// THEN this is displayed as the title of the README
// WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
// THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
// WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
// WHEN I enter my GitHub username
// THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
// WHEN I enter my email address
// THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
// WHEN I click on the links in the Table of Contents
// THEN I am taken to the corresponding section of the README

// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Describe your project.'
    },
    {
        type: 'input',
        name: 'installation',
        message: 'What are your instructions regarding installation?'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'How will this project be used?'
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose your license.',
        choices: ['MIT','Apache']
    },
    {
        type: 'input',
        name: 'contributions',
        message: 'What are the guidelines for contributors?'
    },
    {
        type: 'input',
        name: 'testInstructions',
        message: 'What are your instructions for testing?'
    },
    {
        type: 'input',
        name: 'gitHub',
        message: 'What is your GitHub username? (Required)',
        validate: github => {
            if (github) {
                return true;
            }
            else {
                console.log('Please enter your GitHub username.')
                return false
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your Email Address? (Required)',
        validate: email => {
            if (email) {
                return true;
            }
            else {
                console.log('Please enter your email address.')
                return false
            }
        }
    }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    const fileData = generateMarkdown(data)
    fs.writeFile(fileName, fileData, (err) => {
        if (err) { console.log(err) }
    })
}

// TODO: Create a function to initialize app
function init() {
    inquirer
        .prompt(questions)
        .then((answers) => writeToFile('ProjectReadMe.md', answers))
        .catch((error) => console.log(error))
}

// Function call to initialize app
init();
