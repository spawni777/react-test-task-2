import { useEffect, useState } from 'react';
import { getTasks } from '@/api';
import { ITask } from '@/types/task';
import { addFakeTaskData } from '@/utils/fakeTaskData';

const useTasks = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [page, setPage] = useState(1);

  const [hasMoreTasks, setHasMoreTasks] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const getMoreTasks = async () => {
    if (!hasMoreTasks) return;
    setIsLoading(true);

    try {
      const response = await getTasks(page);
      let tasks = response.data;

      if (!tasks.length) {
        setHasMoreTasks(false);
        setIsLoading(false);
        return;
      }

      tasks = tasks.map(task => addFakeTaskData(task));

      setTasks((prevTasks) => [...prevTasks, ...tasks]);
      setPage((prevPage) => (prevPage + 1))
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getMoreTasks()
      .then(() => {
        console.log('Initial tasks was fetched successfully!');
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const setTaskField = <Field extends keyof ITask>(taskId: ITask['id'], field: Field , value: ITask[Field]) => {
    setTasks((prevTasks) => {
      const index = prevTasks.findIndex(task => task.id === taskId);

      if (~index) {
        prevTasks[index][field] = value;
      }

      return [...prevTasks];
    })
  }

  return {tasks, getMoreTasks, hasMoreTasks, isLoading, setTaskField};
}

export default useTasks;
