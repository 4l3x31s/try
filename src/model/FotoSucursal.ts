import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Sucursal } from "./Sucursal";

@Index("IXFK_foto_sucursal_sucursal", ["idSucursal"], {})
@Entity("foto_sucursal", { schema: "restaurantes" })
export class FotoSucursal {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "id_sucursal" })
  idSucursal: string;

  @Column("text", { name: "imagen" })
  imagen: string;

  @Column("int", { name: "tipo" })
  tipo: number;

  @ManyToOne(() => Sucursal, (sucursal) => sucursal.fotoSucursals, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_sucursal", referencedColumnName: "id" }])
  idSucursal2: Sucursal;
}
