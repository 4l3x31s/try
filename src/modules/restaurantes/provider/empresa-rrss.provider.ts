import { Injectable } from '@nestjs/common';
import { EmpresaRrss } from '../../../model/EmpresaRrss';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmpresaRrssProvider {
    constructor(
        @InjectRepository(EmpresaRrss)
        private readonly empresaRssRepository: Repository<EmpresaRrss>,
    ) {}
    
    create(empresaRss: EmpresaRrss): Promise<EmpresaRrss> {
        return this.empresaRssRepository.save(empresaRss);
    }
    
    async findAll(): Promise<EmpresaRrss[]> {
        return this.empresaRssRepository.find();
    }
    
    findOne(id: string): Promise<EmpresaRrss> {
        return this.empresaRssRepository.findOne(id);
    }
    
    async remove(id: string): Promise<void> {
        await this.empresaRssRepository.delete(id);
    }
}
