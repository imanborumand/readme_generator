// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');

// TODO: Create an array of questions for user input
const questions = [    
            
        // GITHUB USER NAME
    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username (Required)',
        validate: githubInput => {
            if (githubInput) {
            return true;
            } else {
            console.log('Please enter your GitHub username!');
            return false;
            }
    }
    },

        // QUESTIONS EMAIL
    {
        type: 'input',
        name: 'questionsEmail',
        message: 'Enter an email users can reach out to if they have questions. (Required)',
        validate: questionsEmailInput => {
            if (questionsEmailInput) {
            return true;
            } else {
            console.log('Please enter an email!');
            return false;
            }
    }
    },    
    
        // PROJECT TITLE
    {
    type: 'input',
    name: 'projectTitle',
    message: 'What is the title of your project? (Required)',
    validate: projectTitleInput => {
        if (projectTitleInput) {
        return true;
        } else {
        console.log('Please enter the title of your project!');
        return false;
        }
    }
    }
    ,

        // PROJECT DESCRIPTION - INPUT
    {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: descriptionInput => {
          if (descriptionInput) {
            return true;
          } else {
            console.log('You need to enter a project description!');
            return false;
          }
    }
    },

        // PROJECT DESCRIPTION - LINK TO LIVE SITE
    {
        type: 'confirm',
        name: 'confirmLiveLInk',
        message: 'Would you like to enter enter a link to the live site, if it exists?',
        default: false,
    },
    {
        type: 'input',
        name: 'liveSiteLink',
        message: 'Provide a full link (include "https://") to the live site.',
        when: ({ confirmLiveLInk }) => confirmLiveLInk,
        validate: liveSiteLink => {
            if (liveSiteLink) {
            return true;
            } else {
            console.log('You need to enter a link to the live site!');
            return false;
            }
    }
    },

    //     // PROJECT DESCRIPTION - LINK TO WALKTHROUGH
    {
        type: 'confirm',
        name: 'confirmDemoLInk',
        message: 'Would you like to embed a video or gif walkthrough or demo, if it exists?',
        default: false,
    },
    {
        type: 'input',
        name: 'siteDemoLink',
        message: 'Provide a link to embed the gif or video. Please note that you cannot embed YouTube videos in Github ReadMe files. Use a permalink to a gif or video previously uploaded to your or another Github Repository.',
        when: ({ confirmDemoLInk }) => confirmDemoLInk,
        validate: siteDemoLink => {
            if (siteDemoLink) {
            return true;
            } else {
            console.log('You need to enter a link to embed a video or gif walkthrough or demo!');
            return false;
            }
    }
    },  

        // LICENSE INFORMATION
    {
        type: 'list',
        name: 'licenseChoice',
        message: 'What license does your project have, if any? Go to choosealicense.com for more information on licenses.',
        choices: [
            'Apache 2.0', 
            'MIT', 
            'GPL 3.0', 
            'None'
        ],
    }
    ,

        // PROJECT INSTALLATION
    {
        type: 'input',
        name: 'installationInstructions',
        message: 'Provide instructions to install your project.',
        validate: installationInstructions => {
            if (installationInstructions) {
            return true;
            } else {
            console.log('You need to provide instructions to install your project!');
            return false;
            }
    }
    },  

        // PROJECT USAGE
    {
        type: 'input',
        name: 'usageInstructions',
        message: 'Provide instructions to use your project.',
        validate: usageInstructions => {
            if (usageInstructions) {
            return true;
            } else {
            console.log('You need to provide instructions to use your project!');
            return false;
            }
        }
    },  
        
        // PROJECT CONTRIBUTION INSTRUCTIONS
    {
        type: 'input',
        name: 'contributionInstructions',
        message: 'Provide instructions on how users can contribute to your project.',
        validate: contributionInstructions => {
            if (contributionInstructions) {
            return true;
            } else {
            console.log('You need to provide instructions on how users can contribute to your project!');
            return false;
            }
        }
    },  
    
        // PROJECT TESTS
    {
        type: 'input',
        name: 'testInstructions',
        message: 'Provide instructions on how users can test your project.',
        validate: testInstructions => {
            if (testInstructions) {
            return true;
            } else {
            console.log('You need to provide instructions on how users can test your project!');
            return false;
            }
        }
    }  
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) throw new Error(err);

        console.log("Readme Generated! Go to readme.md in the dist folder to see it!")
    })
};

// TODO: Create a function to initialize app
function init() {

    console.log(`
    =================
    Welcome to the ReadMe Generator! 
    Answer the following question prompts to feed information to the generator.
    After create your ReadMe you can see file in "dist" directory.
    Also, you can see the guide file from the "dist" directory
    =================
    `);

    inquirer.prompt(questions)
    .then(readmeData => {
        // console.log(readmeData);
        writeToFile("./dist/readme.md", generateMarkdown(readmeData))
    })
};

// Function call to initialize app
init();
