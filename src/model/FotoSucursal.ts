import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("IXFK_foto_sucursal_sucursal", ["idSucursal"], {})
@Entity("foto_sucursal", { schema: "lhwzrcxi_try_bolivia" })
export class FotoSucursal {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "id_sucursal" })
  idSucursal: string;

  @Column("text", { name: "imagen" })
  imagen: string;

  @Column("int", { name: "tipo" })
  tipo: number;
}
