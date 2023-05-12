"use client";
import { MdHomeFilled } from "react-icons/md";
import { MdHeadphones } from "react-icons/md";
import { ImBook } from "react-icons/im";
import { AiOutlineSmile } from "react-icons/ai";

import Link from "next/link";

import { usePathname } from "next/navigation";
import RecordingButton from "./RecordingButton";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const menu = [
  {
    href: "/",
    label: "홈",
    icon: <MdHomeFilled size={24} color="#767676" />,
    clickedIcon: <MdHomeFilled size={24} color="#ff6d60" />,
    isNavigatedButton: true,
  },
  {
    href: "/community",
    label: "더빙목록",
    icon: <MdHeadphones size={24} color="#767676" />,
    clickedIcon: <MdHeadphones size={24} color="#ff6d60" />,
    isNavigatedButton: true,
  },
  {
    href: "/others",
    label: "녹음버튼",
    isNavigatedButton: false,
  },
  {
    href: "/mission",
    label: "도전과제",
    icon: <ImBook size={24} color="#767676" />,
    clickedIcon: <ImBook size={24} color="#ff6d60" />,
    isNavigatedButton: true,
  },
  {
    href: "/mypage",
    label: "My",
    icon: <AiOutlineSmile size={24} color="#767676" />,
    clickedIcon: <AiOutlineSmile size={24} color="#ff6d60" />,
    isNavigatedButton: true,
  },
];

export default function NavigationBar() {
  const pathName = usePathname();

  if (pathName === "/manager") {
    return <></>;
  } else if (pathName === "/mission") {
    MySwal.fire("도전과제 페이지는 아직 준비중입니다!");
    return <></>;
  } else if (pathName === "/mypage") {
    MySwal.fire("마이페이지는 아직 준비중입니다!");
    return <></>;
  } else {
    return (
      <nav className={getNavigationBarStyle(pathName)}>
        <ul className="flex justify-around">
          {menu.map((item) => (
            <li key={item.href}>
              {item.isNavigatedButton === false ? (
                <RecordingButton page={pathName} />
              ) : (
                <Link href={item.href}>
                  <div className="flex flex-col justify-center items-center pt-4">
                    {pathName === item.href ? item.clickedIcon : item.icon}
                    {pathName === item.href ? (
                      <p className="text-dubcoral text-12">{item.label}</p>
                    ) : (
                      <p className="text-dubgray text-12">{item.label}</p>
                    )}
                  </div>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  function getNavigationBarStyle(pathName: string): string {
    if (pathName === "/community/shorts") {
      return "h-61 pt-8 pb-8 fixed min-w-390 bottom-0 z-50 bg-dubblack border-t-1 border-[#DEE2E6]";
    } else {
      return "h-61 pt-8 pb-8 fixed  min-w-390 bottom-0 z-50 bg-white border-t-1 border-[#DEE2E6]";
    }
  }
}
