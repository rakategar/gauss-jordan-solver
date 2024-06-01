import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-gray-100">

    <div className="navbar bg-secondary rounded-b-lg">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-white">Gaus Gacor</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-10 gap-6 text-white font-bold">
          <li><Link href={"/"}>Menu</Link></li>
          <li><Link href={"/alat"}>Tools</Link></li>
          <li><Link href={"/games"}>Game</Link></li>
          <li><Link href={"/about"}>About</Link></li>
        </ul>
      </div>
    </div>
    </div>
  );
}
