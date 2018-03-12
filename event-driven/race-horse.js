const EventEmitter = require('events');

// define a an event emitter sub-class
class RaceHorse extends EventEmitter {

    constructor(name) {
        super();
        this.name = name;

        const start = Date.now();
        this.progress = 0;
        
        const run = () => {
            const delay = Math.round(Math.random() * 250) + 500;
            setTimeout(() => {
                const time = Date.now() - start;
                this.progress++;

                this.emit('progress', this.progress, time, delay);
                
                if (this.progress === 10) {
                    this.emit('finish', time);
                } else {
                    run();
                }
            }, delay);
        }

        run();
    }
}

module.exports = RaceHorse;