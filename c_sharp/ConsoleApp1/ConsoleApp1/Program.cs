using System;
using System.Collections.Generic;

namespace ConsoleApp1
{
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
            //var ferrari = new Car("Ferrari", "F40", "Fellini");
            //var pagani = new Car("Pagani", "Zonda", "Homer Simpson");

            //ferrari.Description();
            //pagani.Description();

            var account = new BankAccount("groucho", 40000);
            account.Description();

            var accountTwo = new BankAccount("harpo", 80000);
            accountTwo.Description();

            account.MakeWithdrawal(12654, DateTime.Now, "Hookers and cocaine");
            account.MakeWithdrawal(50000, DateTime.Now, "Hookers and cocaine");

            try
            {
                var account3 = new BankAccount("gummo", -5000);
            }
            catch (InvalidOperationException e)
            {
                Console.WriteLine("Exception caught trying to overdraw");
                Console.WriteLine(e.ToString());
            }
        }
    }
}
