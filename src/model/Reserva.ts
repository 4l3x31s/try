import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("IXFK_reserva_sucursal", ["idSucursal"], {})
@Index("IXFK_reserva_usuario", ["idUsuario"], {})
@Entity("reserva", { schema: "lhwzrcxi_try_bolivia" })
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
}
