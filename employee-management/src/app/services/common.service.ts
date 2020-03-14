import { Injectable } from '@angular/core';

// Models
import { Meeting } from '../models/meeting';

@Injectable()
export class CommonService {

  rooms = ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9', 'R10'];
  meetings: Meeting[] = [
    {
      username: 'Parakh', room: 'R1', date: '2020-03-14',
      startTime: '17:00', endTime: '17:30', agenda: 'Scrum Call'
    },
    {
      username: 'Parakh', room: 'R1', date: '2020-03-14',
      startTime: '16:00', endTime: '16:30', agenda: 'Sprint Planning'
    },
    {
      username: 'Parakh', room: 'R2', date: '2020-03-14',
      startTime: '17:00', endTime: '17:30', agenda: 'Scrum Call'
    },
    {
      username: 'Parakh', room: 'R2', date: '2020-03-14',
      startTime: '16:00', endTime: '16:30', agenda: 'Sprint Planning'
    }
  ];

  constructor() { }

  getRooms() {
    return this.rooms;
  }

  addToMeetings(meeting: Meeting) {
    this.meetings.push(meeting);
  }

  getMeetings() {
    return this.meetings.slice();
  }

  getMeetingsByRoom(room) {
    const meetings: Meeting[] = [];
    this.meetings.filter((meeting) => {
      if (meeting.room === room) {
        meetings.push(meeting);
      }
    });
    return meetings;
  }

  updateMeetingList(meetingList: Meeting[], room) {
    const meetings: Meeting[] = [];
    this.meetings.filter((meeting) => {
      if (meeting.room !== room) {
        meetings.push(meeting);
      }
    });
    meetingList.forEach(element => {
      meetings.push(element);
    });
    this.meetings = meetings;
  }
}
