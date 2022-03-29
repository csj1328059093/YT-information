import {request} from 'umi';

export async function fakeSubmitForm(params) {
  return request('http://yuetuxinxi.com:3000/api/issueWork', {
    method: 'POST',
    data: params,
  });
}
