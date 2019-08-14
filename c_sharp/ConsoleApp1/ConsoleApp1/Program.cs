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

            this.Number = accountNumberSeed.ToString();
            accountNumberSeed++;
        }

        // Properties are data elements and can have code that enforces validation or other rules.
        public string Number { get; }
        public string Owner { get; set; }
        public decimal Balance { get; }
        private static int accountNumberSeed = 20190001;

        // Methods are blocks f code that perform a single function.
        // Reading the names of each of the members should provide enough information for you or another developer to understand what the cleral amount, DateTime date, string note)
        public void MakeDeposit(decimal amount, DateTime date, string note)
        {
        }

        public void MakeWithdrawal(decimal amount, DateTime date, string note)
        {
        }

        public void Description()
        {
            Console.WriteLine($"Account {Number} was created for {Owner} with an initial balance of {Balance}.");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            var account = new BankAccount("fellini", 4000);
            account.Description();
            // Console.WriteLine($"Account {Number} was created for {account.Owner} with an initial balance of {account.Balance}.");

            var accountTwo = new BankAccount("Benigni", 8000);
            accountTwo.Description();
        }
    }
}
