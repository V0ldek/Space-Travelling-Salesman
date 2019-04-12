using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace HtmlGenerator.Data
{
    internal sealed class Planet
    {
        public int X { get; }
        public int Y { get; }
        public IReadOnlyDictionary<string, Item> Items { get; }

        public Planet(IDictionary<string, Item> available_items, int x, int y)
        {
            Items = new ReadOnlyDictionary<string, Item>(available_items);
            X = x;
            Y = y;
        }
    }
}
