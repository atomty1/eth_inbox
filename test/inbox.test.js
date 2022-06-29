const assert = require('assert');
const ganache = require('ganache');
const Web3 = require('web3');
const {abi, evm} = require('../compile');
const mess = 'atomic';

const web3 = new Web3(ganache.provider());
let accounts, inbox;
beforeEach(async  ()=>{
  accounts=  await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(abi)
  .deploy({data: evm.bytecode.object, arguments: [mess]})
  .send({from: accounts[0], gas: '1000000'});
});
describe("Inbox contract", ()=>{
    it('deploys a contract', ()=>{
        assert.ok(inbox.options.address);
    });
    it('check constructor message', async ()=>{
       const message =  await inbox.methods.message().call();
       assert.equal(message, mess);
    });
    it('check setMessage function', async()=>{
        const newMessage = "good morning";
        await inbox.methods.setMessage(newMessage).send({from:accounts[0]});
        const message =  await inbox.methods.message().call();
        assert.equal(message, newMessage);
    })
})

