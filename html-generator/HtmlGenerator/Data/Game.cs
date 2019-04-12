using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using Newtonsoft.Json;

namespace HtmlGenerator.Data
{
    internal sealed class Game
    {
        public int GameDuration { get; }
        public int InitialCredits { get; }
        public IEnumerable<string> Items { get; }
        public IReadOnlyDictionary<string, Planet> Planets { get; }
        public IReadOnlyDictionary<string, Ship> Ships { get; }

        public Game(
            int game_duration,
            int initial_credits,
            IEnumerable<string> items,
            IDictionary<string, Planet> planets,
            IDictionary<string, Ship> starships)
        {
            GameDuration = game_duration;
            InitialCredits = initial_credits;
            Items = items;
            Planets = new ReadOnlyDictionary<string, Planet>(planets);
            Ships = new ReadOnlyDictionary<string, Ship>(starships);
        }

        public static Game Load(TextReader inputStream)
        {
            var jsonString = inputStream.ReadToEnd();

            var game = JsonConvert.DeserializeObject<Game>(jsonString);

            game.Validate();

            return game;
        }

        internal void Validate()
        {
            if (GameDuration < 0)
            {
                ThrowInvalid(nameof(GameDuration), GameDuration.ToString());
            }

            if (InitialCredits < 0)
            {
                ThrowInvalid(nameof(InitialCredits), InitialCredits.ToString());
            }

            foreach (var planetKeyValuePair in Planets)
            {
                var planet = planetKeyValuePair.Value;

                if (planet.X < 0 || planet.X > 99)
                {
                    ThrowInvalid($"{nameof(planet)}-{planetKeyValuePair.Key}", planet.X.ToString());
                }

                if (planet.Y < 0 || planet.Y > 99)
                {
                    ThrowInvalid($"{nameof(planet)}-{planetKeyValuePair.Key}", planet.Y.ToString());
                }

                foreach (var planetItemKeyValuePair in planet.Items)
                {
                    var planetItem = planetItemKeyValuePair.Value;

                    if (!Items.Contains(planetItemKeyValuePair.Key))
                    {
                        ThrowInvalid(
                            $"{nameof(planet)}-{planetItemKeyValuePair.Key}-{nameof(planet.Items)}",
                            planetItemKeyValuePair.Key);
                    }

                    if (planetItem.Available < 0)
                    {
                        ThrowInvalid(
                            $"{nameof(planet)}-{planetItemKeyValuePair.Key}-{nameof(planet.Items)}-{planetItemKeyValuePair.Key}-{nameof(planetItem.Available)}",
                            planetItem.Available.ToString());
                    }
                    if (planetItem.BuyPrice < 0)
                    {
                        ThrowInvalid(
                            $"{nameof(planet)}-{planetItemKeyValuePair.Key}-{nameof(planet.Items)}-{planetItemKeyValuePair.Key}-{nameof(planetItem.Available)}",
                            planetItem.Available.ToString());
                    }
                    if (planetItem.SellPrice < 0)
                    {
                        ThrowInvalid(
                            $"{nameof(planet)}-{planetItemKeyValuePair.Key}-{nameof(planet.Items)}-{planetItemKeyValuePair.Key}-{nameof(planetItem.Available)}",
                            planetItem.Available.ToString());
                    }
                }
            }

            foreach (var shipKeyValuePair in Ships)
            {
                var ship = shipKeyValuePair.Value;

                if (ship.CargoHoldSize < 0)
                {
                    ThrowInvalid($"{nameof(ship)}-{shipKeyValuePair.Key}-{nameof(ship.CargoHoldSize)}", ship.CargoHoldSize.ToString());
                }

                if (!Planets.ContainsKey(ship.Position))
                {
                    ThrowInvalid($"{nameof(ship)}-{shipKeyValuePair.Key}-{nameof(ship.Position)}", ship.Position);
                }
            }
        }

        internal static void ThrowInvalid(string parameter, string value) => throw new InvalidDataException(
            $"Game data is invalid. Parameter ${parameter} cannot have value ${value}.");
    }
}