import Image from "next/image";
import { MdCheckCircle } from "react-icons/md";

interface Iprops {
  username: string;
  description: string;
  userImage: string;
  isPlaying: boolean;
  onClick: () => void;
}

export default function VoteCard({
  username,
  description,
  userImage,
  isPlaying,
  onClick,
}: Iprops) {
  return (
    <div className="py-16 flex flex-col justify-center items-center rounded-8 w-140 h-140 bg-white border-1 border-dubgraydeep">
      <Image
        src={userImage}
        alt="userImage"
        className="rounded-full"
        width={32}
        height={32}
      ></Image>
      <p className="mt-4 text-12 text-dubblack font-semibold">{username}</p>
      <p className="px-24 text-center text-10 text-dubgray">{description}</p>
      <MdCheckCircle className="mt-4" />
    </div>
  );
}
