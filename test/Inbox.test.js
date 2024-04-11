const ganache = require('ganache-cli');
const { Web3 } = require('web3');
const assert = require('assert'); 
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');
// updated ganache and web3 imports added for convenience
/*some small test
class Car {
    park () {
        return 'stopped';
    }

    drive() {
        return 'vroom';
    }
}

let car;

beforeEach(() => {
    console.log(car = new Car());
});

describe('Car', () => {
    it('can park', () => {
        assert.equal(car.park(), 'stopped');
    });

    it('can drive', () => {
        assert.equal(car.drive(), 'vroom');
    });
});
*/

// contract test code will go here
let accounts;
let inbox;

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
        
    // Use one of those accounts to deploy
    // the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        .send({ from: accounts[0], gas: '1000000',  gasPrice: '1000000000' });
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi there!');
    })

    it('can change the message', async () => {
        await inbox.methods.setMessage("ditconmemay").send({from: accounts[0], gasPrice: '1000000000'});
        const message = await inbox.methods.message().call();
        assert.equal(message, 'ditconmemay');
        assert.ok(inbox.methods.message);
        //console.log(message);
    })
});