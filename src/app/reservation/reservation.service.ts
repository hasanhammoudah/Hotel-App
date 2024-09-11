import { Reservation } from './../models/reservation';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservations: Reservation[] = [];
  constructor() {
    let savedReservations = localStorage.getItem("reservations");
    this.reservations = savedReservations ? JSON.parse(savedReservations) : [];
  }

  //CRUD

  getReservations(): Reservation[]{
    return this.reservations;
  }

  getReservation(id: string): Reservation | undefined{
    return this.reservations.find(res => res.id === id);
  }
  
  addReservation(reservistion: Reservation): void{
    reservistion.id = Date.now().toString();
    this.reservations.push(reservistion);
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
    
  }

  deleteReservation(id: string): void{
    //TODO what means splice
    let index = this.reservations.findIndex(res => res.id === id);
    this.reservations.splice(index, 1);
        localStorage.setItem("reservations", JSON.stringify(this.reservations));

  }

  updateReservation(id:string,updatedReservation: Reservation): void{
    let index = this.reservations.findIndex(res => res.id === id);
    //TODO why i put [index] here??
    this.reservations[index] = updatedReservation;
        localStorage.setItem("reservations", JSON.stringify(this.reservations));

  }
}
