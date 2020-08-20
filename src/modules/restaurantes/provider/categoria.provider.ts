import { Injectable } from '@nestjs/common';
import { Categoria } from '../../../model/Categoria';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriaProvider {
    constructor(
        @InjectRepository(Categoria)
        private readonly categoriaRepository: Repository<Categoria>,
    ) {}
    
    create(categoria: Categoria): Promise<Categoria> {
        return this.categoriaRepository.save(categoria);
    }
    
    findAll(): Promise<Categoria[]> {
        return this.categoriaRepository.find({estado: true});
    }
    
    findOne(id: string): Promise<Categoria> {
        return this.categoriaRepository.findOne(id, {where: {estado: true}});
    }
    
    async remove(id: string): Promise<void> {
        await this.categoriaRepository.delete(id);
    }
}
