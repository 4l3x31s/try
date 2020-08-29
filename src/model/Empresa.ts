import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("UK_empresa_nit", ["nit"], { unique: true })
@Entity("empresa", { schema: "lhwzrcxi_try_bolivia" })
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
}
