const path = require('path');
const fs = require('fs');
const solc = require('solc');


const inboxPath = path.resolve(__dirname, 'contracts', 'inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf-8');


let compileInput = {
    language: 'Solidity',
    sources: {
        'inbox.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}; 

module.exports = JSON.parse(solc.compile(JSON.stringify(compileInput))).contracts['inbox.sol'].Inbox;
// module.exports = solc.compile(JSON.stringify(compileInput)).contracts['inbox.sol'];
