import axios, { AxiosRequestConfig } from 'axios';
import { LIQUIDSWAP_API_URL } from "@/constants/constants";

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const DEFAULT_TIMEOUT = 5000;

export async function fetch<T>(
  path: string,
  options: AxiosRequestConfig = {},
): Promise<T> {
  const { method = 'GET', headers = {}, ...restOptions } = options;

  const response = await axios(`${LIQUIDSWAP_API_URL}${path}`, {
    headers: {
      ...DEFAULT_HEADERS,
      ...headers,
    },
    method,
    timeout: DEFAULT_TIMEOUT,
    ...restOptions,
  });

  return response.data;
}
