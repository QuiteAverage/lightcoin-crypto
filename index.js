let balance = 500.00;

class Account {
  constructor(username){
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let i = 0; i < this.transactions.length; i++) {
      balance += this.transactions[i].value;
    }
    return balance;
  }

  addTransactions(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if(this.isAllowed()) {
      this.account.addTransactions(this);
      return true
    }
    return false
  }
}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount
  }

  isAllowed() {
    if (this.account.balance - this.amount >= 0) {
      return true
    }
  }


}

class Deposit extends Transaction {

  get value() {
    return this.amount
  }

  isAllowed() {
    return true
  }

}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol")

// Should Fail. false balance 0
t1 = new Withdrawal(50.25, myAccount);
console.log(t1.commit());
console.log('Account Balance', myAccount.balance);

// Should Pass. true balance 120
t2 = new Deposit(120.00, myAccount);
console.log(t2.commit());
console.log('Account Balance', myAccount.balance);

// Should Pass. true balance 110.01
t3 = new Withdrawal(9.99, myAccount);
console.log(t3.commit());
console.log('Account Balance', myAccount.balance);

// Should Fail. false balance 110.01
t4 = new Withdrawal(110.02, myAccount);
console.log(t4.commit());
console.log('Account Balance', myAccount.balance);

console.log('Transactions:', myAccount.transactions);


