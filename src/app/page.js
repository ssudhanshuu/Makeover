import Link from "next/link";

const menuItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Services", path: "/services" },
];

export default function Navbar() {
  return (
    <div className="full-page border-2 ">
      <nav className="h-10 w-full border-2  flex justify-center  ">
        <div>
          hii
        </div>
        <div className="border-2 flex justify-between ">
          {menuItems.map((item) => (
            <Link key={item.path} href={item.path}>
              {item.name}
            </Link>
          ))}
        </div>

      </nav>
    </div>
  );
}