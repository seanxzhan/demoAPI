import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntryDetailsComponent } from './entries/entry-details/entry-details.component';
import { EntryListComponent } from './entries/entry-list/entry-list.component';

@NgModule({
  declarations: [
    AppComponent,
    EntryDetailsComponent,
    EntryListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
