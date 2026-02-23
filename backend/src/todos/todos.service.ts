import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo)
        private todosRepository: Repository<Todo>,
    ) { }

    findAll(): Promise<Todo[]> {
        return this.todosRepository.find({
            order: {
                createdAt: 'DESC',
            }
        });
    }

    async findOne(id: number): Promise<Todo> {
        const todo = await this.todosRepository.findOneBy({ id });
        if (!todo) {
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }
        return todo;
    }

    create(createTodoDto: CreateTodoDto): Promise<Todo> {
        const newTodo = this.todosRepository.create(createTodoDto);
        return this.todosRepository.save(newTodo);
    }

    async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
        const todo = await this.findOne(id);
        const updatedTodo = Object.assign(todo, updateTodoDto);
        return this.todosRepository.save(updatedTodo);
    }

    async remove(id: number): Promise<void> {
        const todo = await this.findOne(id);
        await this.todosRepository.remove(todo);
    }
}
