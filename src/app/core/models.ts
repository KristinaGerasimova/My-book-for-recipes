export class User {
    id: number;
    name: string;
    externalId: number;
    address : string;
    email: string;
    phoneNumber:number;
  //  leaseContracts: any[];

  

    constructor(json:any) {
        this.id = json.id;
        this.externalId = json.externalId
        this.name = json.name;
        this.address = json.address;
        this.email = json.email;
        this.phoneNumber = json.phoneNumber;
      //  this.leaseContracts = json.leaseContracts || []
       
    }
}