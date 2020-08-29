import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("IXFK_horario_sucursal", ["idSucursal"], {})
@Entity("horario", { schema: "lhwzrcxi_try_bolivia" })
export class Horario {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "id_sucursal" })
  idSucursal: string;

  @Column("time", { name: "hora_apertura" })
  horaApertura: string;

  @Column("time", { name: "hora_cierre" })
  horaCierre: string;

  @Column("varchar", { name: "dias", length: 50 })
  dias: string;

  @Column("tinyint", { name: "estado", width: 1 })
  estado: boolean;
}
