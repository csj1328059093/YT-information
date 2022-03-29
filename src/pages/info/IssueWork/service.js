import {request} from 'umi';

export async function fakeSubmitForm(params) {
  return request('/api/issueWork', {
    method: 'POST',
    data: params,
  });
}
