import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Reserva } from "./Reserva";
import { Sucursal } from "./Sucursal";

@Index("UK_correo", ["correo"], { unique: true })
@Index("UK_usuario_correo", ["correo", "celular"], { unique: true })
@Index("UK_celular", ["celular"], { unique: true })
@Entity("usuario", { schema: "try" })
export class Usuario {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", { name: "nombre", length: 250 })
  nombre: string;

  @Column("varchar", {
    name: "celular",
    nullable: true,
    unique: true,
    length: 50,
  })
  celular: string | null;

  @Column("varchar", { name: "correo", unique: true, length: 250 })
  correo: string;

  @Column("varchar", { name: "pass", length: 150 })
  pass: string;

  @Column("int", { name: "valor" })
  valor: number;

  @Column("datetime", { name: "fecha_registro" })
  fechaRegistro: Date;

  @Column("tinyint", { name: "estado", width: 1 })
  estado: boolean;

  @OneToMany(() => Reserva, (reserva) => reserva.idUsuario2)
  reservas: Reserva[];

  @OneToMany(() => Sucursal, (sucursal) => sucursal.idUsuario2)
  sucursals: Sucursal[];
}
