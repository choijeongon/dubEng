import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "../../../public/images/logo/dubeng_logo.png";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function Header() {
  const route = useRouter();
  const pathName = usePathname();

  if (pathName === "/") {
    return (
      <div className="fixed left-0 right-0 top-0 z-50 h-57 rounded-2 text-16 font-semibold flex justify-start pl-16 items-center bg-white">
        <Image src={Logo} alt={"logo"} width={98} height={41} />
      </div>
    );
  } else if (pathName === "/community") {
    return (
      <div className="fixed left-0 right-0 top-0 z-50 h-57 rounded-2 text-16 font-semibold flex justify-start pl-16 items-center bg-white">
        더빙목록
      </div>
    );
  } else if (pathName === "/community/shorts") {
    return (
      <div className="fixed left-0 right-0 top-0 z-50 h-57 rounded-2 text-16 font-semibold flex justify-start pl-16 items-center bg-dubblack">
        <button>
          <MdOutlineArrowBackIos className="mr-8 mb-2" color="#ffffff" />
        </button>
      </div>
    );
  } else if (pathName === "/mypage") {
    return (
      <div className="fixed left-0 right-0 top-0 z-50 h-57 rounded-2 text-16 font-semibold flex justify-between px-16 items-center bg-white">
        My
        <button>
          <AiOutlineEdit size={19} />
        </button>
      </div>
    );
  } else if (pathName === "/mission") {
    return (
      <div className="fixed left-0 right-0 top-0 z-50 h-57 rounded-2 text-16 font-semibold flex justify-start pl-16 items-center bg-white">
        도전과제
      </div>
    );
  } else if (pathName === "/mypage/myDubbingProduct") {
    return (
      <div className="fixed left-0 right-0 top-0 z-50 h-57 rounded-2 text-16 font-semibold flex justify-start pl-16 items-center bg-white">
        <button>
          <MdOutlineArrowBackIos className="mr-8 mb-2" />
        </button>
        나의 상영관
      </div>
    );
  } else if (pathName === "/signup") {
    return (
      <div className="fixed left-0 right-0 top-0 z-50 h-57 rounded-2 text-16 font-semibold flex justify-start pl-16 items-center bg-white">
        <button onClick={()=>{route.back()}}>
          <MdOutlineArrowBackIos className="mr-8 mb-2" />
        </button>
        회원가입
      </div>
    );
  }else if (pathName === "/signup/interest") {
    return (
      <div className="fixed left-0 right-0 top-0 z-50 h-57 rounded-2 text-16 font-semibold flex justify-start pl-16 items-center bg-white">
        <button onClick={()=>{route.back()}}>
          <MdOutlineArrowBackIos className="mr-8 mb-2" />
        </button>
        회원가입
      </div>
    );
  } else if (pathName === "/signup/kitchen") {
    return (
      <div className="fixed left-0 right-0 top-0 z-50 h-57 rounded-2 text-16 font-semibold flex justify-start pl-16 items-center bg-white">
        <button onClick={()=>{route.back()}}>
          <MdOutlineArrowBackIos className="mr-8 mb-2" />
        </button>
        나의 관심사
      </div>
    );
  } else if (pathName === "/mypage/profileEdit") {
    return (
      <div className="fixed left-0 right-0 top-0 z-50 h-57 rounded-2 text-16 font-semibold flex justify-between px-16 items-center bg-white">
        <div className="flex justify-start items-center">
          <button>
            <MdOutlineArrowBackIos className="mr-8 mb-2" />
          </button>
          프로필 수정
        </div>
        <button>완료</button>
      </div>
    );
  }

  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-57 rounded-2 text-16 font-semibold flex justify-start pl-16 items-center bg-white">
      <Image src={Logo} alt={"logo"} width={98} height={41} />
    </div>
  );
}