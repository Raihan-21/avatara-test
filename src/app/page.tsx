import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";

const chatList = [
  {
    id: "bot",
    name: "Leydroid",
    profileImg: "avatar.png",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between bg-white py-10">
        {chatList.map((chat, i) => (
          <Link href={`/${chat.id}`} className="w-full" key={i}>
            <div className="border-b-[1px] border-gray">
              <div className="flex gap-x-2 p-5">
                <div className="avatar">
                  <img src="avatar.png" alt="" />
                </div>{" "}
                <div>{chat.name}</div>
              </div>
            </div>
          </Link>
        ))}
      </main>
    </>
  );
}
