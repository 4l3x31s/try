import { Injectable } from '@nestjs/common';
import { Empresa } from '../../../model/Empresa';
import { Repository, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Sucursal } from '../../../model/Sucursal';
import { RegEmpresa } from '../../../dto/request/RegEmpresa';


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

    async regEmpresa(empresa: Empresa, sucursal: Sucursal): Promise<RegEmpresa> {
        /*try{
            let resp:RegEmpresa = <RegEmpresa>{};
        
            let empresa2: Empresa = await this.empresaRepository.save(empresa);
            sucursal.idEmpresa = empresa2.id;
            let sucursal2:Sucursal = await this.sucursalRepository.save(sucursal);
            resp.empresa = empresa2;
            resp.sucursal = sucursal2;
            return resp;
        }catch(err){
            console.log(err);
            return err;
        }*/
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
            // execute some operations on this transaction:
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
            resp.mensaje = err.sqlMessage;
            await queryRunner.rollbackTransaction();
        } finally {
            // you need to release query runner which is manually created:
            await queryRunner.release();
            return resp;
        }
        

        /*
        let respuesta: RegEmpresa = await this.empresaRepository.manager.transaction(async (transactionManager) => {
            let resp:RegEmpresa = <RegEmpresa>{};
            let empresa2: Empresa = await this.empresaRepository.save(empresa);
            sucursal.idEmpresa = empresa2.id;
            let sucursal2:Sucursal = await this.sucursalRepository.save(sucursal);
            resp.empresa = empresa2;
            resp.sucursal = sucursal2;
            return resp;
        });
        return respuesta;*/
        /*return await getManager().transaction(async transactionalEntityManager => {
            let empresa2: Empresa = await transactionalEntityManager.save<Empresa>(empresa);
            let sucursal2:Sucursal = await transactionalEntityManager.save<Sucursal>(sucursal);
            let resp:RegEmpresa = <RegEmpresa>{};
            resp.empresa = empresa2;
            resp.sucursal = sucursal2;
            return resp;
        });*/
        
        /*console.log(empresa);
        console.log(sucursal);
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        let empresa2: Empresa = new Empresa();
        let sucursal2: Sucursal = new Sucursal();
        try {
            empresa2 = empresa;
            sucursal2 = sucursal;
            console.log("1");
            empresa2 = await queryRunner.manager.save<Empresa>(empresa2);
            console.log("2");
            console.log(empresa2);
            sucursal.idEmpresa  = empresa2.id;
            sucursal2 = await queryRunner.manager.save<Sucursal>(sucursal2);
            console.log(sucursal2);
            await queryRunner.commitTransaction();
          } catch (err) {
            // since we have errors lets rollback the changes we made
            console.log(err);
            await queryRunner.rollbackTransaction();
          } finally {
            // you need to release a queryRunner which was manually instantiated
            await queryRunner.release();
            
          }
          resp.empresa = empresa2;
          resp.sucursal = sucursal2;
          return resp;*/
          
    }
}
