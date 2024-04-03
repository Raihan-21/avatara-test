import Image from "next/image";
import Link from "next/link";

const chatList = [
  {
    id: "bot",
    name: "Bot",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      {chatList.map((chat, i) => (
        <Link href={`/${chat.id}`} key={i}>
          <div>{chat.name}</div>
        </Link>
      ))}
    </main>
  );
}
