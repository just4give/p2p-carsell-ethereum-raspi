import { Component, OnInit } from '@angular/core';
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import {Web3Service} from "../web3-service";

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  private web3:Web3;
  private newContract:any ={};
  private contractAddress:string;
  private accounts:string[]=[];
  private selectedAccount:string;

  constructor(private toastr: ToastrService,private _web3Service:Web3Service) {

    var that =this;
    this.web3 = _web3Service.web3;

    this.web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        console.log(err);

      }else{
        console.log('accounts',accs);
        that.accounts = accs;


      }
    });
  }

  ngOnInit() {


  }

  public createContract(newContract:any):void{
    console.log('contract data', newContract);
    var that = this;
    var carsell = this._web3Service.carsellContract.new(
      newContract.make,
      newContract.model,
      newContract.year,
      this.web3.toWei(newContract.price),
      {
        from: that.selectedAccount,
        data: that._web3Service.carsellContractData,
        gas: '4700000'
      }, function (e, contract){

        if(e){
          that.toastr.error('Failed!');
          return;
        }else{
          that.toastr.success('Contract created!');
          that.contractAddress = contract.address;

        }
      })
  }

}
