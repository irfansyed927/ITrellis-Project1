import {
  Component,
  OnInit,
  ViewChild
 } from '@angular/core';
 
 import {
  Car
 } from 'src/app/shared/models/Car';
 import {
  DialogComponent
 } from 'src/app/components/dialog/dialog.component';
 import {
  HttpClient
 } from '@angular/common/http';
 import {
  Observable
 } from 'rxjs';
 import {
  MatDialog
 } from '@angular/material';
import { CarsService } from 'src/app/shared/services/cars.service';
 
 
 
 @Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
 })
 export class ViewComponent implements OnInit {
 //table headers
  displayedColumns: string[] = ['make', 'year', 'color', 'price', 'hasSunroof',
   'isFourWheelDrive', 'hasLowMiles', 'hasPowerWindows', 'hasNavigation',
   'hasHeatedSeats'
  ];
 
  cars: Car[];//stores table data
  carsOrig : Car[];
  car: Car;//model for filters

  constructor(private http: HttpClient, public dialog: MatDialog,private carService:CarsService) {}
 
  ngOnInit(): void {
   this.carService.getJSON().subscribe(data => {//subscribing to service in order to fetch json data
    this.cars = data;
    this.carsOrig = data;
    console.log(this.cars);
   });
 
  }
 
  openDialog(): void {
   const dialogRef = this.dialog.open(DialogComponent, {//dialog popup dimensions
    width: '500px',
    height: '600px',
    data: {}
   });
 
   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.car = result;
    console.log(this.car);
 if(this.car != undefined){//user has provided filter options
    this.displayedColumns = ['make', 'year'];//fixed results
    for (let column in Object.keys(this.car)) {//dynamically adding selected headers
     this.displayedColumns.push(Object.keys(this.car)[column]);
    }
    this.cars=this.carsOrig;
    this.cars = this.cars.filter(item => {//filtering data based on multiple attributes
      let keys = Object.keys(this.car);
      let isMatching = true;
      keys.forEach((data)=>{
        let result = (<any>this.car)[data] === (<any>item)[data];
        if(!result)
          isMatching=false;
      });
       return isMatching;
      
  });
   
  }
  else{//reset table
    this.displayedColumns = ['make', 'year', 'color', 'price', 'hasSunroof',
    'isFourWheelDrive', 'hasLowMiles', 'hasPowerWindows', 'hasNavigation',
    'hasHeatedSeats'
   ];
   this.cars = this.carsOrig;
  }

   });
  }
 
 }  