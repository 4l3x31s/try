import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ciudad } from "./Ciudad";

@Entity("pais", { schema: "try" })
export class Pais {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "pais", length: 50 })
  pais: string;

  @Column("varchar", { name: "cod_tel_pais", length: 10 })
  codTelPais: string;

  @Column("tinyint", { name: "estado", width: 1 })
  estado: boolean;

  @OneToMany(() => Ciudad, (ciudad) => ciudad.idPais2)
  ciudads: Ciudad[];
}
