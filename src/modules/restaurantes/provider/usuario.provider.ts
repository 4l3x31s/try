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
        try {
            usuario.fechaRegistro = new Date();
            return this.usuarioRepository.save(usuario);
        } catch (error) {
            return error;
        }
        
    }
    
    async findAll(): Promise<Usuario[]> {
        return this.usuarioRepository.find();
    }
    
    async findOne(id: string): Promise<Usuario> {
        return await this.usuarioRepository.findOne(id);
    }
    async findCorreo(correo: string): Promise<Usuario> {
        return await this.usuarioRepository.findOne({where: {correo: correo}});
    }

    async findCelular(celular: string): Promise<Usuario> {
        return await this.usuarioRepository.findOne({where: {celular: celular}});
    }
    
    async remove(id: string): Promise<void> {
        await this.usuarioRepository.delete(id);
    }

    async login(correo:string, pass:string): Promise<Usuario> {
        // return await this.usuarioRepository.query(`SELECT USUARIO FROM USUARIO U WHERE U.USUARIO= $1 AND U.PASS = $2`, [usuario, pass]);
        return await this.usuarioRepository.findOne({correo:correo, pass: pass, estado: true}, {select:['nombre', 'celular', 'id', 'valor']});
    }

}
