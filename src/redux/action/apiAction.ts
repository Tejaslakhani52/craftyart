import axios from "axios";
import { Dispatch } from "redux";

export const templatesData = () => (dispatch: Dispatch<any>) => {
  axios
    .post(`/api/get/datas`, {
      cat_id: "quotes-post-square",
      debug_key: "debug",
      limit: 50,
      page: 1,
    })
    .then((res: any) => {
      console.log("res: ", res);
      // dispatch(templates(res?.data?.datas));
    })
    .catch((err) => console.log("err: ", err));
};
