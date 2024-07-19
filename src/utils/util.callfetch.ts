import { APIS } from "./util.endpoint";
import { ICallApis, ICallFetch } from "./util.interface";

const apiKey = import.meta.env.APP_API_KEY;

const Timeout = (time: number) => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), time * 1000);
  return controller;
};

const errorResturn = (err: any) => {
  return {
    status: err.status ?? false,
    res: [],
    message: err.message ?? err,
  };
};

const headers = (options: { headers: any }) => {
  return {
    apiKey,
    "Content-Type": "application/json",
    ...options?.headers,
  };
};

const headersGet = (options: any) => {
  return {
    method: "GET",
    headers: headers(options),
  };
};

const headersPost = (options: any) => {
  return {
    method: "POST",
    headers: headers(options),
    body: JSON.stringify(options.body),
  };
};

const headersPUT = (options: any) => {
  return {
    method: "PUT",
    headers: headers(options),
    body: JSON.stringify(options.body),
  };
};

const headersDelete = (options: any) => {
  return {
    method: "DELETE",
    headers: headers(options),
    body: JSON.stringify(options.body),
  };
};

const headersFormData = (options: any) => {
  const file = options.body;

  const formData = new FormData();
  formData.append("file", file);

  return {
    method: options.edit ?? "POST",
    headers: {
      apiKey,
      ...options?.headers,
    },
    body: formData,
  };
};

const methodsMap = {
  GET: headersGet,
  POST: headersPost,
  PUT: headersPUT,
  DELETE: headersDelete,
  FORMDATA: headersFormData,
};

const callfetch = async ({ url, method, options }: ICallFetch) => {
  const headers = methodsMap[method](options);

  try {
    return fetch(url, { signal: Timeout(50).signal, ...headers })
      .then(async (response) => {
        if (response.status && response.status >= 200 && response.status <= 299) {
          return {
            status: response.status,
            response: await response.json(),
          };
        }
        return {
          status: response?.status,
          response: await response.json(),
        };
      })
      .catch((err) => {
        return errorResturn(err);
      });
  } catch (err) {
    return errorResturn(err);
  }
};

const callApis = async (props: ICallApis) => {
  try {
    const { base, api, method, body, useToken = false, params } = props;

    const options: any = {};
    if (body) {
      options.body = body;
    }

    if (params) {
      options.edit = "PUT";
    }

    if (useToken) {
      const token = localStorage.getItem("token");
      options.headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    let url = APIS[base][api];

    if (params) {
      if (params.id) {
        url = `${url}/${params.id}`;
        delete params.id;
      }

      if (params.paramId) {
        const urlParams = new URLSearchParams({
          id: params.paramId,
        }).toString();
        url = `${url}?${urlParams}`;
        delete params.paramId;
      }

      if (Object.keys(params).length > 0) {
        const urlParams = new URLSearchParams(params).toString();
        url = `${url}?${urlParams}`;
      }
    }

    return await callfetch({ url, method, options }).then((res: any) => {
      const message = res?.response?.message ?? "";
      if (message) delete res.response.message;
      return {
        ...res,
        message,
        status: res.status,
      };
    });
  } catch (error) {
    console.error("🚀 ~ error in util.callfetch ~ error:", error);
  }
};

export { callfetch, callApis };
