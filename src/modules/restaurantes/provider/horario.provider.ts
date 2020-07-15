import { Injectable } from '@nestjs/common';
import { Horario } from '../../../model/Horario';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HorarioProvider {
    constructor(
        @InjectRepository(Horario)
        private readonly horarioRepository: Repository<Horario>,
    ) {}
    
    create(horario: Horario): Promise<Horario> {
        return this.horarioRepository.save(horario);
    }
    
    async findAll(): Promise<Horario[]> {
        return this.horarioRepository.find();
    }
    
    findOne(id: string): Promise<Horario> {
        return this.horarioRepository.findOne(id);
    }
    
    async remove(id: string): Promise<void> {
        await this.horarioRepository.delete(id);
    }
}
