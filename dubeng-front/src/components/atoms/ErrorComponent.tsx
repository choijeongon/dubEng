export default function ErrorComponent() {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-dubgray text-14">
        서버에서 요청을 처리하는데 실패하였습니다.
      </p>
      <button className="mt-16 px-48 py-8 rounded-8 bg-dubgraylight border-dubblue text-dubblue text-16">
        다시 시도
      </button>
    </div>
  );
}
