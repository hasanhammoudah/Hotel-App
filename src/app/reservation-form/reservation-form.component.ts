import { ReservationService } from './../reservation/reservation.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Reservation } from '../models/reservation';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({});
  
  constructor(private fb: FormBuilder,private reservationService:ReservationService,private router:Router,private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', [Validators.required, Validators.min(1)]]
    });
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id) {
      let reservation = this.reservationService.getReservation(id);
      if (reservation) {
        this.reservationForm.patchValue(reservation)
      }
    }
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      let reservation: Reservation = this.reservationForm.value;
      let id = this.activatedRoute.snapshot.paramMap.get('id')
      if (id) {
      // Update
      this.reservationService.updateReservation(id,reservation)
      } else {
        // New
      this.reservationService.addReservation(reservation)

    }
      this.router.navigate(['/list'])
     
    } 
  }
}
