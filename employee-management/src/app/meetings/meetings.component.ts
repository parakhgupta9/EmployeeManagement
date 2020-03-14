import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

// Services
import { CommonService } from '../services/common.service';

// Models
import { Meeting } from '../models/meeting';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit {
  room: string;
  meetings: Meeting[] = [];

  constructor(private cmnServ: CommonService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.room = this.route.snapshot.params['name'];
    this.meetings = this.cmnServ.getMeetingsByRoom(this.room);
  }

  deleteMeeting(room) {
    if (confirm('Are you sure you want to delete this meeting?') === true) {
      this.meetings.forEach((meeting, index) => {
        if (meeting.room === room) {
          this.meetings.splice(index, 1);
        }
      });
      this.cmnServ.updateMeetingList(this.meetings, this.room);
      alert('Meeting deleted successfully!');
    } else {
      alert('Delete Cancelled!');
    }
  }

  goBack() {
    this.location.back();
  }
}
