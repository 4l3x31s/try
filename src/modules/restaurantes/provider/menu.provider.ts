import { Injectable } from '@nestjs/common';
import { Menu } from '../../../model/Menu';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MenuProvider {
    constructor(
        @InjectRepository(Menu)
        private readonly menuRepository: Repository<Menu>,
    ) {}
    
    create(menu: Menu): Promise<Menu> {
        return this.menuRepository.save(menu);
    }
    
    async findAll(): Promise<Menu[]> {
        return this.menuRepository.find({estado: true});
    }

    async findBySucursal(idSucursal: string): Promise<Menu[]> {
        return this.menuRepository.find({idSucursal: idSucursal, estado: true});
    }
    
    findOne(id: string): Promise<Menu> {
        return this.menuRepository.findOne(id);
    }
    
    async remove(id: string): Promise<void> {
        await this.menuRepository.delete(id);
    }
}
