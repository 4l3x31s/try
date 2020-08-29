import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("IXFK_Menu_sucursal", ["idSucursal"], {})
@Entity("menu", { schema: "lhwzrcxi_try_bolivia" })
export class Menu {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "id_sucursal" })
  idSucursal: string;

  @Column("varchar", { name: "nombre", length: 250 })
  nombre: string;

  @Column("varchar", { name: "descripcion", length: 250 })
  descripcion: string;

  @Column("text", { name: "imagen", nullable: true })
  imagen: string | null;

  @Column("decimal", { name: "precio", precision: 10, scale: 2 })
  precio: string;

  @Column("tinyint", { name: "estado", width: 1 })
  estado: boolean;
}
