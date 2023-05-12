import {useEffect,useRef, useState} from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { saveSignupInfo } from "../../stores/user/signupSlice";
import CommonInputBox from "@/components/atoms/CommonInputBox";
import { CheckMessageStatus } from "@/enum/statusType";
import CheckMessage from "@/components/atoms/CheckMessage";
import { MdChangeCircle } from "react-icons/md";
import SignUpButton from "@/features/signup/atoms/SignUpButton";
import userGetNicknameCheck from "@/apis/signup/queries/useGetNicknameCheck";

import cookie from 'react-cookies';

export default function SignUpPage(){
  const nicknameMounted = useRef(false);
  const introdeuceMounted = useRef(false);
  const [nickname, setNickname] = useState<string>('');
  const [introduce, setIntroduce] = useState<string>('');
  const [nextBtnStatus, setNextBtnStatus] = useState<boolean>(false);
  const [checknicknameMsg, setchecknicknameMsg] = useState<CheckMessageStatus>(CheckMessageStatus.INIT);
  const [checkintroduceMsg, setcheckintroduceMsg] = useState<CheckMessageStatus>(CheckMessageStatus.INIT);
  
  const [profileImage, setProfileImage] = useState<string | null>(null); // 기본 이미지
  const { refetch } = userGetNicknameCheck(nickname);
  
  const nicknameLimitSize = 6;
  const introduceLimitSize = 15;

  const route = useRouter();
  const dispatch = useDispatch();
  
  useEffect(()=>{
    // null 처리 해야함
    const kakaoImageUrl = cookie.load("imageUrl");
    if(kakaoImageUrl){
      setProfileImage(kakaoImageUrl);
    }
    
  },[]);

  const check_kor = /^[가-힣]+$/;  // 한글 체크
  useEffect(()=>{
    checkNickname(nickname);
  },[nickname])

  const checkNickname = async (nickname:string) =>{
    // 첫 렌더링시 호출 막기
    if(!nicknameMounted.current){
      nicknameMounted.current = true;
      return;
    }
    //닉네임 유효성 체크
    if(!nickname || nickname.length > nicknameLimitSize || nickname.length <= 1){
      setchecknicknameMsg(CheckMessageStatus.NICKNAME_LIMIT_SIX);
      setNextBtnStatus(false);
      return;
    }
    // 문법 체크
    if(!check_kor.test(nickname)){
      setchecknicknameMsg(CheckMessageStatus.NICKNAME_INVALID_SYNTAX);
      setNextBtnStatus(false);
      return;
    }
    const {data} = await refetch();
    if(data){
      // 닉네임 중복체크
      setchecknicknameMsg(CheckMessageStatus.NICKNAME_DUPLICATION);
      setNextBtnStatus(false);
      return;
    }
    setchecknicknameMsg(CheckMessageStatus.NICKNAME_ISVALID);
  }
  useEffect(()=>{
    // 첫 렌더링시 호출 막기
    if(!introdeuceMounted.current){
      introdeuceMounted.current = true;
      return;
    }
    // 한줄 소개 유효성 체크
    if(!introduce || introduce.length > introduceLimitSize || introduce.length <= 1){
      setcheckintroduceMsg(CheckMessageStatus.INTRODUCE_LIMIT_FIFTEEN);
      setNextBtnStatus(false);
      return;
    }
    setcheckintroduceMsg(CheckMessageStatus.INTRODUCE_ISVALID);

  },[introduce]);

  useEffect(()=>{
    if(checknicknameMsg === CheckMessageStatus.NICKNAME_ISVALID && checkintroduceMsg === CheckMessageStatus.INTRODUCE_ISVALID){
      setNextBtnStatus(true);
    }
  },[checknicknameMsg, checkintroduceMsg])
  const nicknameChange = async (e : React.ChangeEvent<HTMLInputElement>) =>{
    const nickname = e.target.value;
    setNickname(nickname);
  }
  const introduceChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
    setIntroduce(e.target.value);
  }
  const singupNextHandler = () =>{
    // 리덕스 저장
    // dispatch해줄 것
    const signuoInfoToSubmit = { accessToken: cookie.load("accessToken"),
        imageUrl : profileImage,
        nickname : nickname,
        introduce : introduce
    };
    dispatch(saveSignupInfo(signuoInfoToSubmit))

    route.push('/signup/interest');
  }
  return (
    <div className="container mx-auto">
      <div className="m-16 mt-100">
        <div className="my-40 grid">
          <div className="mx-auto relative">
            {profileImage && <Image className="rounded-full" src={profileImage} alt="dubLogoImg" width={120} height={120}></Image>}
            {/*profileImage && <button className="absolute right-12 bottom-4 z-2 rounded-full bg-white"><MdChangeCircle size={30}/></button>*/}
          </div>

          
        </div>
        <div>
          {/* 닉네임 입력 */}
          <div className="my-20">
            <p className="font-bold mb-6">닉네임</p>
            <CommonInputBox type="text" placeholder="닉네임을 입력하세요." name="" value={nickname} onChange={nicknameChange} />
            <p className="text-right text-xs text-dubgray">{nickname.length}/{nicknameLimitSize}</p>
            <CheckMessage status={checknicknameMsg}/>
          </div>
          <div className="my-20">
            <p className="font-bold mb-6">한 줄 소개</p>
            <CommonInputBox type="text" placeholder="나를 표현하는 한 줄을 적어주세요." name="" value={introduce} onChange={introduceChange} />
            <p className="text-right text-xs text-dubgray">{introduce.length}/{introduceLimitSize}</p>
            <CheckMessage status={checkintroduceMsg}/>
          </div>
        </div>
        <div className="mt-60">
            <SignUpButton onClick={singupNextHandler} text="다음" status={nextBtnStatus}/>
        </div>
      </div>
    </div>
  );
}

