
import { Injectable } from '@nestjs/common';
import { Reserva } from '../../../model/Reserva';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection, MoreThan } from 'typeorm';
import { MenuReserva } from '../../../model/MenuReserva';
import { ResponseGlobal } from '../../../dto/response/ResponseGlobal';
import moment = require('moment');

@Injectable()
export class ReservaProvider {
    constructor(
        @InjectRepository(Reserva)
        private readonly reservaRepository: Repository<Reserva>,
        @InjectRepository(MenuReserva)
        private readonly menuReservaRepository: Repository<MenuReserva>
    ) {}
    
    create(reserva: Reserva): Promise<Reserva> {
        return this.reservaRepository.save(reserva);
    }
    
    async findAll(): Promise<Reserva[]> {
        return this.reservaRepository.find();
    }
    
    findOne(id: string): Promise<Reserva> {
        return this.reservaRepository.findOne(id);
    }
    
    
    async remove(id: string): Promise<void> {
        await this.reservaRepository.delete(id);
    }
    async listarMenuReserva(idReserva): Promise<any[]> {
        // return await this.usuarioRepository.query(`SELECT USUARIO FROM USUARIO U WHERE U.USUARIO= $1 AND U.PASS = $2`, [usuario, pass]);
        return await this.menuReservaRepository.query(`SELECT mr.cantidad, mr.detalle, me.descripcion 
                                                         FROM menu_reserva mr, menu me
                                                        WHERE mr.id_reserva = $1
                                                          AND mr.id_menu = me.id`, [idReserva]);
    }
    listarReservasDia(idSucursal: string): Promise<Reserva[]>{
        console.log(__dirname);
        let fechaActual = moment();
        console.log(fechaActual.format('HH:MM'));
        return this.reservaRepository.find(
            {
                relations: ['MenuReserva'],
                where: {idSucursal: idSucursal, estado: 1, fecha: fechaActual.format('YYYY-MM-DD'), hora: MoreThan(fechaActual.format('HH:MM')) }, 
                order:{hora:'ASC'}, 
            });
    }
    async registraReserva(reserva: Reserva, menuReserva: MenuReserva[]): Promise<ResponseGlobal> {
        let resp:ResponseGlobal = <ResponseGlobal>{};
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
            const empresaRepository = queryRunner.manager.getRepository(Reserva);
            const sucursalRepository = queryRunner.manager.getRepository(MenuReserva);
            // execute some operations on this transaction:
            let empresa2: Reserva = await empresaRepository.save(reserva);
            console.log(empresa2);
            if(menuReserva) {
                if(menuReserva.length > 0){
                    for(let item of menuReserva) {
                        //insertamos a menu reserva
                        await sucursalRepository.save(item);
                    }
                }
            }
            // commit transaction now:
            await queryRunner.commitTransaction();
            resp.estado = true;
            resp.mensaje = null;
        } catch (err) {
            console.log(err);
            // since we have errors let's rollback changes we made
            resp.estado = false;
            if(err.code === 'ER_DUP_ENTRY'){
                resp.mensaje = 'Error datos duplicados.';
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
