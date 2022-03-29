import {request} from 'umi';
import {getLocalStorage} from "@/utils/localstorage";

export async function queryCurrent() {
  const sessionId = getLocalStorage('sessionId')
  return request('/api/currentUser', {
    method: 'post',
    header: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({sessionId})
  });
}

export async function queryFakeList(params) {
  return request('/api/fake_list_Detail', {
    params,
  });
}
