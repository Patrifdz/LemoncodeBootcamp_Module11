   // ** DESAFÍO Y EJERCICIO ADICIONAL ----CLASE BASE CON OPCIÓN DESAYUNO + 2 CLASES HIJAS QUE HEREDAN DE LA PRIMERA CLASE BASE -------- ** //

const reservas = [
    {
      tipoHabitacion: "standard",
      desayuno: false,
      pax: 1,
      noches: 3
    },
    {
      tipoHabitacion: "standard",
      desayuno: false,
      pax: 1,
      noches: 4
    },
    {
      tipoHabitacion: "suite",
      desayuno: true,
      pax: 2,
      noches: 1
    }
  ];


class ReservaBase {
    constructor () {
      this.IVA = 0.21;
      this._subtotal= 0;
      this._total = 0;
      this.reserva = [];
    }
    //Calculo precio habitación:
    roomPrice = (room) => room === "standard" ? 100 : 150;

    //Importe adicional por desayuno: 
    desayunoPrice = (desayuno, pax, noches) => desayuno ? (15*pax*noches) : 0;

    calcularSubtotal(reservas) {
      this.reservas = reservas;
      return this.reservas.reduce((acc, reserva) => {
        const { tipoHabitacion, desayuno,  pax, noches } = reserva;
        const totalReserva = this.roomPrice(tipoHabitacion)*noches + this.desayunoPrice(desayuno, pax, noches);
        acc += totalReserva;
        return acc;
      }, 0);
    }

    set setSubtotal(reservas) {
      this._subtotal = this.calcularSubtotal(reservas);
    }
    
    get subtotal() {
      return this._subtotal;
    }
  
    calcularTotal() {
      return this._total = this._subtotal * ( 1+ this.IVA);
    }
  
    get total() {
      return this.calcularTotal().toFixed(2);
    }
  }
 
// CLIENTE PARTICULAR -- HEREDA DE CLIENTE BASE
  class ReservaClienteParticular extends ReservaBase {
    constructor() {
       super()
   }

    //Calculo precio adicional: -- CLIENTE PARTICULAR
    additionalPrice = () => {
      return this.reservas.reduce( (acc, reserva) => {
        const additionalPrice = reserva.pax > 1 ? 40 : 0;
        return acc += additionalPrice;
      }, 0)
    }

    get subtotal() {
    this._subtotal += this.additionalPrice();
    return this._subtotal;
    }

}

console.log("Reserva Cliente Particular:")
const clienteParticular = new ReservaClienteParticular();
clienteParticular.setSubtotal = reservas;
console.log(`Subtotal: ${clienteParticular.subtotal}`);
console.log(`Total: ${clienteParticular.total}`);

// CLIENTE TOUR OPERADOR --- HEREDA DE CLIENTE BASE
class ReservaTourOperador extends ReservaClienteParticular {
    constructor() {
     super()
     this._descuento = 0.15;
    }

    // Inicialización del precio habitación -> 100€ para todas 
    roomPrice = () => 100;

    // Calculo descuento del Tour Operador 
    descuento = () => this._subtotal= this._subtotal * (1 - this._descuento);

    get subtotal() {
    return this.descuento();
    }

}

console.log("Reserva Tour Operador:");
const clienteTourOperador = new ReservaTourOperador();
clienteTourOperador.setSubtotal = reservas;
console.log(`Subtotal: ${clienteTourOperador.subtotal}`);
console.log(`Total: ${clienteTourOperador.total}`);
