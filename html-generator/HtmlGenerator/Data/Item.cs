namespace HtmlGenerator.Data
{
    internal sealed class Item
    {
        public int Available { get; }
        public int BuyPrice { get; }
        public int SellPrice { get; }

        public Item(int available, int buy_price, int sell_price)
        {
            Available = available;
            BuyPrice = buy_price;
            SellPrice = sell_price;
        }
    }
}
