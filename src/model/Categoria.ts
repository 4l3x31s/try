import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Sucursal } from "./Sucursal";

@Entity("categoria", { schema: "try" })
export class Categoria {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "categoria", length: 200 })
  categoria: string;

  @Column("tinyint", { name: "estado", width: 1 })
  estado: boolean;

  @OneToMany(() => Sucursal, (sucursal) => sucursal.idCategoria2)
  sucursals: Sucursal[];
}
