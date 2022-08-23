import { Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as titleJson from './data/titles'
import { GetDataService } from './get-data.service';
interface searchObj {
   name:string,
   key:string

}

export interface User {
  name: string;
}

export interface titleStruct{
  id: string,
  name: string,
  level_1_title: any,
  full_name: string,
  external_id: number,
  season_number: any,
  episode_number: any,
  title_level: any
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  pageTitle = 'by Sony Pictures Entertainment';
  title = 'the at-home Runner typeahead exercise';
  selectedValue:string="name";



  searchList :searchObj[] =[
     {name:"name",key:"name" },
     {name:"Title",key:"level_1_title" },
     {name:"Full Name",key:"full_name" },
  ];

  data:string="";
  searchArray:string[]=[];



  requirements = [
    `We have supplied sample json in the data directory to return title suggestions for a typeahead input component you'll create.`,
    'Please build a client that returns the sample json, as you would any client interacting with a json API.',
    'When the user types 3 or more characters into the input, it should show an Angular Material typeahead/autocomplete dropdown.',
    `When the user makes a selection from the dropdown, a new element below the input should show the selection's full name. Feel free to be creative with your styles.`,
    'The selected titles should be removable.',
    'This mimics a form element in our application where users assign title metadata to assets, so if you would like to build something that replicates a form submission, feel free to come up with your own solution to how it "saves" the data.'
  ];


  control = new FormControl('');
  streets: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
  filteredTitles: Observable<string[]>;
  titleArray:titleStruct[]=[];
  titleDisplay:titleStruct[]=[];
  searchValue:string="";

  constructor(private getdataService:GetDataService){


    this.filteredTitles = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

  }

  ngOnInit() {


  }

  handleInput(value:string){

      console.log("search"+this.searchValue);
      this.searchArray=[];
      if(this.searchValue.length>=3)
      {
        this.typeAheadSearch();


      }

  }

  typeAheadSearch(){
    this.searchArray = [];

    //fake service working
    this.getdataService.getTitleListArray(this.selectedValue,this.searchValue).subscribe( data=>{
        this.searchArray=data;

    }

    )

    this.filteredTitles = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }


  search(){

    this.titleDisplay=[];


    this.getdataService.getTitleListResult(this.selectedValue,this.searchValue).subscribe( data=>{
        this.titleDisplay=data;

      }

    )



  }
  remove(id:string){

    for(let x=0;x <this.titleDisplay.length;x++){

      if(this.titleDisplay[x].id==id)
      {
        this.titleDisplay.splice(x,1);
        return;

      }


    }

  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.searchArray.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
