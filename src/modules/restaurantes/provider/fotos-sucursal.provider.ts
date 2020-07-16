import { Injectable } from '@nestjs/common';
import { FotoSucursal } from '../../../model/FotoSucursal';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class FotosSucursalProvider {
    constructor(
        @InjectRepository(FotoSucursal)
        private readonly menuRepository: Repository<FotoSucursal>,
    ) {}
    
    create(menu: FotoSucursal): Promise<FotoSucursal> {
        return this.menuRepository.save(menu);
    }
    
    async findAll(): Promise<FotoSucursal[]> {
        return this.menuRepository.find();
    }
    
    findOne(id: string): Promise<FotoSucursal> {
        return this.menuRepository.findOne(id);
    }
    
    async remove(id: string): Promise<void> {
        await this.menuRepository.delete(id);
    }
}
