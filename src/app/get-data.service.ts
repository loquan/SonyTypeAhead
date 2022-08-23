import { Injectable } from '@angular/core';
import { titleStruct } from './app.component';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  sendData = new BehaviorSubject<any> (null);
  recieveData = this.sendData.asObservable();
  constructor() { }


}
