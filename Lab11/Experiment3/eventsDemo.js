const EventEmitter = require('events');

// Create emitter object
const eventEmitter = new EventEmitter();

// 1️⃣ Register listeners

// Listener 1
eventEmitter.on('greet', (name) => {
    console.log(`Hello, ${name}! 👋`);
});

// Listener 2 (same event → multiple listeners)
eventEmitter.on('greet', (name) => {
    console.log(`Welcome to Node.js, ${name}!`);
});

// Another event
eventEmitter.on('bye', (name) => {
    console.log(`Goodbye, ${name}! 👋`);
});

// Async event listener
eventEmitter.on('task', (taskName) => {
    setTimeout(() => {
        console.log(`Task "${taskName}" completed after delay ⏳`);
    }, 2000);
});


// 2️⃣ Emit events

console.log("Program started...\n");

// Emit greet event (passing data)
eventEmitter.emit('greet', 'Samika');

// Emit another event
eventEmitter.emit('bye', 'Samika');

// Emit async event
eventEmitter.emit('task', 'File Processing');

console.log("\nProgram ended (but async task still running...)");