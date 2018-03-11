'use strict';
const chalk = require('chalk');
const RaceHorse = require('./race-horse');

const horses = [
    new RaceHorse('Secretariat'),
    new RaceHorse('Seabiscuit'),
    new RaceHorse('Man o\' war'),
    new RaceHorse('Zenyatta'),
    new RaceHorse('Ruffian')
];

lead(horses);
progress(horses);
winner(horses);



function lead(horses) {
    let lead;
    horses.forEach(horse => {
        horse.on('progress', (progress, time, delay) => {
            if (!lead || (horse !== lead && progress > lead.progress)) {
                lead = horse;
                console.log(chalk.green(lead.name + ' takes the lead'));
            }
        });
    })
}

function progress(horses) {
    horses.forEach(horse => {
        horse.on('progress', (progress, time, delay) => {
            console.log(chalk.yellow(horse.name + ' at turn #' + progress));
        });
    })
}

function winner(horses) {
    let place = 1;;
    horses.forEach(horse => {
        horse.on('finish', time => {
            console.log(chalk.blue(horse.name + ' placed #' + place));
            place++;
        });
    })
}