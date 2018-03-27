import { Component, OnInit } from '@angular/core';
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import {Web3Service} from "../web3-service";

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  private web3:Web3;

  private contractAddress:string;
  private accounts:string[]=[];
  private carsellContract:any;
  private car:any;
  private selectedAccount:string;
  private balance:number;
  private ownershipQrCode:string;

  constructor(private toastr: ToastrService,private _web3Service:Web3Service) {

    var that =this;
    this.web3 = this._web3Service.web3;
    this.web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        console.log(err);

      }else{
        console.log('accounts',accs);
        that.accounts = accs;
        that.carsellContract = that._web3Service.carsellContract;
         }
    });
  }

  ngOnInit() {
  }


  public search(){
    console.log('searching', this.contractAddress);
    var that=this;
    var deployedContract =this.carsellContract.at(this.contractAddress);
    deployedContract.getCar.call(function(err, returnValues){
      console.log(err,returnValues);
      if(err){

      }else{
          that.car ={
            make:returnValues[0],
            model:returnValues[1],
            year: returnValues[2],
            price: that.web3.fromWei(returnValues[3]),
            sold: returnValues[4],
            seller:returnValues[5],
            buyer: returnValues[6]
          };
      }
    })
  }


  public selectAccount(account):void{
    this.selectedAccount = account;

    this.balance = this.web3.fromWei(this.web3.eth.getBalance(account));


  }

  public buy():void{
    var that = this;
    var deployedContract =this.carsellContract.at(this.contractAddress);
    deployedContract.buy({from: this.selectedAccount, gas:3000000,value: this.web3.toWei(this.car.price)},function(err){
      console.log(err);
      if(err){
        that.toastr.error('Could not complete your request');
      }else{
        that.toastr.success('Purchase is complete!');
        that.balance = that.web3.fromWei(that.web3.eth.getBalance(that.selectedAccount));
        that.search();
        that.ownershipQrCode = JSON.stringify({
          address : that.contractAddress,
          owner: that.selectedAccount
        });
      }
    })

  }
}
