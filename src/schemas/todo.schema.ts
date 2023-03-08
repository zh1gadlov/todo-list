import * as mongoose from 'mongoose';
import { User } from './users.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TodoList extends Document {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    owner: User;

    @Prop()
    title: string;
    
    @Prop()
    description: string;
}

export const TodoListSchema = SchemaFactory.createForClass(TodoList);
