import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Sucursal } from "./Sucursal";
import { MenuReserva } from "./MenuReserva";

@Index("IXFK_Menu_sucursal", ["idSucursal"], {})
@Entity("menu", { schema: "try" })
export class Menu {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "id_sucursal" })
  idSucursal: string;

  @Column("varchar", { name: "nombre", length: 256 })
  nombre: string;

  @Column("varchar", { name: "descripcion", length: 250 })
  descripcion: string;

  @Column("text", { name: "imagen", nullable: true })
  imagen: string | null;

  @Column("decimal", { name: "precio", precision: 10, scale: 2 })
  precio: string;

  @Column("tinyint", { name: "estado", width: 1 })
  estado: boolean;

  @ManyToOne(() => Sucursal, (sucursal) => sucursal.menus, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_sucursal", referencedColumnName: "id" }])
  idSucursal2: Sucursal;

  @OneToMany(() => MenuReserva, (menuReserva) => menuReserva.idMenu2)
  menuReservas: MenuReserva[];
}
