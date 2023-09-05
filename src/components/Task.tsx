import styles from '@/styles/components/task.module.scss';
import { ITask } from '@/types/task';
import formatDate from '@/utils/formatDate';
import { ChangeEvent, CSSProperties, forwardRef, memo, RefAttributes } from 'react';
import taskImage from '@/assets/taskImage.png';
import tagRectangle from '@/assets/tagRectangle.svg';

export type TaskProps = Omit<ITask, 'userId'> & {
  onCheckboxChange: (id: ITask['id'], isCompleted: boolean) => void;
  style?: CSSProperties,
}

const TaskComponent = forwardRef<HTMLElement, TaskProps>(({
  title,
  completed,
  startDate,
  endDate,
  description,
  tags,
  id,
  onCheckboxChange,
  style = {},
}: TaskProps, ref) => {
  const formattedStartDate = formatDate(startDate);
  const formattedEndData = formatDate(endDate);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(id, event.target.checked);
  }

  return (
    <article className={styles.task} ref={ref} style={style}>
      <div className={styles.taskContent}>
        <div className={styles.taskHeader}>
          <input
            defaultChecked={completed}
            onChange={onInputChange}
            className={styles.taskCheckbox}
            type="checkbox"
          />
          <div className={styles.taskTitle}>
            {title}
          </div>
        </div>

        <div className={styles.taskBody}>
          <div className={styles.taskDates}>
            <div className={styles.taskDate}>
              {formattedStartDate}
            </div>
            <div className={styles.taskDate}>
              {formattedEndData}
            </div>
          </div>
          <div className={styles.taskDescription}>{description}</div>
        </div>

        <div className={styles.taskFooter}>
          <div className={styles.taskTags}>
            <div className={styles.taskTag}>
              <span>{tags[0]}</span>
            </div>
            <div className={styles.taskTag}>
              <div>{tags[1]}</div>
              <img src={tagRectangle} alt="rectangle"/>
            </div>
          </div>
          <div className={styles.taskCreator}>
            <img src={taskImage} alt="creator"/>
          </div>
        </div>
      </div>
    </article>
  )
})

const Task = memo<TaskProps & RefAttributes<HTMLElement>>(TaskComponent);

export default Task;
