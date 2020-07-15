import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Sucursal } from "./Sucursal";

@Index("IXFK_horario_sucursal", ["idSucursal"], {})
@Entity("horario", { schema: "restaurantes" })
export class Horario {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "id_sucursal" })
  idSucursal: string;

  @Column("time", { name: "hora_apertura" })
  horaApertura: string;

  @Column("time", { name: "hora_cierre" })
  horaCierre: string;

  @Column("int", { name: "tipo_horario" })
  tipoHorario: number;

  @Column("varchar", { name: "dias", length: 50 })
  dias: string;

  @Column("tinyint", { name: "estado", width: 1 })
  estado: boolean;

  @ManyToOne(() => Sucursal, (sucursal) => sucursal.horarios, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_sucursal", referencedColumnName: "id" }])
  idSucursal2: Sucursal;
}
