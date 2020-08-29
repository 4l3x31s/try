import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("redes_sociales", { schema: "lhwzrcxi_try_bolivia" })
export class RedesSociales {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", length: 800 })
  nombre: string;

  @Column("tinyint", { name: "estado", width: 1 })
  estado: boolean;
}
