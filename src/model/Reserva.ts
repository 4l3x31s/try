import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Sucursal } from "./Sucursal";
import { Usuario } from "./Usuario";

@Index("IXFK_reserva_sucursal", ["idSucursal"], {})
@Index("IXFK_reserva_usuario", ["idUsuario"], {})
@Entity("reserva", { schema: "restaurantes" })
export class Reserva {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "id_sucursal" })
  idSucursal: string;

  @Column("bigint", { name: "id_usuario" })
  idUsuario: string;

  @Column("date", { name: "fecha" })
  fecha: string;

  @Column("time", { name: "hora" })
  hora: string;

  @Column("varchar", { name: "dia", length: 50 })
  dia: string;

  @Column("int", { name: "cantidad_personas" })
  cantidadPersonas: number;

  @Column("datetime", { name: "fecha_registro" })
  fechaRegistro: Date;

  @Column("int", { name: "estado" })
  estado: number;

  @ManyToOne(() => Sucursal, (sucursal) => sucursal.reservas, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_sucursal", referencedColumnName: "id" }])
  idSucursal2: Sucursal;

  @ManyToOne(() => Usuario, (usuario) => usuario.reservas, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "id" }])
  idUsuario2: Usuario;
}
