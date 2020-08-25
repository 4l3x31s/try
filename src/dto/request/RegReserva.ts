import { Reserva } from '../../model/Reserva';
import { MenuReserva } from '../../model/MenuReserva';


export interface RegReserva {
    reserva: Reserva;
    lstMenuReserva: MenuReserva[];
}