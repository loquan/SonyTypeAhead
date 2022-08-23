import { Injectable } from '@angular/core';
import { titleStruct } from './app.component';
import { BehaviorSubject,Observable,of } from 'rxjs';
import * as titleJson from './data/titles'

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  sendData = new BehaviorSubject<any> (null);
  recieveData = this.sendData.asObservable();
  constructor() { }

  getTitleListArray(selectedValue:string,inputSearch:string):Observable< string[] >{


    let titleArray:titleStruct[]=titleJson.titles;
    let searchArray:string[]=[];
    titleArray.map((data)=>{
      let findSubString:boolean=false;
      switch (selectedValue){
        case "name":
          findSubString=data.name.toLowerCase().includes(inputSearch.toLowerCase());
          if(findSubString)
            searchArray.push(data.name);
          break;
        case "level_1_title":
          if(data.level_1_title!=null)
          {
              findSubString=data.level_1_title.toLowerCase().includes(inputSearch.toLowerCase());
              if(findSubString)
              {
                  searchArray.push(data.level_1_title);
              }
          }
            break;
        case "full_name":
          findSubString=data.full_name.toLowerCase().includes(inputSearch.toLowerCase());
          if(findSubString)
           searchArray.push(data.full_name);
           break;
      }

    })

    return of (searchArray)

  }

  getTitleListResult(selectedValue:string,searchValue:string): Observable < titleStruct[] > {
    let titleArray:titleStruct[]=titleJson.titles;
    let titleDisplay:titleStruct[]=[];
    titleArray.map(( data )=>{

      let findSubString=false;
      if(selectedValue=="name")
      {
          findSubString=data.name.toLowerCase().includes(searchValue.toLowerCase());
          if(findSubString)
          titleDisplay.push(data);
      }
      else if(selectedValue=="level_1_title")
      {
          if(data.level_1_title!=null)
          {
            findSubString=data.level_1_title.toLowerCase().includes(searchValue.toLowerCase());
            if(findSubString)
            titleDisplay.push(data);

          }

      }
      else if(selectedValue=="full_name")
      {
            findSubString=data.full_name.toLowerCase().includes(searchValue.toLowerCase());
            if(findSubString)
            titleDisplay.push(data);

      }




    });
    return  of(titleDisplay) ;
  }


}
