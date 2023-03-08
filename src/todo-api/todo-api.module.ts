import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { TodoList, TodoListSchema  } from '../schemas/todo.schema';
import { ToDoApiController } from './todo-api.controller';
import { ToDoService } from './todo-api.service';

@Module({
  imports: [MongooseModule.forFeature([{name: TodoList.name, schema: TodoListSchema}])],
  providers: [ToDoService],
  exports: [ToDoService],
  controllers: [ToDoApiController]
})
export class ToDoModule {}