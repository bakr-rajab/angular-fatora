import { Component, OnInit } from '@angular/core';
import { Address } from '../models/address.model';
import { StaticService } from '../service-layer/static.service';
import { AddressService } from '../service-layer/adress.service';

declare function paggnation(): any;
declare function sidebarToggling(): any;

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  addressList!: Address[];
  addressModel = new Address();
  countries!: any[];
  initTable: boolean = false;
  selectCountry!: any;
  constructor(
    private apiCall: AddressService,
    private staticSer: StaticService
  ) {}

  ngOnInit(): void {
    // paggnation();
    sidebarToggling();
    this.getAll();
  }

  getCountries() {
    this.staticSer.getCountries().subscribe((con) => {
      this.countries = con;
    });
  }

  getAll() {
    this.apiCall.getAll().subscribe((res) => {
      this.addressList = res;
      if (this.initTable == false) {
        paggnation();
        this.initTable = true;
      }
    });
  }

  Create() {
    this.apiCall.create(this.addressModel).subscribe((res) => {
      this.addressList.push(res);
    });
  }

  setToEdite(address: any) {
    console.log('====================================');
    console.log(address);
    console.log('====================================');
    this.addressModel = address;
    this.selectCountry = address?.country?.id;
  }

  Update() {
    this.addressModel.country = this.selectCountry;
    console.log(this.selectCountry);

    this.apiCall.update(this.addressModel).subscribe((res) => {
      if (res.affected == 1) {
        this.getAll();
      }
    });
  }

  delete(id: string) {
    this.apiCall.delete(id).subscribe((res) => {
      if (res.affected === 1)
        this.addressList = this.addressList.filter((br) => br.id != id);
    });
  }
}
