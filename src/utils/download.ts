import type { AxiosResponse } from 'axios';

/**
 * Download a blob from an Axios response
 *
 * @author payne.zhuang [paynezhuang@gmail.com](mailto:paynezhuang@gmail.com)
 * @param response - The Axios response
 * @param defaultFileName - The default file name
 */
export function downloadBlob(response: AxiosResponse, defaultFileName?: string) {
  // get file name from response headers
  const contentDisposition = response.headers['content-disposition'];

  // file name is the value after 'filename='
  // Extract file name from Content-Disposition header or use default
  const fileName = defaultFileName || contentDisposition?.match(/filename="?(.+?)"?(?:;|$)/i)?.[1]?.trim() || 'download';

  // create a blob url
  const url = window.URL.createObjectURL(response.data as Blob);

  // create a link element
  const link = document.createElement('a');

  // set the link href
  link.href = url;
  link.download = fileName;

  // append the link to the body
  document.body.appendChild(link);

  // click the link
  link.click();

  // remove the link from the body
  document.body.removeChild(link);

  // revoke the blob url
  window.URL.revokeObjectURL(url);
}
