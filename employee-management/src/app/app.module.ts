import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { RoomsComponent } from './rooms/rooms.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { BookComponent } from './book/book.component';

// Services
import { CommonService } from './services/common.service';
import { StatusComponent } from './status/status.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RoomsComponent,
    BookComponent,
    MeetingsComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
