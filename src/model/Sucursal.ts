import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Horario } from "./Horario";
import { Menu } from "./Menu";
import { Reserva } from "./Reserva";
import { Categoria } from "./Categoria";
import { Ciudad } from "./Ciudad";
import { Empresa } from "./Empresa";
import { Usuario } from "./Usuario";

@Index("IXFK_sucursal_categoria", ["idCategoria"], {})
@Index("IXFK_sucursal_ciudad", ["idCiudad"], {})
@Index("IXFK_sucursal_empresa", ["idEmpresa"], {})
@Index("IXFK_sucursal_usuario", ["idUsuario"], {})
@Entity("sucursal", { schema: "restaurantes" })
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

  @OneToMany(() => Horario, (horario) => horario.idSucursal2)
  horarios: Horario[];

  @OneToMany(() => Menu, (menu) => menu.idSucursal2)
  menus: Menu[];

  @OneToMany(() => Reserva, (reserva) => reserva.idSucursal2)
  reservas: Reserva[];

  @ManyToOne(() => Categoria, (categoria) => categoria.sucursals, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_categoria", referencedColumnName: "id" }])
  idCategoria2: Categoria;

  @ManyToOne(() => Ciudad, (ciudad) => ciudad.sucursals, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_ciudad", referencedColumnName: "id" }])
  idCiudad2: Ciudad;

  @ManyToOne(() => Empresa, (empresa) => empresa.sucursals, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_empresa", referencedColumnName: "id" }])
  idEmpresa2: Empresa;

  @ManyToOne(() => Usuario, (usuario) => usuario.sucursals, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_usuario", referencedColumnName: "id" }])
  idUsuario2: Usuario;
}
