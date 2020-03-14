import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Models
import { Meeting } from '../models/meeting';

// Services
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  statusForm: FormGroup;
  meetings: Meeting[] = [];
  showStatusTable: boolean;

  constructor(private fb: FormBuilder,
    private cmnServ: CommonService) {
    this.createStatusForm();
  }

  ngOnInit() {
    this.meetings = this.cmnServ.getMeetings();
  }

  createStatusForm() {
    this.statusForm = this.fb.group({
      'date': ['', [Validators.required]],
      'startTime': ['', Validators.required],
      'endTime': ['', Validators.required],
    });
  }

  checkStatus() {
    const date = this.statusForm.controls['date'].value;
    this.meetings.forEach(element => {
      if (element.date === date) {
        // Code to check the status
      }
    });
  }

  checkDate() {
    const date1 = this.statusForm.controls['date'].value;
    const day = new Date(date1).getUTCDay();
    if ([6, 0].includes(day)) {
      alert('Weekends are not allowed');
      this.statusForm.controls['date'].setValue('');
    }
  }
}
