import { Injectable } from '@nestjs/common';
import { Usuario } from '../../../model/Usuario';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioProvider {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
    ) {}
    
    create(usuario: Usuario): Promise<Usuario> {
        return this.usuarioRepository.save(usuario);
    }
    
    async findAll(): Promise<Usuario[]> {
        return this.usuarioRepository.find();
    }
    
    async findOne(id: string): Promise<Usuario> {
        return await this.usuarioRepository.findOne(id);
    }
    
    async remove(id: string): Promise<void> {
        await this.usuarioRepository.delete(id);
    }

    async login(correo:string, pass:string): Promise<Usuario> {
        // return await this.usuarioRepository.query(`SELECT USUARIO FROM USUARIO U WHERE U.USUARIO= $1 AND U.PASS = $2`, [usuario, pass]);
        return await this.usuarioRepository.findOne({correo:correo, pass: pass, estado: true}, {select:['nombre', 'celular', 'id']});
    }

}
