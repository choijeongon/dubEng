import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useGetVideoInfoQuery from "@/apis/manager/queries/useGetVideoInfoQuery";
import ScriptListItem from "@/features/manager/organism/ScriptListItem";
import useCategoryQuery from "@/apis/manager/queries/useCategoryQuery";
import useVideoPost from "@/apis/manager/mutations/useVideoPost";
import CommonInputBox from "@/components/atoms/CommonInputBox";
import TagButton from "@/components/atoms/TagButton";
import { RootState } from "@/stores/store";

export default function ManagerPage() {
  const [inputs, setInputs] = useState({
    url: "",
    start: 0,
    end: 0,
    lang: "",
  });

  interface getVideoInfoType {
    channelTitle: string;
    thumbnails: string;
    title: string;
    url: string;
  }

  // 채워넣기 용 비디오 info
  const [videoInfo, setVideoInfo] = useState<getVideoInfoType>();

  interface scriptsType {
    duration: number;
    start: number;
    text: string;
    translation: string;
  }

  interface categoryType {
    id: number;
  }

  // script 정보 관리하는 useState
  const [scripts, setScripts] = useState<scriptsType[]>([]);

  // // post용
  const mutation = useVideoPost();

  // 비구조화 할당
  const { url, start, end, lang } = inputs;

  // get용 react-query
  const { refetch } = useGetVideoInfoQuery(url, start, end, lang);

  // 영상 성별
  const [gender, setGender] = useState(0);

  const handleClickGenderButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(parseInt(e.target.value));
    console.log(gender);
  };

  // // 카테고리 조회 react-query
  const { data } = useCategoryQuery();

  // 선택한 카테고리 태그
  const [selectedTag, setSelectedTag] = useState<number[]>([]);

  // 태그 선택
  const handleClickTag = (id: number) => {
    if (selectedTag.includes(id)) {
      setSelectedTag(selectedTag.filter((tagId) => tagId !== id));
    } else {
      setSelectedTag([...selectedTag, id]);
    }
  };

  const [audioFile, setAudioFile] = useState<FileList | null>(null);
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files);
    setAudioFile(e.target.files);
  };

  // input값 onChange
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const [customTitle, setCustomTitle] = useState("");
  // 지정 커스텀 타이틀 값 변경
  const onChangeTitleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTitle(e.target.value);
    console.log(customTitle);
  };

  // getVideoInfo 쿼리 호출 파트
  async function getVideoInfo() {
    console.log("getVideoInfo");
    try {
      const videoInfoResult = await refetch();
      console.log("videoInfoResult", videoInfoResult.data.scripts);
      setVideoInfo(videoInfoResult.data.videoInfo);
      setScripts(videoInfoResult.data.scripts);
    } catch (error) {
      console.log(error);
    }
  }
  // url 퍼가기 용으로 수정
  const getIframeUrl = () => {
    if (videoInfo) {
      const originalUrl = videoInfo.url;
      const splitUrl = originalUrl.split("watch?v=");
      const newUrl =
        splitUrl[0] +
        "embed/" +
        splitUrl[1] +
        "?start=" +
        start +
        "&end=" +
        end +
        "&controls=0&rel=0&loop=1";

      console.log(newUrl);
      return newUrl;
    }
  };

  // 요청 보내는 파트
  function handleGetVideoButton() {
    console.log(inputs);
    getVideoInfo();
  }

  function handleSaveVideoButton() {
    console.log("등록하기 버튼 눌렀다!");
    saveDubVideo();
  }

  const userIdData = useSelector((state: RootState) => state.user.userId);
  const scriptsData = useSelector((state: RootState) => state.scriptsPostInfo);

  function makeFormData() {
    const formData = new FormData();

    const video = {
      videoPath: videoInfo?.url,
      title: customTitle,
      thumbnail: videoInfo?.thumbnails,
      startTime: start,
      endTime: end,
      producer: videoInfo?.channelTitle,
      gender: gender,
      lang: lang,
    };

    const postData = {
      video: video,
      userId: "39576",
      scripts: scriptsData,
      categories: selectedTag,
    };

    console.log("!!! postData", JSON.stringify(postData));

    formData.append("data", JSON.stringify(postData));

    console.log("~~~ postData를 붙인 formData", formData);

    if (audioFile) {
      formData.append(`file`, audioFile[0]);
    }

    console.log("!!! audioFile 붙인 formData", formData);

    return formData;
  }

  async function saveDubVideo() {
    const formData = makeFormData();
    console.log("!!!!formData는 여기", formData);

    try {
      const videoPostResult = await mutation.mutateAsync(formData);
    } catch (error) {}
  }

  return (
    <div className="max-w-7xl mx-auto">
      <p className="text-24 font-bold mt-32 mb-16">더빙 콘텐츠 불러오기</p>
      <div className="flex space-x-32">
        <div>
          <label htmlFor="url">비디오 링크</label>
          <br />
          <input
            className="text-16 rounded-5 font-normal placeholder-dubgray text-dubblack outline-none h-43 w-400 border border-[#E9ECEF] pl-16 py-12"
            type="text"
            name="url"
            onChange={onChangeValue}
            value={url}
            placeholder="비디오 url을 입력하세요."
          />
        </div>
        <div>
          <label htmlFor="videoInterval">비디오 구간 설정</label>
          <br />
          <input
            className="text-16 rounded-5 font-normal placeholder-dubgray text-dubblack outline-none h-43 w-100 border border-[#E9ECEF] pl-16 py-12"
            type="number"
            name="start"
            onChange={onChangeValue}
            value={start}
            placeholder="시작 시간"
          />
          {/* <CommonInputBox
            type="number"
            name="start"
            value={start}
            placeholder="시작 시간"
            onChange={onChangeValue}
          /> */}
          -
          <input
            className="text-16 rounded-5 font-normal placeholder-dubgray text-dubblack outline-none h-43 w-100 border border-[#E9ECEF] pl-16 py-12"
            type="number"
            name="end"
            onChange={onChangeValue}
            value={end}
            placeholder="종료 시간"
          />
          {/* <CommonInputBox
            type="number"
            name="end"
            value={end}
            placeholder="종료 시간"
            onChange={onChangeValue}
          /> */}
        </div>
        <div>
          <label htmlFor="lang">콘텐츠 언어</label>
          <br />
          <div className="flex space-x-8 mt-10">
            <label htmlFor="english">English</label>
            <input
              type="radio"
              value="english"
              id="english"
              name="lang"
              onChange={onChangeValue}
            />
            <label htmlFor="korean">한국어</label>
            <input
              type="radio"
              value="korean"
              id="korean"
              name="lang"
              onChange={onChangeValue}
            />
          </div>
        </div>
        <button
          className="rounded-[8px] bg-dubblue px-16 h-43 pb-0 text-white mt-23"
          onClick={handleGetVideoButton}
        >
          불러오기
        </button>
      </div>
      <p className="text-24 font-bold mt-32 mb-16">더빙 콘텐츠 정보</p>
      {videoInfo && (
        <div>
          <div>
            <p>콘텐츠 미리보기</p>
            <iframe
              src={getIframeUrl()}
              className="w-full aspect-video"
            ></iframe>
          </div>

          <div className="flex mt-16 grid grid-cols-2">
            <div>
              <p>썸네일</p>
              <img src={videoInfo!.thumbnails} alt="videoThumbnails" />
            </div>
            <div className="flex flex-col ml-16 justify-between">
              <div>
                <label htmlFor="videoTitle">콘텐츠 제목</label>
                <input
                  className="text-16 rounded-5 font-normal placeholder-dubgray text-dubblack outline-none h-43 w-full border border-[#E9ECEF] pl-16 py-12"
                  type="text"
                  value={videoInfo!.title}
                />
              </div>
              <div>
                <label htmlFor="videoRuntime">런타임</label>
                <br />
                <input
                  className="text-16 rounded-5 font-normal placeholder-dubgray text-dubblack outline-none h-43 w-100 border border-[#E9ECEF] pl-16 py-12"
                  type="number"
                  value={end - start}
                />
              </div>
              <div>
                <label htmlFor="videoProduction">제작사</label>
                <br />
                <input
                  className="text-16 rounded-5 font-normal placeholder-dubgray text-dubblack outline-none h-43 w-100 border border-[#E9ECEF] pl-16 py-12"
                  type="text"
                  value={videoInfo!.channelTitle}
                />
              </div>
            </div>
          </div>

          <p className="text-24 font-bold mt-32 mb-16">스크립트</p>
          {scripts.map((script, idx) => (
            <ScriptListItem {...script} key={idx} />
          ))}
        </div>
      )}

      <p className="text-24 font-bold mt-32 mb-16">콘텐츠 정보 입력하기</p>
      <div className="flex space-x-40">
        <div>
          <label htmlFor="videoTitle">콘텐츠 제목 지정</label>
          <br />
          <CommonInputBox
            type="text"
            name="videoTitle"
            value={customTitle}
            placeholder="콘텐츠 제목을 입력해주세요."
            onChange={onChangeTitleValue}
          />
        </div>

        <div>
          <label htmlFor="videoGender">더빙 성우 성별</label>
          <br />
          <div className="flex space-x-8 mt-8">
            <label htmlFor="0">남성</label>
            <input
              type="radio"
              value={0}
              checked={gender === 0}
              id="0"
              name="0"
              onChange={handleClickGenderButton}
            />
            <label htmlFor="1">여성</label>
            <input
              type="radio"
              value={1}
              checked={gender === 1}
              id="1"
              name="1"
              onChange={handleClickGenderButton}
            />
          </div>
        </div>
      </div>

      <div className="mt-16">
        <p>카테고리</p>
        <div className="flex">
          {data?.map((tag: { id: number; name: string }, idx: number) => (
            <TagButton
              onClick={() => handleClickTag(tag.id)}
              id={tag.id}
              key={idx}
              name={tag.name}
              isSelected={selectedTag.includes(tag.id) ? true : false}
            />
          ))}
        </div>
      </div>

      <div className="mt-16">
        <p>음성 파일 첨부</p>
        <p className="text-dubcoral">
          ⨀ mp3 파일명은 본인 id로 변경하여서 첨부해주세요.
        </p>
        <input
          type="file"
          name="file"
          id="uploadAudio"
          onChange={handleFileInput}
        />
      </div>
      <button
        className="rounded-[8px] bg-dubblue px-16 h-43 pb-0 text-white mt-23"
        onClick={handleSaveVideoButton}
      >
        등록하기
      </button>
    </div>
  );
}