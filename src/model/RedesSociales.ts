import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EmpresaRrss } from "./EmpresaRrss";

@Entity("redes_sociales", { schema: "try" })
export class RedesSociales {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", length: 800 })
  nombre: string;

  @Column("tinyint", { name: "estado", width: 1 })
  estado: boolean;

  @OneToMany(() => EmpresaRrss, (empresaRrss) => empresaRrss.idRrss2)
  empresaRrsses: EmpresaRrss[];
}
