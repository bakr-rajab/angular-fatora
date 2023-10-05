import { Component, OnInit } from '@angular/core';
import { Client, ClientType } from '../models/client.model';
import { Address } from '../models/address.model';
import { ClientService } from '../service-layer/client.service';
import { StaticService } from '../service-layer/static.service';

declare function paggnation(): any;
declare function sidebarToggling(): any;
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  constructor(
    private restCall: ClientService,
    private staticSer: StaticService
  ) {}
  initTable: boolean = false;
  clientModel = new Client();
  addressModel = new Address();
  clientsList: Array<Client> = [];
  clientTypes = ['P', 'F', 'B'];
  selectCountry!: any;
  countries!: any[];

  ngOnInit(): void {
    sidebarToggling();
    this.getAll();
  }

  getAll() {
    this.restCall.getAll().subscribe((res) => {
      this.clientsList = res;
      if (this.initTable == false) {
        paggnation();
        this.initTable = true;
      }
    });
  }
  getCountries() {
    this.staticSer.getCountries().subscribe((con) => {
      this.countries = con;
    });
  }

  addClient() {
    this.clientModel.address = this.addressModel;

    console.log(this.clientModel);

    this.restCall.create(this.clientModel).subscribe((res) => {
      this.clientsList = [...this.clientsList, res];
    });
  }

  editClient() {
    this.addressModel.country = this.selectCountry;
    this.clientModel.address = this.addressModel;
    this.restCall.update(this.clientModel).subscribe((res) => {
      console.log('updated...', res);
    });
    this.getAll();
  }

  delete(id: string) {
    this.restCall.delete(id).subscribe((res) => {
      console.log('deleted...', res);
    });
    // this.getAll()
  }

  setClientToEdite(client: any) {
    this.selectCountry = client.address?.country?.id;
    this.clientModel = client;
    // this.addressModel
  }

  modalReset() {
    // this.clientName = ""
    // this.clientCode = ""
    // this.email = ""
    // this.addres = ""
    // this.phoneNo = ""
    // this.taxNo = ""
  }
}
