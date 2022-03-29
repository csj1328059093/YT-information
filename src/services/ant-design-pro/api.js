// @ts-ignore

/* eslint-disable */
import {request} from 'umi';
import sha1 from 'sha1';
import {getLocalStorage} from '@/utils/localstorage'

/** 获取当前的用户 GET /api/currentUser */

export async function currentUser(options) {
  const sessionId = getLocalStorage('sessionId')
  return request('http://yuetuxinxi.com:3000/api/currentUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {sessionId},
  });
}

/** 退出登录接口 POST /api/login/outLogin */

export async function outLogin(options) {
  const sessionId = getLocalStorage('sessionId')
  return request('http://yuetuxinxi.com:3000/api/login/outLogin', {
    method: 'POST',
    data: {sessionId},
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */

export async function login(params, options) {
  const {password, ...other} = params;
  return request('http://yuetuxinxi.com:3000/api/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {...other, password: sha1(password)},
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */

export async function getNotices(options) {
  return request('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */

export async function rule(params, options) {
  return request('/api/rule', {
    method: 'GET',
    params: {...params},
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */

export async function updateRule(options) {
  return request('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */

export async function addRule(options) {
  return request('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */

export async function removeRule(options) {
  return request('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
