import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Empresa } from "./Empresa";
import { RedesSociales } from "./RedesSociales";

@Index("IXFK_empresa_rrss_empresa", ["idEmpresa"], {})
@Index("IXFK_empresa_rrss_redes_sociales", ["idRrss"], {})
@Entity("empresa_rrss", { schema: "try" })
export class EmpresaRrss {
  @Column("bigint", { primary: true, name: "id" })
  id: string;

  @Column("bigint", { name: "id_empresa" })
  idEmpresa: string;

  @Column("int", { name: "id_rrss" })
  idRrss: number;

  @Column("text", { name: "url" })
  url: string;

  @Column("tinyint", { name: "estado", width: 1 })
  estado: boolean;

  @ManyToOne(() => Empresa, (empresa) => empresa.empresaRrsses, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_empresa", referencedColumnName: "id" }])
  idEmpresa2: Empresa;

  @ManyToOne(
    () => RedesSociales,
    (redesSociales) => redesSociales.empresaRrsses,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_rrss", referencedColumnName: "id" }])
  idRrss2: RedesSociales;
}
