import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Sucursal } from "./Sucursal";

@Index("UK_empresa_nit", ["nit"], { unique: true })
@Entity("empresa", { schema: "restaurantes" })
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

  @OneToMany(() => Sucursal, (sucursal) => sucursal.idEmpresa2)
  sucursals: Sucursal[];
}
