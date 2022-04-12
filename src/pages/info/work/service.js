import {request} from 'umi';

export async function queryProjectNotice(params) {
  return request('/api/workInfo', {
    method: 'POST',
    data: {...params},
  });
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function fakeChartData() {
  return request('/api/fake_workplace_chart_data');
}
