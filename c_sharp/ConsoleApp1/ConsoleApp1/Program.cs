using System;

namespace ConsoleApp1
{
    public class BankAccount
    {
        // A constructor is a member that has the same name as the class.
        public BankAccount(string name, decimal initialBalance)
        {
            this.Owner = name;
            this.Balance = initialBalance;
        }

        // Properties are data elements and can have code that enforces validation or other rules.
        public string Number { get; }
        public string Owner { get; set; }
        public decimal Balance { get; }


        // Methods are blocks f code that perform a single function.
        // Reading the names of each of the members should provide enough information for you or another developer to understand what the cleral amount, DateTime date, string note)
        public void MakeDeposit(decimal amount, DateTime date, string note)
        {
        }

        public void MakeWithdrawal(decimal amount, DateTime date, string note)
        {
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            var account = new BankAccount("fellini", 4000);
            Console.WriteLine($"Account {account.Number} was created for {account.Owner} with an initial balance of {account.Balance}.");
        }
    }
}
