import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("IXFK_ciudad_pais", ["idPais"], {})
@Entity("ciudad", { schema: "lhwzrcxi_try_bolivia" })
export class Ciudad {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "id_pais" })
  idPais: number;

  @Column("varchar", { name: "ciudad", length: 150 })
  ciudad: string;

  @Column("tinyint", { name: "estado", width: 1 })
  estado: boolean;
}
