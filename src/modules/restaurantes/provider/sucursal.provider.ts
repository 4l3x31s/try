import { Injectable } from '@nestjs/common';
import { Sucursal } from '../../../model/Sucursal';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SucursalProvider {
    constructor(
        @InjectRepository(Sucursal)
        private readonly sucursalRepository: Repository<Sucursal>,
    ) {}
    
    create(sucursal: Sucursal): Promise<Sucursal> {
        return this.sucursalRepository.save(sucursal);
    }
    
    async findAll(): Promise<Sucursal[]> {
        return this.sucursalRepository.find();
    }
    
    findOne(id: string): Promise<Sucursal> {
        return this.sucursalRepository.findOne(id);
    }
    
    async remove(id: string): Promise<void> {
        await this.sucursalRepository.delete(id);
    }
}
