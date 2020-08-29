import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("IXFK_sucursal_categoria", ["idCategoria"], {})
@Index("IXFK_sucursal_ciudad", ["idCiudad"], {})
@Index("IXFK_sucursal_empresa", ["idEmpresa"], {})
@Index("IXFK_sucursal_usuario", ["idUsuario"], {})
@Entity("sucursal", { schema: "lhwzrcxi_try_bolivia" })
export class Sucursal {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "id_empresa" })
  idEmpresa: string;

  @Column("int", { name: "id_categoria" })
  idCategoria: number;

  @Column("bigint", { name: "id_usuario" })
  idUsuario: string;

  @Column("int", { name: "id_ciudad" })
  idCiudad: number;

  @Column("varchar", { name: "nombre", length: 150 })
  nombre: string;

  @Column("text", { name: "direccion", nullable: true })
  direccion: string | null;

  @Column("int", { name: "celular" })
  celular: number;

  @Column("int", { name: "telefono", nullable: true })
  telefono: number | null;

  @Column("decimal", { name: "latitud", precision: 19, scale: 12 })
  latitud: string;

  @Column("decimal", { name: "longitud", precision: 19, scale: 12 })
  longitud: string;

  @Column("int", { name: "cantidad_mesas" })
  cantidadMesas: number;

  @Column("int", { name: "cantidad_personas" })
  cantidadPersonas: number;

  @Column("datetime", { name: "fecha_registro" })
  fechaRegistro: Date;

  @Column("tinyint", { name: "estado", width: 1 })
  estado: boolean;
}
