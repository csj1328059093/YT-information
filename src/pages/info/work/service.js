import { request } from 'umi';
export async function queryProjectNotice() {
  return request('http://yuetuxinxi.com:3000/api/workInfo');
}
export async function queryActivities() {
  return request('/api/activities');
}
export async function fakeChartData() {
  return request('/api/fake_workplace_chart_data');
}
