namespace HtmlGenerator.Data
{
    internal sealed class Ship
    {
        public int CargoHoldSize { get; }
        public string Position { get; }

        public Ship(int cargo_hold_size, string position)
        {
            CargoHoldSize = cargo_hold_size;
            Position = position;
        }
    }
}
