import { Injectable } from '@nestjs/common';
import { MenuReserva } from '../../../model/MenuReserva';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MenuReservaProvider {
    constructor(
        @InjectRepository(MenuReserva)
        private readonly menuReservaRepository: Repository<MenuReserva>,
    ) {}
    
    create(menuReserva: MenuReserva): Promise<MenuReserva> {
        return this.menuReservaRepository.save(menuReserva);
    }
    
    async findAll(): Promise<MenuReserva[]> {
        return this.menuReservaRepository.find();
    }
    
    findOne(id: string): Promise<MenuReserva> {
        return this.menuReservaRepository.findOne(id);
    }
    
    async remove(id: string): Promise<void> {
        await this.menuReservaRepository.delete(id);
    }
}
