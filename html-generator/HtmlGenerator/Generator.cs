using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using HtmlAgilityPack;
using HtmlGenerator.Data;

namespace HtmlGenerator
{
    internal sealed class Generator
    {
        private readonly HtmlDocument _htmlDocument = new HtmlDocument();

        public Generator(TextReader inputStream)
        {
            _htmlDocument.Load(inputStream);
        }

        public HtmlDocument Generate(Game game)
        {
            GenerateHeader(game);
            GeneratePlanetList(game);
            GenerateShipList(game);
            GeneratePlanetModals(game);
            GenearteShipModals(game);

            return _htmlDocument;
        }


        private void GenerateHeader(Game game)
        {
            var credits = _htmlDocument.GetElementbyId("game-summary-score");
            var time = _htmlDocument.GetElementbyId("game-summary-time");

            credits.InnerHtml = $"Credits: {game.InitialCredits} &#x20A1";

            var timeSpan = TimeSpan.FromSeconds(game.GameDuration);
            time.InnerHtml = $"Time left: {timeSpan.Minutes:00}:{timeSpan.Seconds:00}";
        }

        private void GeneratePlanetList(Game game)
        {
            var list = _htmlDocument.GetElementbyId("planet-list");

            foreach (var planetKeyValuePair in game.Planets)
            {
                var planetName = planetKeyValuePair.Key;
                var planet = planetKeyValuePair.Value;

                var listItem = _htmlDocument.CreateElement("li");
                listItem.AddClass("card planet-card modal-trigger");
                listItem.SetAttributeValue("data-target", $"#{planetName.Replace("\'", "")}-planet-modal");

                var image = _htmlDocument.CreateElement("img");
                image.AddClass("planet-icon");
                image.SetAttributeValue("src", "./img/planet.svg");
                image.SetAttributeValue("alt", "planet");

                var name = _htmlDocument.CreateElement("p");
                name.AddClass("planet-name text-cyan");
                name.InnerHtml = planetName;

                var position = _htmlDocument.CreateElement("p");
                position.AddClass("planet-coordinates");
                position.InnerHtml = $"{planet.X:000}, {planet.Y:000}";

                listItem.AppendChild(image);
                listItem.AppendChild(name);
                listItem.AppendChild(position);

                list.AppendChild(listItem);
            }
        }

        private void GenerateShipList(Game game)
        {
            var list = _htmlDocument.GetElementbyId("ship-list");

            foreach (var shipKeyValuePair in game.Ships)
            {
                var shipName = shipKeyValuePair.Key;
                var ship = shipKeyValuePair.Value;

                var listItem = _htmlDocument.CreateElement("li");
                listItem.AddClass("card ship-card modal-trigger");
                listItem.SetAttributeValue("data-target", $"#{shipName.Replace("\'", "")}-ship-modal");

                var image = _htmlDocument.CreateElement("img");
                image.AddClass("ship-icon");
                image.SetAttributeValue("src", "./img/ship.svg");
                image.SetAttributeValue("alt", "ship");

                var name = _htmlDocument.CreateElement("p");
                name.AddClass("ship-name text-cyan");
                name.InnerHtml = shipName;

                var positionDiv = _htmlDocument.CreateElement("div");
                positionDiv.AddClass("ship-position");

                var planetName = _htmlDocument.CreateElement("p");
                planetName.AddClass("text-cyan");
                planetName.InnerHtml = $"{ship.Position}";

                var planet = game.Planets[ship.Position];

                var coordinates = _htmlDocument.CreateElement("p");
                coordinates.InnerHtml = $"{planet.X:000}, {planet.Y:000}";

                positionDiv.AppendChild(planetName);
                positionDiv.AppendChild(coordinates);

                listItem.AppendChild(image);
                listItem.AppendChild(name);
                listItem.AppendChild(positionDiv);

                list.AppendChild(listItem);
            }
        }

        private void GeneratePlanetModals(Game game)
        {
            var gameView = _htmlDocument.GetElementbyId("game-view");

            foreach (var planetKeyValuePair in game.Planets)
            {
                var planetName = planetKeyValuePair.Key;
                var planet = planetKeyValuePair.Value;

                var modalDiv = _htmlDocument.CreateElement("div");
                modalDiv.Id = $"{planetName}-planet-modal";
                modalDiv.AddClass("modal");
                modalDiv.SetAttributeValue("hidden", "");

                var planetScreen = _htmlDocument.CreateElement("article");
                planetScreen.AddClass("planet-screen modal-content");

                var image = _htmlDocument.CreateElement("img");
                image.AddClass("planet-icon");
                image.SetAttributeValue("src", "./img/planet.svg");
                image.SetAttributeValue("alt", "planet");

                var header = _htmlDocument.CreateElement("h2");
                header.AddClass("planet-name text-cyan");
                header.InnerHtml = planetName;
                
                var position = _htmlDocument.CreateElement("p");
                position.AddClass("planet-coordinates");
                position.InnerHtml = $"{planet.X:000}, {planet.Y:000}";

                var goodsHeader = _htmlDocument.CreateElement("h3");
                goodsHeader.AddClass("planet-goods-title text-cyan");
                goodsHeader.InnerHtml = "Goods";

                var shipsHeader = _htmlDocument.CreateElement("h3");
                shipsHeader.AddClass("planet-ships-title text-cyan");
                shipsHeader.InnerHtml = "Stardock";

                var goodsSection = _htmlDocument.CreateElement("section");
                goodsSection.AddClass("planet-goods");

                var goodsTable = _htmlDocument.CreateElement("table");
                var goodsTHead = _htmlDocument.CreateElement("thead");
                var goodsTHeadTRow = _htmlDocument.CreateElement("tr");

                var goodsTHeadName = _htmlDocument.CreateElement("th");
                goodsTHeadName.InnerHtml = "Name";
                var goodsTHeadUnits = _htmlDocument.CreateElement("th");
                goodsTHeadUnits.InnerHtml = "Units";
                var goodsTHeadBuyPrice = _htmlDocument.CreateElement("th");
                goodsTHeadBuyPrice.InnerHtml = "Buy price";
                var goodsTHeadSellPrice = _htmlDocument.CreateElement("th");
                goodsTHeadSellPrice.InnerHtml = "Sell price";

                goodsTHeadTRow.AppendChild(goodsTHeadName);
                goodsTHeadTRow.AppendChild(goodsTHeadUnits);
                goodsTHeadTRow.AppendChild(goodsTHeadBuyPrice);
                goodsTHeadTRow.AppendChild(goodsTHeadSellPrice);

                goodsTHead.AppendChild(goodsTHeadTRow);

                goodsTable.AppendChild(goodsTHead);

                var goodsTBody = _htmlDocument.CreateElement("tbody");

                foreach (var itemKeyValuePair in planet.Items)
                {
                    var itemName = itemKeyValuePair.Key;
                    var item = itemKeyValuePair.Value;

                    var row = _htmlDocument.CreateElement("tr");
                    var name = _htmlDocument.CreateElement("td");
                    name.InnerHtml = itemName;
                    var units = _htmlDocument.CreateElement("td");
                    units.InnerHtml = item.Available.ToString();
                    var buyPrice = _htmlDocument.CreateElement("td");
                    buyPrice.InnerHtml = item.BuyPrice.ToString();
                    var sellPrice = _htmlDocument.CreateElement("td");
                    sellPrice.InnerHtml = item.SellPrice.ToString();

                    row.AppendChild(name);
                    row.AppendChild(units);
                    row.AppendChild(buyPrice);
                    row.AppendChild(sellPrice);

                    goodsTBody.AppendChild(row);
                }

                goodsTable.AppendChild(goodsTBody);

                goodsSection.AppendChild(goodsTable);

                var shipList = _htmlDocument.CreateElement("ul");
                shipList.AddClass("planet-ships");

                foreach (var shipKeyValuePair in game.Ships.Where(kvp => kvp.Value.Position == planetName))
                {
                    var shipName = shipKeyValuePair.Key;
                    var ship = shipKeyValuePair.Value;

                    var listItem = _htmlDocument.CreateElement("li");
                    listItem.AddClass("card ship-card modal-trigger");
                    listItem.SetAttributeValue("data-target", $"{shipName.Replace("\'", "")}-ship-modal");

                    var shipImage = _htmlDocument.CreateElement("img");
                    shipImage.AddClass("ship-icon");
                    shipImage.SetAttributeValue("src", "./img/ship.svg");
                    shipImage.SetAttributeValue("alt", "ship");

                    var name = _htmlDocument.CreateElement("p");
                    name.AddClass("ship-name text-cyan");
                    name.InnerHtml = shipName;

                    listItem.AppendChild(shipImage);
                    listItem.AppendChild(name);

                    shipList.AppendChild(listItem);
                }

                planetScreen.AppendChild(image);
                planetScreen.AppendChild(header);
                planetScreen.AppendChild(position);
                planetScreen.AppendChild(goodsHeader);
                planetScreen.AppendChild(shipsHeader);
                planetScreen.AppendChild(goodsSection);
                planetScreen.AppendChild(shipList);

                modalDiv.AppendChild(planetScreen);

                gameView.ParentNode.InsertAfter(modalDiv, gameView);
            }
        }

        private void GenearteShipModals(Game game)
        {
            //throw new NotImplementedException();
        }
    }
}