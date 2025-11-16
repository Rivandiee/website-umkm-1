import MenuCard from "./MenuCard";

const dummyMenu = [
  {
    name: "Nasi Goreng Spesial",
    price: "18.000",
    img: "https://images.unsplash.com/photo-1604909052743-9420523f68f1?q=80&w=1000"
  },
  {
    name: "Ayam Geprek Sambal",
    price: "20.000",
    img: "https://images.unsplash.com/photo-1605470209811-5314e9bd9d4b?q=80&w=1000"
  },
  {
    name: "Es Teh Manis",
    price: "5.000",
    img: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=1000"
  },
];

export default function MenuList() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {dummyMenu.map((item) => (
        <MenuCard
          key={item.name}
          name={item.name}
          price={item.price}
          img={item.img}
        />
      ))}
    </div>
  );
}
