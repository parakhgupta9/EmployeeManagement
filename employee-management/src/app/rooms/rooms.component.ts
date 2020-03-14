import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms = [];
  constructor(private cmnServ: CommonService,
    private router: Router) { }

  ngOnInit() {
    this.rooms = this.cmnServ.getRooms();
  }

  goToBook() {
    this.router.navigate(['/book']);
  }

  viewScheduled(room) {
    this.router.navigate(['/meetings', room]);
  }
}
