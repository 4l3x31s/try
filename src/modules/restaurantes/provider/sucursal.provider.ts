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
    
    async findOne(id: string): Promise<Sucursal> {
        return await this.sucursalRepository.findOne(id);
    }
    
    async remove(id: string): Promise<void> {
        await this.sucursalRepository.delete(id);
    }
    async findSucursalUsuario(id: string): Promise<Sucursal> {
        // return await this.usuarioRepository.query(`SELECT USUARIO FROM USUARIO U WHERE U.USUARIO= $1 AND U.PASS = $2`, [usuario, pass]);
        return await this.sucursalRepository.findOne({idUsuario: id, estado: true});
    }
    async findSucursalCiudad(idCiudad: number): Promise<Sucursal[]> {
        return await this.sucursalRepository.find({idCiudad: idCiudad, estado: true});
    }

    async findSucursalByEmpresa(idEmpresa: string): Promise<Sucursal[]> {
        return this.sucursalRepository.find({where: { idEmpresa: idEmpresa, estado: true}});
    }
}
