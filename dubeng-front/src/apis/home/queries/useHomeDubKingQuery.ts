import { useQuery } from "react-query";
import axios from "axios";
import * as queryKeys from "../../../constants/queryKeys";

const fetcher = () =>
  axios
    .get(process.env.NEXT_PUBLIC_BASE_URL + `/dub/home/dubking`)
    .then(({ data }) => {
      return data;
    });

const useHomeDubKingQuery = () => {
  return useQuery([queryKeys.Home_DUB_KING], () => fetcher());
};

export default useHomeDubKingQuery;
