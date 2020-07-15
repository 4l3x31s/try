import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Pais } from "./Pais";
import { Sucursal } from "./Sucursal";

@Index("IXFK_ciudad_pais", ["idPais"], {})
@Entity("ciudad", { schema: "restaurantes" })
export class Ciudad {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "id_pais" })
  idPais: number;

  @Column("varchar", { name: "ciudad", length: 150 })
  ciudad: string;

  @Column("tinyint", { name: "estado", width: 1 })
  estado: boolean;

  @ManyToOne(() => Pais, (pais) => pais.ciudads, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_pais", referencedColumnName: "id" }])
  idPais2: Pais;

  @OneToMany(() => Sucursal, (sucursal) => sucursal.idCiudad2)
  sucursals: Sucursal[];
}
