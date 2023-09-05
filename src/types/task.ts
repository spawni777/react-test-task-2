export interface ITask {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  description?: string;
  startDate: number;
  endDate: number;
  tags: [string, string];
}
