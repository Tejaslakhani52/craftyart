import axios from "axios";
import { Dispatch } from "redux";
import { consoleShow } from "../../commonFunction/console";

export const templatesData = () => (dispatch: Dispatch<any>) => {
  axios
    .post(`/api/get/datas`, {
      cat_id: "quotes-post-square",
      debug_key: "debug",
      limit: 50,
      page: 1,
    })
    .then((res: any) => {
      consoleShow("res: ", res);
      // dispatch(templates(res?.data?.datas));
    })
    .catch((err) => consoleShow("err: ", err));
};
