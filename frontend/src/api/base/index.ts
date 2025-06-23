import axios, {
    type AxiosInstance,
    type AxiosPromise,
    type AxiosRequestConfig
} from "axios";
import Qs from "qs";

type RequestExecutor<Response> = (axios: AxiosInstance) => AxiosPromise<Response>;
const AXIOS_INSTANCE: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    paramsSerializer: (params) => Qs.stringify(params, { arrayFormat: "repeat" }),
    timeout: 10000
});;

export class AxiosApi {
    static executeRequest = <Response>(request: RequestExecutor<Response>): AxiosPromise<Response> => {
        return request(AXIOS_INSTANCE);
    };


    static get = <Response>(
        uri: string,
        config?: AxiosRequestConfig
    ): AxiosPromise<Response> => {
        return this.executeRequest<Response>((axios) => axios.get(uri, config));
    };

    static head = <Response>(
        uri: string,
        config?: AxiosRequestConfig
    ): AxiosPromise<Response> => {
        return this.executeRequest<Response>((axios) => axios.head(uri, config));
    };

    static post = <Data, Response>(
        uri: string,
        data: Data,
        config?: AxiosRequestConfig
    ): AxiosPromise<Response> => {
        return this.executeRequest<Response>((axios) => axios.post(uri, data, config));
    };

    static postForm = <Data, Response>(
        uri: string,
        data: Data,
        config?: AxiosRequestConfig
    ): AxiosPromise<Response> => {
        return this.executeRequest<Response>((axios) => axios.postForm(uri, data, config));
    };

    static put = <Data, Response>(
        uri: string,
        data: Data,
        config?: AxiosRequestConfig
    ): AxiosPromise<Response> => {
        return this.executeRequest<Response>((axios) => axios.put(uri, data, config));
    };

    static delete = <Response>(
        uri: string,
        config?: AxiosRequestConfig
    ): AxiosPromise<Response> => {
        return this.executeRequest<Response>((axios) => axios.delete(uri, config));
    };

    static patch = <Data, Response>(
        uri: string,
        data: Data,
        config?: AxiosRequestConfig
    ): AxiosPromise<Response> => {
        return this.executeRequest<Response>((axios) => axios.patch(uri, data, config));
    };

    static options = <Response>(
        uri: string,
        config?: AxiosRequestConfig
    ): AxiosPromise<Response> => {
        return this.executeRequest<Response>((axios) => axios.options(uri, config));
    };
}
