import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxQRCodeModule} from 'ngx-qrcode2';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { BuyComponent } from './buy/buy.component';
import {SellComponent} from "./sell/sell.component";
import {FormsModule} from '@angular/forms';
import {Web3Service} from "./web3-service";

const appRoutes: Routes = [
  { path: 'buy', component: BuyComponent },
  { path: 'sell',      component: SellComponent },
  { path: '**', component: SellComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SellComponent,
    BuyComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    NgxQRCodeModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  providers: [Web3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
