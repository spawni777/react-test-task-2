import axios, { AxiosResponse } from 'axios';
import { ITask } from '@/types/task';

export const getTasks = (page: number): Promise<AxiosResponse<ITask[]>> => {
  return axios.get<ITask[]>(`https://jsonplaceholder.typicode.com/todos?_page=${ page }`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
