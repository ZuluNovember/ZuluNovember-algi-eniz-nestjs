import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() query: GetTasksFilterDto): Task[] {
    if (query) return this.taskService.getFilteredTasks(query);
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  getSingleTask(@Param('id') id: string): Task {
    return this.taskService.getSingleTask(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }
}
