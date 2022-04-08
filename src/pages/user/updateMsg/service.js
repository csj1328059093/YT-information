import { request } from 'umi';
import sha1 from 'sha1';

export async function fakeRegister(params) {
  const { password, ...other } = params;
  return request('/api/updateMsg', {
    method: 'POST',
    data: { ...other, password: sha1(password) },
  });
}

export async function checkSendNote(params) {
  return request('/api/updateSendNote', {
    method: 'POST',
    data: params,
  });
}
