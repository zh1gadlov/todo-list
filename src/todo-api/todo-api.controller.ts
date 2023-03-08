import { Controller, Body, Request, Post, UseGuards, Get, Delete } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import { JWTAuthGuard } from '../auth/guards/jwt.auth.guard';
import { ToDoService } from './todo-api.service';

interface ICreateToDo {
    title: string;
    description: string;
}

interface IDeleteToDo {
    id: string;
}

@ApiTags("todo")
@Controller("todo")
@UseGuards()
export class ToDoApiController {
    constructor(
        private toDoService: ToDoService
    ){}

    @UseGuards(JWTAuthGuard)
    @Post('/create')
    async create(@Body() createReq: ICreateToDo, @Request() req){
        return { id: (await this.toDoService.create(createReq, req.user))._id }
    }

   
    @UseGuards(JWTAuthGuard)
    @Get('/get')
    async get( @Request() req){
        return await this.toDoService.find(req.user.id)
    }

    @UseGuards(JWTAuthGuard)
    @Delete('/delete')
    async delete(@Body() createReq: IDeleteToDo, @Request() req){
        return await this.toDoService.delete(createReq.id, req.user.id)
    }

}