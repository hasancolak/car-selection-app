import { SERVER_URL, API_RETRY } from "../utils/constants";

/**
 * @function get
 * @param  {string} path
 * @param  {string} query?
 * @returns Promise
 */
export async function get(path: string, query?: string): Promise<string[]> {
  try {
    return await retryOnFail<string[]>(() => getFetch<string[]>(path, query));
  } catch (e) {
    throw e;
  }
}

/**
 * @function getFetch
 * @param  {string} path
 * @param  {string} query?
 * @returns Promise
 */
export async function getFetch<T>(path: string, query?: string): Promise<T> {
  try {
    const response = await fetch(
      `${SERVER_URL}${path}${query ? `?${new URLSearchParams(query)}` : ""}`,
      { method: "GET" }
    );
    return (await response.json()) as T;
  } catch (e) {
    throw e;
  }
}

/**
 * @function retryOnFail
 * @param  {function} callback
 * @param  {number} count
 * @returns Promise
 */
export function retryOnFail<T>(
  callback: () => Promise<T>,
  count = 1
): Promise<T> {
  return new Promise((resolve, reject) => {
    callback()
      .then(resolve)
      .catch((error) => {
        if (count < API_RETRY.maxCount) {
          setTimeout(() => {
            resolve(retryOnFail(callback, count + 1));
          }, API_RETRY.retryTime * count);
        } else {
          reject(error);
        }
      });
  });
}
