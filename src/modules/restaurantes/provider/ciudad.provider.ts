import { ResponseCiudades } from './../../../dto/response/ResponseCiudadesPais';
import { Ciudad } from './../../../model/Ciudad';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';


@Injectable()
export class CiudadProvider {
    constructor(
        @InjectRepository(Ciudad)
        private readonly ciudadRepository: Repository<Ciudad>,
    ) {}
    
    create(ciudad: Ciudad): Promise<Ciudad> {
        return this.ciudadRepository.save(ciudad);
    }
    
    findAll(): Promise<Ciudad[]> {
        return this.ciudadRepository.find({estado: true});
    }
    
    findOne(id: string): Promise<Ciudad> {
        return this.ciudadRepository.findOne(id);
    }
    
    async remove(id: string): Promise<void> {
        await this.ciudadRepository.delete(id);
    }
    async findAllCiudades(): Promise<ResponseCiudades[]>{
        try{
            console.log('prueba')
            const connection = getConnection();
            const queryRunner = connection.createQueryRunner();
            await queryRunner.connect();
            let prueba:any = await queryRunner.query(`SELECT ci.id idCiudad, ci.ciudad, pa.id idPais, pa.pais FROM ciudad ci, pais pa
                                WHERE ci.id_pais = pa.id
                                AND ci.estado = TRUE
                                AND pa.estado = TRUE`).then(data =>{
                                    return data;
                                });
            console.log(prueba);
            return prueba;
        }catch(err){
            console.log(err);
            return err;
        }
    }
    async findCiudadesByPais(idPais: number): Promise<Ciudad[]>{
        try{
            return this.ciudadRepository.find({ estado: true, idPais: idPais });
        }catch(err){
            console.log(err);
            return err;
        }
    }

}
