let balance = 500.00;

class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    //calculate balance -use transaction objects
    let balance = 0;
    for (let calculate of this.transactions) {
      balance += calculate.value;
    }
    return balance;
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    //time of transaction
    if (!this.isAllowed()) return false;
    this.time = new Date();
    //add to account
    this.account.addTransaction(this);
    return true;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}
  //original class:
//   constructor(amount, account) {
//     this.amount = amount;
//     this.account = account;
//   }
//   commit() {
//     this.account.balance += this.amount;
//   }

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    //access to parent
    return (this.account.balance - this.amount >= 0);
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account();
console.log('Startijng Account Balance: ', myAccount.balance);

//transaction 1
t1 = new Withdrawal(50.25, myAccount);
console.log('Commit result:', t1.commit());
console.log('Account Balance: ', myAccount.balance);

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2);

t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log('Transaction 3:', t3);

console.log('Balance:', myAccount.balance);
