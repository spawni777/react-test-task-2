import { ITask } from '@/types/task';
import { generateDescription, generateFutureDate, generatePastDate, generateTagName } from '@/utils/fakeData';

export const addFakeTaskData = (task: ITask) => {
  task.description = generateDescription();
  task.tags = [generateTagName(), generateTagName()];
  task.startDate = generatePastDate();
  task.endDate = generateFutureDate();

  return task;
}
