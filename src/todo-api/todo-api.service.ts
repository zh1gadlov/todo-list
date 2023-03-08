import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { TodoList } from '../schemas/todo.schema';


@Injectable()
export class ToDoService {
  constructor(
    @InjectModel(TodoList.name) private readonly todoModel: Model<TodoList>
  ){}

  async find(owner: string): Promise<any> {
    return await this.todoModel.find( { owner }  );  
  }

  async delete(id: string, owner: string): Promise<any> {
    const todo = await this.todoModel.findOne( { id } );  
    if (todo.owner._id == owner){
        return await this.todoModel.deleteOne( { id } );  
    }
    return new HttpException("U are not an owner", HttpStatus.BAD_REQUEST)
  }

  async create(createToDoDto: any, user: any): Promise<TodoList> {
    console.log(user.id.toString());
    
    const createdTodo = new this.todoModel({...createToDoDto, owner: user.id});
    return createdTodo.save();
  }

}