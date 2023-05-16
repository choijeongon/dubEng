import * as queryKeys from "@/constants/queryKeys";
import { RootState } from "@/stores/store";
import axios from "axios";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
interface IDataList {
  playCount: number;
  likeCount: number;
  like: boolean;
}
const fetcher = (recordId: number, userId: string) => {
  return axios
    .get(
      process.env.NEXT_PUBLIC_BASE_URL + `/dub/community/playCount/${recordId}`,
      {
        params: {
          userId: userId,
        },
      }
    )
    .then(({ data }) => {
      console.log("usePlayCountQuery안 playCount", data);
      const dataList = data as IDataList;
      return dataList;
    });
};
const usePlayCountUpQuery = (
  userId: string,
  recordId: number,
  isPlayed: null | boolean
) => {
  return useQuery([queryKeys.PLAY_COUNT], () => fetcher(recordId, userId), {
    refetchOnWindowFocus: false,
  });
};

export default usePlayCountUpQuery;
