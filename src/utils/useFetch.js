import axios from "axios";
import config from "./config";
import { HTTPMethodEnum } from "./types";

const Request = () => {
  const call = (url, method, reqHeaders, data) => {
    const headers = Object.assign(
      Object.assign({}, config.requestHeaders),
      reqHeaders
    );
    const reqObj = {
      method,
      url,
      headers,
      data
      // timeout: 5000,
    };
    console.log("reqObj: ", reqObj);

    return axios(reqObj)
      .then((res) => Promise.resolve(res))
      .catch((error) => {
        const responseError = {};
        responseError.code = 0;
        responseError.message = "Something went wrong";
        if (error.response) {
          const errMessage = error.response.data.message;
          responseError.code = error.response.status;
          if (errMessage) {
            responseError.message = errMessage;
          }
        } else if (error.request) {
          //
        } else if (error.message) {
          responseError.message = error.message;
        }
        return Promise.reject(responseError);
      });
  };

  const get = (url, reqHeader) => call(url, HTTPMethodEnum.GET, reqHeader);
  const post = (url, reqBody, reqHeader) =>
    call(url, HTTPMethodEnum.POST, reqHeader, reqBody);
  const put = (url, reqBody, reqHeader) =>
    call(url, HTTPMethodEnum.PUT, reqHeader, reqBody);
  const _delete = (url, reqHeader) =>
    call(url, HTTPMethodEnum.DELETE, reqHeader);

  return {
    get,
    post,
    put,
    _delete
  };
};

export { Request };

/**
  ** usage of hooks
  ** 1.import files
    import { Request } from "@hooks/useFetch";
    import { awaitHandler } from "@hooks/useFetch/utils/awaitHandler";
  ** 2. initialize inside the component
    const { get, post, put, _delete } = Request();
  ** 3.using
  ** GET://
    const fetchAsync = async () => {
    const url = "https://reqres.in/api/users?page=2";

    let result = await get(url);
    console.log("fetchAsync", result);
    return result;
  };
  ** CREATE://
    const addAsync = async () => {
      const url = "https://reqres.in/api/users";
      const data = {
        name: "morpheus",
        job: "leader"
      };
      try {
        const result = await awaitHandler(post(url, data));
        console.log("addAsync", result);
        if (result.err) {
          throw new Error(result.err.message);
        }
        return result;
      } catch (error) {
        console.log("Unable to Add");
        return false;
      }
    };
  ** DELETE://
    const deleteAsync = async () => {
    const url = "https://reqres.in/api/users/2";
    try {
      const result = await _delete(url);
      console.log("deleteAsync", result);
      return result;
    } catch (error) {
      console.log("Unable to Delete");
      return false;
    }
  };
  ** UPDATE://
    const updateAsync = async () => {
    const url = "https://reqres.in/api/users/2";
    const data = {
      name: "morpheus",
      job: "zion resident"
    };
    try {
      const result = await put(url, data);
      console.log("updateAsync", result);
      return result;
    } catch (error) {
      console.log("Unable to Update");
      return false;
    }
  };
 */
