import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EmpresaRrss } from "./EmpresaRrss";
import { Sucursal } from "./Sucursal";

@Index("UK_empresa_nit", ["nit"], { unique: true })
@Entity("empresa", { schema: "try" })
export class Empresa {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", { name: "razon_social", length: 150 })
  razonSocial: string;

  @Column("varchar", { name: "nit", unique: true, length: 50 })
  nit: string;

  @Column("datetime", { name: "fecha_registro" })
  fechaRegistro: Date;

  @Column("tinyint", { name: "estado", width: 1 })
  estado: boolean;

  @OneToMany(() => EmpresaRrss, (empresaRrss) => empresaRrss.idEmpresa2)
  empresaRrsses: EmpresaRrss[];

  @OneToMany(() => Sucursal, (sucursal) => sucursal.idEmpresa2)
  sucursals: Sucursal[];
}
