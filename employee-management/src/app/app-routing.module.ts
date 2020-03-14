import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { RoomsComponent } from './rooms/rooms.component';
import { BookComponent } from './book/book.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { StatusComponent } from './status/status.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/rooms',
    pathMatch: 'full'
  },
  { path: 'rooms', component: RoomsComponent },
  { path: 'book', component: BookComponent },
  { path: 'meetings/:name', component: MeetingsComponent },
  { path: 'status', component: StatusComponent },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
