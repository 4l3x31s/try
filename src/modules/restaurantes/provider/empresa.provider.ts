import { Injectable } from '@nestjs/common';
import { Empresa } from '../../../model/Empresa';
import { Repository, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Sucursal } from '../../../model/Sucursal';
import { RegEmpresa } from '../../../dto/request/RegEmpresa';
import { Usuario } from '../../../model/Usuario';


@Injectable()
export class EmpresaProvider {
    constructor(
        @InjectRepository(Empresa)
        private readonly empresaRepository: Repository<Empresa>,
    ) {}
    
    create(empresa: Empresa): Promise<Empresa> {
        return this.empresaRepository.save(empresa);
    }
    
    async findAll(): Promise<Empresa[]> {
        return this.empresaRepository.find();
    }
    
    findOne(id: string): Promise<Empresa> {
        return this.empresaRepository.findOne(id);
    }
    
    
    async remove(id: string): Promise<void> {
        await this.empresaRepository.delete(id);
    }

    async regEmpresa(empresa: Empresa, sucursal: Sucursal, usuario: Usuario): Promise<RegEmpresa> {

        let fecha: Date = new Date();
        usuario.fechaRegistro = fecha;
        usuario.valor = 2;
        usuario.estado = true;

        sucursal.fechaRegistro = fecha;
        sucursal.estado = true;

        empresa.fechaRegistro = fecha;
        empresa.estado = true;

        let resp:RegEmpresa = <RegEmpresa>{};
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();

        // establish real database connection using our new query runner
        await queryRunner.connect();

        // now we can execute any queries on a query runner, for example:
        //await queryRunner.query("SELECT * FROM users");

        // we can also access entity manager that works with connection created by a query runner:
        //const users = await queryRunner.manager.find(User);

        // lets now open a new transaction:
        await queryRunner.startTransaction();

        try {
            const empresaRepository = queryRunner.manager.getRepository(Empresa);
            const sucursalRepository = queryRunner.manager.getRepository(Sucursal);
            const usuarioRepository = queryRunner.manager.getRepository(Usuario);
            // execute some operations on this transaction:

            let usuario2: Usuario = await usuarioRepository.save(usuario);
            console.log(usuario2);
            sucursal.idUsuario = usuario2.id;

            let empresa2: Empresa = await empresaRepository.save(empresa);
            console.log(empresa2);
            sucursal.idEmpresa = empresa2.id;
            let sucursal2: Sucursal = await sucursalRepository.save(sucursal);
            console.log(sucursal2);
            resp.empresa = empresa2;
            resp.sucursal = sucursal2;
            // commit transaction now:
            await queryRunner.commitTransaction();
            resp.estado = true;
            resp.mensaje = null;
        } catch (err) {
            console.log(err);
            // since we have errors let's rollback changes we made
            resp.estado = false;
            if(err.code === 'ER_DUP_ENTRY'){
                resp.mensaje = 'El nit ingresado ya se encuentra registrado.';
            }else if(err.code === 'ER_BAD_NULL_ERROR'){
                resp.mensaje = 'No ingresaron todos los datos solicitados.';
            }else{
                resp.mensaje = err.sqlMessage;
            }
            
            
            await queryRunner.rollbackTransaction();
        } finally {
            // you need to release query runner which is manually created:
            await queryRunner.release();
            return resp;
        }
    }
}
