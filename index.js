const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
    return inquirer.prompt([ 
    {
        type: 'input',
        name: 'title',
        message: 'Enter the title of your project.'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Describe what your project is about.'
    },
    {
        type: 'input',
        name: 'contents',
        message: 'Create a table of contents for your project. A template is provided, leave this seciton blank if you do not want to modify.'
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Give instruction on how to install your project.'
    }, 
    {
        type: 'input',
        name: 'usage',
        message: 'What is your project used for?'
    },
    {
        type: 'checkbox',
        name: 'license',
        choices: [
            'GNU_AGPLv3',
            'GNU_GPLv3',
            'Mozilla',
            'Apache',
            'MIT',
            'Boost',
            'The_unlicense'],
        message: 'Choose a license for your project (only pick one).' 
    },
    {
        type: 'input',
        name: 'contributors',
        message: 'List the contributors in your project.'
    },
    {
        type: 'input',
        name: 'tests',
        message: 'What tests were run to insure the functionality of your project?'
    },
    {
        type: 'input',
        name: 'FAQ',
        message: 'What are some frequently asked questions and include the answers.'  
    },
    {
        type: 'input',
        name: 'github',
        message: 'Please enter your GitHub username.'  
    },
    {
        type: 'input',
        name: 'email',
        message: 'Please enter your email.'  
    }
]);
};

const generateREADME = (resp) =>
`
# ${resp.title}

## Description
![License](https://img.shields.io/badge/license-${resp.license}-blue.svg)
\n${resp.description}

## Table of content
${resp.contents} \n
* [Title](#title)
* [Description](#description)
* [Contents](#contents)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributors](#contributors)
* [Tests](#tests)
* [Q&A](#QandA)

## Installation
${resp.installation}

## Usage
${resp.usage}

## License
${resp.license}

## Contributors
${resp.contributors}
\nFor more information about Markdown License badges, check out this open source project by lukas-h [here](https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba).

## Tests
${resp.tests}

## FAQ 
${resp.FAQ}
Check out my [GitHub profile](https://github.com/${resp.github}) for more projects and information. 
\nIf you have additional questions, please email me at ${resp.email}.
`;

promptUser()
.then((resp) => writeFileAsync(`README.md`, generateREADME(resp)))
.then(() => console.log('Successfully created README.md'))
.catch((err) => console.error(err))