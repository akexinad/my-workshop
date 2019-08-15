using System;
using System.Collections.Generic;
using System.Text;

namespace ConsoleApp1
{
    public class BankAccount
    {
        // Properties are data elements and can have code that enforces validation or other rules.
        public string Number { get; }
        public string Owner { get; set; }
        public decimal Balance
        {
            get
            {
                decimal balance = 0;
                foreach (var item in allTransactions)
                {
                    balance += item.Amount;
                }

                return balance;
            }
        }

        private static int accountNumberSeed = 20190001;
        private List<Transaction> allTransactions = new List<Transaction>();

        // A constructor is a member that has the same name as the class.
        public BankAccount(string name, decimal initialBalance)
        {
            this.Number = accountNumberSeed.ToString();
            accountNumberSeed++;

            this.Owner = name;

            MakeDeposit(initialBalance, DateTime.Now, "Initial Balance");
        }

        // Methods are blocks of code that perform a single function.
        // Reading the names of each of the members should provide enough information for you or another developer to understand what the class does.
        public void MakeDeposit(decimal amount, DateTime date, string note)
        {
            if (amount <= 0)
            {
                throw new ArgumentOutOfRangeException(nameof(amount), "Amount of deposit must be postive.");
            }

            var deposit = new Transaction(amount, date, note);

            allTransactions.Add(deposit);

            Console.WriteLine($"Successfully deposited ${ amount } from Account: {Number} for reason: { note }.\nYou now have ${Balance} remaining.");
        }


        public void MakeWithdrawal(decimal amount, DateTime date, string note)
        {
            if (amount <= 0)
            {
                throw new ArgumentOutOfRangeException(nameof(amount), "Amount of withdrawal must be positive.");
            }
            if (Balance - amount < 0)
            {
                throw new InvalidOperationException("You do not have sufficient funds to make this withdrawal.");
            }

            var withdrawal = new Transaction(-amount, date, note);

            allTransactions.Add(withdrawal);

            Console.WriteLine($"Hi {Owner}, you have Successfully withdrawn ${ amount } from Account: {Number} for reason: { note }.\nYou now have ${Balance} remaining.");
        }

        public void Description()
        {
            Console.WriteLine($"Account {Number} was created for {Owner} with an initial balance of {Balance}.");
        }
    }
}
