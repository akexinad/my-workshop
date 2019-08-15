using System;
using System.Collections.Generic;

namespace MicrosoftDocumentation
{

    class Program
    {
        static void Main(string[] args)
        {
            var fibonacciNumber = new List<int> { 1, 1 };


            while (fibonacciNumber.Count <= 20)
            {
                var previous = fibonacciNumber[fibonacciNumber.Count - 1];
                var previous2 = fibonacciNumber[fibonacciNumber.Count - 2];
                fibonacciNumber.Add(previous + previous2);
            }

            foreach (var num in fibonacciNumber)
            {
                Console.WriteLine(num);
            }

            
        }
    }
}
