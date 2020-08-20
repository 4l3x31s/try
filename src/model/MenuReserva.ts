import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Menu } from "./Menu";
import { Reserva } from "./Reserva";

@Index("IXFK_menu_reserva_menu", ["idMenu"], {})
@Index("IXFK_menu_reserva_reserva", ["idReserva"], {})
@Entity("menu_reserva", { schema: "try" })
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

  @ManyToOne(() => Menu, (menu) => menu.menuReservas, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_menu", referencedColumnName: "id" }])
  idMenu2: Menu;

  @ManyToOne(() => Reserva, (reserva) => reserva.menuReservas, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_reserva", referencedColumnName: "id" }])
  idReserva2: Reserva;
}
