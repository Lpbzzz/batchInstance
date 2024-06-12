import { request } from '@@/plugin-request';
export const rulesRequest = (data: any) => {
  return request('/api/rules', {
    method: 'POST',
    data: {
      ids: data,
    },
  });
};
