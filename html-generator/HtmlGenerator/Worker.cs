using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using HtmlAgilityPack;
using HtmlGenerator.Data;
using Microsoft.Extensions.Configuration;

namespace HtmlGenerator
{
    internal sealed class Worker
    {
        private readonly IConfiguration _configuration;

        public Worker(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void Run()
        {
            Generator generator;
            Game game;

            using (var templateFile = new StreamReader(_configuration["html-game"]))
            {
                generator = new Generator(templateFile);
            }
            using (var dataFile = new StreamReader(_configuration["data"]))
            {
                game = Game.Load(dataFile);
            }
            
            var result = generator.Generate(game);

            var fileName = (_configuration["output"] + DateTime.Now.ToString("s") + ".html").Replace(':', '-');

            using (var outputFile = new StreamWriter(fileName))
            {
                result.Save(outputFile);
            }

            Console.Out.WriteLine($"Generated output file ${fileName}");
        }
    }
}
