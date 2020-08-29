import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("categoria", { schema: "lhwzrcxi_try_bolivia" })
export class Categoria {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "categoria", length: 200 })
  categoria: string;

  @Column("tinyint", { name: "estado", width: 1 })
  estado: boolean;
}
