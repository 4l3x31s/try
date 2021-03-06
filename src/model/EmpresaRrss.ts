import { Column, Entity, Index } from "typeorm";

@Index("IXFK_empresa_rrss_empresa", ["idEmpresa"], {})
@Index("IXFK_empresa_rrss_redes_sociales", ["idRrss"], {})
@Entity("empresa_rrss", { schema: "lhwzrcxi_try_bolivia" })
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
}
