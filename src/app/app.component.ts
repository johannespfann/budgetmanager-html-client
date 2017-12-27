import { Component } from '@angular/core';
import { EntryAPIService } from './services/entry.api.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
}) 
export class AppComponent  { 
  
  constructor(private entryServ: EntryAPIService){
      entryServ.getContent()
        .subscribe(value => console.log(value));
  }
}
