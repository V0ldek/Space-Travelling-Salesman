using System;
using System.IO;
using Microsoft.Extensions.Configuration;

namespace HtmlGenerator
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            var config = new ConfigurationBuilder().AddJsonFile("appsettings.json", false, false).Build();
            var worker = new Worker(config);

            worker.Run();
        }
    }
}