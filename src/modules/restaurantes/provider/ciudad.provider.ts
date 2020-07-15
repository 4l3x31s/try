import { Ciudad } from './../../../model/Ciudad';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CiudadProvider {
    constructor(
        @InjectRepository(Ciudad)
        private readonly ciudadRepository: Repository<Ciudad>,
    ) {}
    
    create(ciudad: Ciudad): Promise<Ciudad> {
        return this.ciudadRepository.save(ciudad);
    }
    
    async findAll(): Promise<Ciudad[]> {
        return this.ciudadRepository.find();
    }
    
    findOne(id: string): Promise<Ciudad> {
        return this.ciudadRepository.findOne(id);
    }
    
    async remove(id: string): Promise<void> {
        await this.ciudadRepository.delete(id);
    }
}
