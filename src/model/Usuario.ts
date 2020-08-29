import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("UK_correo", ["correo"], { unique: true })
@Index("UK_usuario_correo", ["correo", "celular"], { unique: true })
@Index("UK_celular", ["celular"], { unique: true })
@Entity("usuario", { schema: "lhwzrcxi_try_bolivia" })
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
}
