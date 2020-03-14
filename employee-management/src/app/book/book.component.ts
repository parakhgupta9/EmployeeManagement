import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

// Models
import { Meeting } from '../models/meeting';

// Services
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  bookingForm: FormGroup;
  rooms = [];
  meetingObj: Meeting;
  startFlag: boolean;
  endFlag: boolean;
  totalValidation: boolean;
  todaysDate = new Date().getDate();

  constructor(private fb: FormBuilder,
    private cmnServ: CommonService,
    private router: Router,
    private location: Location) {
    this.createbookingForm();
  }

  ngOnInit() {
    this.rooms = this.cmnServ.getRooms();
  }

  createbookingForm() {
    this.bookingForm = this.fb.group({
      'username': ['', Validators.required],
      'room': ['', Validators.required],
      'date': ['', [Validators.required]],
      'startTime': ['', Validators.required],
      'endTime': ['', Validators.required],
      'agenda': ['', Validators.required]
    });
  }

  onSubmit() {
    this.meetingObj = {
      'username': this.bookingForm.controls['username'].value,
      'room': this.bookingForm.controls['room'].value,
      'date': this.bookingForm.controls['date'].value,
      'startTime': this.bookingForm.controls['startTime'].value,
      'endTime': this.bookingForm.controls['endTime'].value,
      'agenda': this.bookingForm.controls['agenda'].value,
    };
    this.cmnServ.addToMeetings(this.meetingObj);
    alert('Meeting Room booked successfully');
    this.router.navigate(['/rooms']);
  }

  onReset() {
    this.bookingForm.reset();
  }

  goBack() {
    this.location.back();
  }

  checkDate() {
    const date1 = this.bookingForm.controls['date'].value;
    const day = new Date(date1).getUTCDay();
    if ([6, 0].includes(day)) {
      alert('Weekends are not allowed');
      this.bookingForm.controls['date'].setValue('');
    }
  }

  checkTime() {
    const startTimeHour = +this.bookingForm.controls['startTime'].value.split(':')[0];
    const startTimeMin = +this.bookingForm.controls['startTime'].value.split(':')[1];
    const endTimeHour = +this.bookingForm.controls['endTime'].value.split(':')[0];
    const endTimeMin = +this.bookingForm.controls['endTime'].value.split(':')[1];
    if (startTimeHour === 9 && startTimeMin === 0) {
      this.startFlag = true;
    } else if (startTimeHour >= 9 && startTimeHour < 18) {
      this.startFlag = true;
    } else {
      this.startFlag = false;
    }
    if (endTimeHour === 18 && endTimeMin === 0) {
      this.endFlag = true;
    } else if (endTimeHour < 18 && endTimeHour >= 9) {
      this.endFlag = true;
    } else {
      this.endFlag = false;
    }

    if (this.startFlag && this.endFlag) {
      if (startTimeHour === endTimeHour && startTimeMin < endTimeMin) {
        if (endTimeMin - startTimeMin >= 30) {
          this.totalValidation = true;
        } else {
          this.totalValidation = false;
        }
      } else if (startTimeHour < endTimeHour && endTimeHour - startTimeHour === 1 && startTimeMin >= endTimeMin) {
        if ((60 - startTimeMin) + endTimeMin  >= 30) {
          this.totalValidation = true;
        } else {
          this.totalValidation = false;
        }
      } else if (startTimeHour < endTimeHour && endTimeHour - startTimeHour > 1) {
        this.totalValidation = true;
      } else {
        this.totalValidation = false;
      }
    } else {
      this.totalValidation = false;
    }
  }
}
