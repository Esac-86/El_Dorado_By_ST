// FlightUtils.js

export const getDestinoName = (codDestino, destinos) => {
  if (destinos) {
      const destino = destinos.find(destino => destino.coddestino === codDestino);
      return destino ? destino.descripcion : 'No encontrado';
  } else {
      return 'No encontrado';
  }
};

export const getAerolineaName = (codAerolinea, aerolineas) => {
  if (aerolineas) {
      const aerolinea = aerolineas.find(aerolinea => aerolinea.codaerolinea === codAerolinea);
      return aerolinea ? aerolinea.descripcion : 'No encontrada';
  } else {
      return 'No encontrada';
  }
};

  
  export const calcularTiempoVuelo = (horaSalida, horaLlegada) => {
    const horaSalidaDate = new Date(`2023-01-01T${horaSalida}`);
    const horaLlegadaDate = new Date(`2023-01-01T${horaLlegada}`);
  
    // Calcula la diferencia en milisegundos
    const diferencia = horaLlegadaDate - horaSalidaDate;
  
    // Convierte la diferencia a horas y minutos
    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  
    return `${horas}h ${minutos}m`;
  };
  
  export const formatHora = (hora) => {
    const date = new Date(`2023-01-01T${hora}`);
    return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };
  