import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: 'gqefqw',
      title: 'hello world',
      description: 'hello',
      status: TaskStatus.DONE,
    },
  ];

  getAllTasks() {
    return this.tasks;
  }

  getSingleTask(id: string): Task {
    const task = this.tasks.find((elem) => elem.id == id);
    return task;
  }

  getFilteredTasks(query: GetTasksFilterDto): Task[] {
    const result = this.getAllTasks();
    if (query.search) {
      result.filter(
        (task) =>
          task.title.includes(query.search) ||
          task.description.includes(query.search),
      );
      console.log(result);
    }
    if (query.status) {
      result.filter((task) => task.status == query.status);
    }
    return result;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
