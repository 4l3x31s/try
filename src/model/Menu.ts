import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Sucursal } from "./Sucursal";

@Index("IXFK_Menu_sucursal", ["idSucursal"], {})
@Entity("menu", { schema: "restaurantes" })
export class Menu {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "id_sucursal" })
  idSucursal: string;

  @Column("varchar", { name: "descripcion", length: 250 })
  descripcion: string;

  @Column("text", { name: "imagen" })
  imagen: string;

  @Column("decimal", { name: "precio", precision: 10, scale: 2 })
  precio: string;

  @Column("tinyint", { name: "estado", width: 1 })
  estado: boolean;

  @ManyToOne(() => Sucursal, (sucursal) => sucursal.menus, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_sucursal", referencedColumnName: "id" }])
  idSucursal2: Sucursal;
}
