require('dotenv').config();
const keys = require('./config/keys');

console.log("--- checking config ---");
console.log("GITHUB_CLIENT_ID present:", !!process.env.GITHUB_CLIENT_ID);
console.log("GITHUB_CLIENT_SECRET present:", !!process.env.GITHUB_CLIENT_SECRET);
console.log("keys.githubClientID:", keys.githubClientID ? "Set (hidden)" : "UNDEFINED");
console.log("keys.githubClientSecret:", keys.githubClientSecret ? "Set (hidden)" : "UNDEFINED");

if (!process.env.GITHUB_CLIENT_ID) {
    console.error("\nERROR: GITHUB_CLIENT_ID is missing from .env file!");
}
if (!process.env.GITHUB_CLIENT_SECRET) {
    console.error("\nERROR: GITHUB_CLIENT_SECRET is missing from .env file!");
}
