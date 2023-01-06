import { Component, OnInit } from '@angular/core';
import { GetAllClient } from '../models/client/get-all-client.model';
import { GenericService } from '../service-layer/generic.service';


declare function paggnation():any;
declare function sidebarToggling(): any;
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  getClientsReq:any
  clientsRes:any
  clientsList:any
  i:any
  clientName:any
  phoneNo:any
  taxNo:any
  email:any
  addClientReq:any
  editClientReq:any
  deletClientReq:any
  addres:any
  initTable:boolean = false
  clientCode:any
  taxNoOld:any
  constructor(private restCall: GenericService) { }

  ngOnInit(): void {
    
    sidebarToggling()
    this.getAllClients()
  }

  getAllClients(){
    this.getClientsReq={
      "target":"client",
      "action":"get_all_clients",
      "user_id":sessionStorage.getItem('userId')
      }
      this.restCall.restServiceCall(this.getClientsReq).subscribe(res =>{
        this.clientsRes=res
        this.clientsList = this.clientsRes.data
        if(this.initTable== false){
          paggnation();
          this.initTable = true;
        } 
      })
  }

  addClient(){
    this.addClientReq={
      "target":"client",
      "action":"create",
      "client_name": this.clientName,
      "ph_number": Number(this.phoneNo),
      "email": this.email,
      "tax_number": Number(this.taxNo),
      "user_id":sessionStorage.getItem('userId'),
      "client_code_number":this.clientCode,
      "address": this.addres
      }
      this.restCall.restServiceCall(this.addClientReq).subscribe(res =>{

      })
      this.getAllClients()
  }

  editClient(){
    this.editClientReq={
      "target":"client",
      "action":"edite",
      "unique_value":{
          "tax_number": Number(this.taxNoOld)
      },
      "client_name": this.clientName,
      "ph_number": Number(this.phoneNo),
      "email": this.email,
      "tax_number": Number(this.taxNo),
      "client_code_number":this.clientCode,
      "address": this.addres
      }
      this.restCall.restServiceCall(this.editClientReq).subscribe(res =>{

      })
      this.getAllClients()
  }
  setAndDeleteClient(client:any){
    this.deletClientReq={
      "target":"client",
      "action":"delete",
      "key":"tax_number",
      "value":client.tax_number
      }
      this.restCall.restServiceCall(this.deletClientReq).subscribe(res =>{

      })
      this.getAllClients()
  }
  setClientToEdite(client:any){
    this.clientName = client.client_name
    this.taxNo = client.tax_number
    this.phoneNo = client.ph_number
    this.email = client.email
    this.taxNoOld = client.tax_number
    this.addres = client.address
    this.clientCode = client.client_code_number
  }

  modalReset(){
    this.clientName = ""
    this.clientCode = ""
    this.email = ""
    this.addres = ""
    this.phoneNo = ""
    this.taxNo = ""
  }
}
