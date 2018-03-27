pragma solidity ^0.4.17;

contract CarSell{
	
	address owner;
	address buyer;
	bool sold;
	Car  car;

	struct Car{
		string make;
		string model;
		string year;
		uint price;
	}

	function CarSell(string make,string model,string year,uint price) public{

 		
 		car.make = make;
 		car.model = model;
 		car.year=year;
 		car.price=price;
 		sold = false;
 		owner = msg.sender;

	}


	function buy() public payable{

		require(msg.value == car.price);
		require(sold == false);
		buyer = msg.sender;
        sold = true;
        owner.transfer(msg.value);

	}

	function isSold() public view returns (bool){
		return sold;
	}

	function getCar() public view returns (string ,string ,string ,uint ,bool,address,address ){
			return (car.make, car.model,car.year,car.price,sold,owner,buyer);
	}

	function verifyOwnership() public  view returns (bool ){
			if(sold ==true && msg.sender == buyer){
				return true;
			}else{
				return false;
			}
			
	}

}