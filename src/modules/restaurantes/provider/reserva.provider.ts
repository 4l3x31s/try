import { Injectable } from '@nestjs/common';
import { Reserva } from '../../../model/Reserva';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReservaProvider {
    constructor(
        @InjectRepository(Reserva)
        private readonly reservaRepository: Repository<Reserva>,
    ) {}
    
    create(reserva: Reserva): Promise<Reserva> {
        return this.reservaRepository.save(reserva);
    }
    
    async findAll(): Promise<Reserva[]> {
        return this.reservaRepository.find();
    }
    
    findOne(id: string): Promise<Reserva> {
        return this.reservaRepository.findOne(id);
    }
    
    async remove(id: string): Promise<void> {
        await this.reservaRepository.delete(id);
    }
}
