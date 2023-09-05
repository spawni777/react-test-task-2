import styles from '@/styles/app.module.scss';
import svgPlus from '@/assets/plus_button.svg';
import useTasks from '@/hooks/useTasks';
import Task from '@/components/Task';
import { ITask } from '@/types/task';
import { useCallback } from 'react';
import useInfinityScroll from '@/hooks/useInfinityScroll';

function App() {
  const {
    tasks,
    hasMoreTasks,
    setTaskField,
    isLoading,
    getMoreTasks,
  } = useTasks();

  const { lastItemRef } = useInfinityScroll(isLoading, hasMoreTasks, getMoreTasks);

  const loadedTasksNumber = tasks.length;
  const setTaskCompleted = useCallback((id: ITask['id'], isCompleted: boolean) => {
    setTaskField(id, 'completed', isCompleted);
  }, []);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          Today
        </div>
        <div className={styles.headerInfo}>
          <div className={styles.headerButton}>
            <img src={svgPlus} alt="plus"/>
          </div>
          <div className={styles.headerTasksNumber}>
            {loadedTasksNumber}
          </div>
        </div>
      </header>

      <main className={styles.tasks}>
        {tasks.map((task, index) => {
          if (index === tasks.length - 1) {
            return <Task
              key={task.id}
              {...task}
              onCheckboxChange={setTaskCompleted}
              ref={lastItemRef}
            />;
          }
          return <Task
            key={task.id}
            {...task}
            onCheckboxChange={setTaskCompleted}
          />
        })}
      </main>
    </div>
  )
}

export default App;
