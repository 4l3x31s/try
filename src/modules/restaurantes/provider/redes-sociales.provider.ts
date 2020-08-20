import { Injectable } from '@nestjs/common';
import { RedesSociales } from '../../../model/RedesSociales';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RedesSocialesProvider {
    constructor(
        @InjectRepository(RedesSociales)
        private readonly redesSocialesRepository: Repository<RedesSociales>,
    ) {}
    
    create(redesSociales: RedesSociales): Promise<RedesSociales> {
        return this.redesSocialesRepository.save(redesSociales);
    }
    
    async findAll(): Promise<RedesSociales[]> {
        return this.redesSocialesRepository.find();
    }
    
    findOne(id: string): Promise<RedesSociales> {
        return this.redesSocialesRepository.findOne(id);
    }
    
    async remove(id: string): Promise<void> {
        await this.redesSocialesRepository.delete(id);
    }
}
