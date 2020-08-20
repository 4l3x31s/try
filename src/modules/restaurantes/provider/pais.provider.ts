
import { Pais } from '../../../model/Pais';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PaisProvider {
    constructor(
        @InjectRepository(Pais)
        private readonly paisRepository: Repository<Pais>,
    ) {}
    
    create(pais: Pais): Promise<Pais> {
        return this.paisRepository.save(pais);
    }
    
    async findAll(): Promise<Pais[]> {
        return this.paisRepository.find({estado:true});
    }
    
    findOne(id: string): Promise<Pais> {
        return this.paisRepository.findOne(id);
    }
    
    async remove(id: string): Promise<void> {
        await this.paisRepository.delete(id);
    }
}
