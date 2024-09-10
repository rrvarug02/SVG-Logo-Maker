const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Circle, Square } = require('./lib/shapes');

const prompts = [
    {
        type: 'input',
        name: 'text',
        message: 'Enter text for your logo'
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Enter text color'
    },
    {
        type: 'list',
        name: 'shape',
        message: 'Select a shape',
        choices: ['Circle', 'Triangle', 'Square']
    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter shape color'
    }
];

inquirer.prompt(prompts).then(response => {
    let shape;

    switch (response.shape) {
        case 'Square':
            shape = new Square();
            break;
        case 'Circle':
            shape = new Circle();
            break;
        case 'Triangle':
            shape = new Triangle();
            break;
    }

    shape.setColor(response.shapeColor);

    const svgContent = `
    <svg width="500" height="300" xmlns="http://www.w3.org/2000/svg">
    ${shape.render()}
    <text x="150" y="115" font-size="50" text-anchor="middle" fill="${response.textColor}">${response.text}</text>
    </svg>
    `;

    fs.writeFile(`./examples/${response.text}.svg`, svgContent, (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('Logo generated successfully!');
        }
    });

    console.log('done');
}).catch(error => {
    console.error('Error:', error);
});