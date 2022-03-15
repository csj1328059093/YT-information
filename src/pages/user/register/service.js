import { request } from 'umi';
import sha1 from 'sha1';

export async function fakeRegister(params) {
  const { password, ...other } = params;
  return request('http://yuetuxinxi.com:3000/api/register', {
    method: 'POST',
    data: { ...other, password: sha1(password) },
  });
}

export async function checkSendNote(params) {
  return request('http://yuetuxinxi.com:3000/api/checkSendNote', {
    method: 'POST',
    data: params,
  });
}
