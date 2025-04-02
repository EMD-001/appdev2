const EventEmitter = require('events');
const emitter = new EventEmitter();    


emitter.on('start', () => {
    console.log('Application Started!');
});

emitter.on("data", (data)=> {
    console.log("Data Received!")
    console.log("name: " + data.name)
    console.log("age: " + data.age)
})


emitter.on('error', (error) => {
    console.log('Error occurred:', error);
});

// Trigger events
emitter.emit('start');
emitter.emit('data', { name: 'John Doe', age: 25 });
emitter.emit('error', 'Failed to connect to database');
