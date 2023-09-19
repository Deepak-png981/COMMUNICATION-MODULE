const Mocha = require('mocha');
const mocha = new Mocha();
const chai = require('chai');
const chaiHttp = require('chai-http');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server'); // Replace with the path to your Express app
const mongoose = require('mongoose'); // Import mongoose
const CustomReporter = require('./customeReporter'); // Replace with the path to your custom reporter file

// Configure Chai and chai-http
chai.use(chaiHttp);
const expect = chai.expect;

// Create a MongoMemoryServer instance
let mongod;

// Mocha hooks for database setup and teardown
before(async () => {
    mongod = new MongoMemoryServer();

    // Start the server and get its URI
    await mongod.start();
    const uri = await mongod.getUri();

    // Disconnect from the existing MongoDB connection, if it exists
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }

    // Connect to the MongoMemoryServer
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

after(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

// Initialize an object to store execution times
const executionTimes = {
    signup: [],
    login: [],
};

const numRuns = 10;

// Test suite for user authentication
describe('User Authentication', () => {
    // Define the number of times you want to run the tests

    // Loop to run the tests multiple times
    for (let i = 0; i < numRuns; i++) {
        // Test case for user signup
        it(`should sign up a new user - Run ${i + 1}`, async () => {
            const newUser = {
                username: `testuser${i}`,
                password: 'testpassword',
                email: `test${i}@example.com`,
                name: `Test User ${i}`,
            };

            // Measure the start time
            const startTime = performance.now();

            const res = await chai
                .request(app)
                .post('/auth/signup')
                .send(newUser);

            // Measure the end time
            const endTime = performance.now();

            // Calculate the execution time and store it
            const executionTime = endTime - startTime;
            executionTimes.signup.push(executionTime);

            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('token');
        });

        // Test case for user login
        it(`should log in an existing user - Run ${i + 1}`, async () => {
            const credentials = {
                username: `testuser${i}`,
                password: 'testpassword',
            };

            // Measure the start time
            const startTime = performance.now();

            const res = await chai
                .request(app)
                .post('/auth/login')
                .send(credentials);

            // Measure the end time
            const endTime = performance.now();

            // Calculate the execution time and store it
            const executionTime = endTime - startTime;
            executionTimes.login.push(executionTime);

            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('token');
        });
    }
});

// Set the custom reporter to log execution times
mocha.reporter(CustomReporter);

// Calculate and display average, maximum, and minimum execution times for each test case
after(() => {
    for (const testCase in executionTimes) {
        const executionTimesForTest = executionTimes[testCase];
        const totalExecutionTime = executionTimesForTest.reduce((sum, time) => sum + time, 0);
        const averageExecutionTime = totalExecutionTime / numRuns;
        const maxExecutionTime = Math.max(...executionTimesForTest);
        const minExecutionTime = Math.min(...executionTimesForTest);

        console.log(`Test Case: ${testCase}`);
        console.log(`  Average Execution Time: ${averageExecutionTime.toFixed(2)} ms`);
        console.log(`  Maximum Execution Time: ${maxExecutionTime.toFixed(2)} ms`);
        console.log(`  Minimum Execution Time: ${minExecutionTime.toFixed(2)} ms`);
    }
});
