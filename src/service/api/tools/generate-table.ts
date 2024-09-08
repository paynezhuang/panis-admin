import { request } from '@/service/request';

// =============== Generate Table Begin ===============

/** get generate table list */
export function fetchGetGeneratorTableList(params?: Api.Tools.GeneratorTableSearchParams) {
  return request<Api.Tools.GeneratorTableList>({
    url: '/tool_generator_table/page',
    method: 'GET',
    params
  });
}

/** get generate table info */
export function fetchGetEditGeneratorTable(id: string) {
  return request<Api.Tools.GeneratorTableEdit>({
    url: `/tool_generator_table/${id}`,
    method: 'GET'
  });
}

/** add generate table info */
export function fetchAddGeneratorTable(data: Api.Tools.GeneratorTableEdit) {
  return request<boolean>({
    url: '/tool_generator_table/',
    method: 'POST',
    data
  });
}

/** update generate table info */
export function fetchUpdateGeneratorTableInfo(data: Api.Tools.GeneratorTableEdit) {
  return request<boolean>({
    url: '/tool_generator_table/',
    method: 'PUT',
    data
  });
}

/** delete generate table */
export function fetchDeleteGeneratorTable(data: Api.Common.DeleteParams) {
  return request<boolean>({
    url: '/tool_generator_table/',
    method: 'DELETE',
    data
  });
}

/** zip code generate */
export function fetchZipCodeGenerate(tableId: string) {
  return request<boolean, 'blob'>({
    url: `/tool_generator_table/zip/${tableId}`,
    method: 'POST',
    responseType: 'blob'
  });
}

// =============== Generate Table End ===============
