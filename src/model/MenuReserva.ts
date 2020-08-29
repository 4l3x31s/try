import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("IXFK_menu_reserva_menu", ["idMenu"], {})
@Index("IXFK_menu_reserva_reserva", ["idReserva"], {})
@Entity("menu_reserva", { schema: "lhwzrcxi_try_bolivia" })
export class MenuReserva {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "id_reserva", nullable: true })
  idReserva: string | null;

  @Column("bigint", { name: "id_menu", nullable: true })
  idMenu: string | null;

  @Column("int", { name: "cantidad" })
  cantidad: number;

  @Column("text", { name: "detalle", nullable: true })
  detalle: string | null;
}
