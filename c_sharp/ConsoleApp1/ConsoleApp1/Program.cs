using System;
using System.Collections.Generic;

namespace ConsoleApp1
{
    public class BankAccount
    {
        // Properties are data elements and can have code that enforces validation or other rules.
        public string Number { get; }
        public string Owner { get; set; }
        public decimal Balance { get; }
        private static int accountNumberSeed = 20190001;
        private List<Transaction> allTransactions = new List<Transaction>();

        // A constructor is a member that has the same name as the class.
        public BankAccount(string name, decimal initialBalance)
        {
            this.Owner = name;
            this.Balance = initialBalance;

            this.Number = accountNumberSeed.ToString();
            accountNumberSeed++;
        }

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

















    public class Car
    {
        public Car(string make, string model, string owner)
        {
            this.Make = make;
            this.Model = model;
            this.Owner = owner;
        }

        public string Make { get; set; }
        public string Model { get; set; }
        public string Owner { get; set; }

        public void Wheels()
        {
            Console.WriteLine("4 wheels");
        }

        public void MakeAndModel()
        {
            Console.WriteLine($"{Make} {Model}.");
        }

        public void Description()
        {
            Console.WriteLine($"This is a {Make} {Model} belonging to {Owner}.");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            // var account = new BankAccount("fellini", 4000);
            // account.Description();

            // var accountTwo = new BankAccount("Benigni", 8000);
            // accountTwo.Description();

            var ferrari = new Car("Ferrari", "F40", "Fellini");
            var pagani = new Car("Pagani", "Zonda", "Homer Simpson");

            ferrari.Description();
            pagani.Description();

        }
    }
}
