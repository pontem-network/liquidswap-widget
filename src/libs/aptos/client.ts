import { REST_URL } from '@/constants/constants';
import { IPoolExist } from '@/types';
import {
  getModulesAccount,
  getResourcesAccount,
} from '@/utils/contracts';

import { is_sorted } from '@/utils/utils';
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  CancelTokenSource,
  Canceler,
} from 'axios';

export type Resource<T = any> = {
  type: string;
  data: T;
};

export type RequestOptions = {
  cancelToken?: boolean | CancelTokenSource;
};

type ComposedRequestOptions = { cancelToken?: CancelTokenSource };

function computeRequestOptions(
  options?: RequestOptions,
): ComposedRequestOptions | undefined {
  if (options && options.cancelToken) {
    return {
      cancelToken:
        typeof options.cancelToken !== 'boolean'
          ? options.cancelToken
          : axios.CancelToken.source(),
    };
  }
}

function computeAxiosConfig(
  options?: ComposedRequestOptions,
): AxiosRequestConfig {
  if (options?.cancelToken) {
    return {
      cancelToken: options.cancelToken.token,
    };
  }

  return {};
}

export class AptosClient {
  private http: AxiosInstance;

  constructor(baseUrl?: string) {
    baseUrl = baseUrl ?? REST_URL;
    this.http = axios.create({
      baseURL: baseUrl,
    });
  }

  changeConfig(baseUrl: string) {
    this.http = axios.create({
      baseURL: baseUrl,
    });
  }

  getAccount(address: string, options?: RequestOptions) {
    const _options = computeRequestOptions(options);
    const config = computeAxiosConfig(_options);

    return this.wrapOptimisticError(
      () => this.http.get(`/accounts/${address}`, config),
      undefined,
      _options,
    );
  }

  getAccountResources(
    address: string,
    options?: RequestOptions,
  ): Promise<Resource[]> | any {
    const _options = computeRequestOptions(options);
    const config = computeAxiosConfig(_options);

    return this.wrapOptimisticError(
      () => this.http.get(`/accounts/${address}/resources`, config),
      [],
      _options,
    );
  }

  getAccountResource<T = any>(
    address: string,
    resource: string,
    options?: RequestOptions,
  ): Promise<Resource<T> | undefined> | any {
    const _options = computeRequestOptions(options);
    const config = computeAxiosConfig(_options);

    return this.wrapOptimisticError(
      () => this.http.get(`/accounts/${address}/resource/${resource}`, config),
      undefined,
      _options,
    );
  }

  async getPoolExistence(
    params: IPoolExist,
    version?: number,
  ): Promise<boolean> {
    const { fromCoin, toCoin, curve } = params;
    if (curve === undefined) {
      throw new Error('Curve type is undefined');
    }
    const isSorted = is_sorted(fromCoin, toCoin);
    const [from, to] = isSorted ? [fromCoin, toCoin] : [toCoin, fromCoin];
    const resourceAccount = getResourcesAccount(version);
    const moduleAccount = getModulesAccount(version);
    const poolUrl = `/accounts/${resourceAccount}/resource/${moduleAccount}::liquidity_pool::LiquidityPool<${from},${to},${curve}>`;
    try {
      const response = await this.http.get(poolUrl);
      return !!response?.data?.type;
    } catch (error) {
      return false;
    }
  }

  getAccountTxs(
    address: string,
    limit = 25,
    start = 1,
    options?: RequestOptions,
  ) {
    const _options = computeRequestOptions(options);
    const config = computeAxiosConfig(_options);

    return this.wrapOptimisticError(
      () =>
        this.http.get(`/accounts/${address}/transactions`, {
          params: { limit, start },
          ...config,
        }),
      [],
      _options,
    );
  }

  getTxs(limit = 25, start = 1, options?: RequestOptions) {
    const _options = computeRequestOptions(options);
    const config = computeAxiosConfig(_options);

    return this.wrapOptimisticError(
      () =>
        this.http.get('/transactions', { params: { limit, start }, ...config }),
      [],
      _options,
    );
  }

  getTx(hash: string, options?: RequestOptions) {
    const _options = computeRequestOptions(options);
    const config = computeAxiosConfig(_options);

    return this.wrapOptimisticError(
      () => this.http.get(`/transactions/by_hash/${hash}`, config),
      undefined,
      _options,
    );
  }

  getAccountModule(address: string, module: string, options?: RequestOptions) {
    const _options = computeRequestOptions(options);
    const config = computeAxiosConfig(_options);

    return this.wrapOptimisticError(
      () => this.http.get(`/accounts/${address}/module/${module}`, config),
      undefined,
      _options,
    );
  }

  createSignMessage(tx: any, options?: RequestOptions) {
    const _options = computeRequestOptions(options);
    const config = computeAxiosConfig(_options);

    const promise = this.http
      .post('/transactions/signing_message', tx, config)
      .then((r: any) => r.data.message);

    if (_options?.cancelToken) {
      return {
        request: promise,
        cancel: _options.cancelToken.cancel,
      };
    }

    return promise;
  }

  getTableRow(
    handle: string,
    payload: {
      key_type: string;
      value_type: string;
      key: string;
    },
    options?: RequestOptions,
  ) {
    const _options = computeRequestOptions(options);
    const config = computeAxiosConfig(_options);

    const url = `/tables/${handle}/item`;
    const promise = this.http
      .post(url, payload, config)
      .then((r: any) => r.data)
      .catch(() => {
        return false;
      });

    if (_options?.cancelToken) {
      return {
        request: promise,
        cancel: _options.cancelToken.cancel,
      };
    }

    return promise;
  }

  simulateTransaction(data: any) {
    return this.http.post('/transactions/simulate', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private wrapOptimisticError<T = any>(
    cb: () => Promise<any>,
    defaultValue?: any,
    options?: ComposedRequestOptions,
  ):
    | Promise<T | typeof defaultValue>
    | { request: Promise<T | typeof defaultValue>; cancel: Canceler } {
    const promise = cb()
      .then((r: any) => r.data)
      .catch((_reason: any) => {
        return defaultValue;
      });

    if (options?.cancelToken) {
      return {
        request: promise,
        cancel: options.cancelToken.cancel,
      };
    }

    return promise;
  }
}
