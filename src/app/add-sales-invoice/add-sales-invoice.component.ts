import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../models/client.model';
import { Envoice, Line, TaxableItem } from '../models/envoice.model';
import { EnvoiceService } from '../service-layer/envoice.service';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Item } from '../models/item.model';
import { ClientService } from '../service-layer/client.service';
import { ItemService } from '../service-layer/item.service';
import { StaticService } from '../service-layer/static.service';
import { FormBuilder, FormGroup } from '@angular/forms';

declare function paggnation(): any;
declare function sidebarToggling(): any;

@Component({
  selector: 'app-add-sales-invoice',
  templateUrl: './add-sales-invoice.component.html',
  styleUrls: ['./add-sales-invoice.component.css'],
})
export class AddSalesInvoiceComponent implements OnInit {
  addedTypesList = [];
  documentTypes = ['I', 'C', 'D'];
  envoiceModel: Envoice = new Envoice();
  envoicesList: Array<Envoice> = [];
  clientsList: Array<Client> = [];
  taxTypes: Array<{ id: string; code: string }> = [];

  subTypes: Array<{ id: string; code: string }> = [];

  taxableItems: Array<TaxableItem> = [];
  itemsList: Array<Item> = [];
  currencyList: Array<any> = [
    { id: '1', name: 'USD' },
    { id: '2', name: 'EGP' },
  ];
  itemsDiscount: number = 0;
  netTotal: number = 0;

  lines: {
    form: FormGroup;
    expanded: boolean;
    taxs: { form: FormGroup }[];
  }[] = [];

  constructor(
    private apiCall: EnvoiceService,
    private clientSer: ClientService,
    private itemSer: ItemService,
    private staticSer: StaticService,
    private formBuilder: FormBuilder,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getClients();
    this.getItems();
    this.addLine();
    sidebarToggling();
  }

  setItemPrice(id:any,line:any){
    const price = (this.itemsList.find(item => item.id === id))?.price

    console.log(id);
    console.log(line);
    line.form.patchValue({
      price: price
    })
    
    
  }
  addLine(): void {
    const newLineForm = this.formBuilder.group({
      itemId: '',
      discoundRate: '',
      quantity: 0,
      price: 0,
    });
 
    this.lines.push({
      form: newLineForm,
      expanded: true,
      taxs: [],
    });
  }

  addTax(line: any): void {
    const newTaxForm = this.formBuilder.group({
      taxId: '',
      subTaxId: '',
      rate: '',
    });

    line.taxs.push({ form: newTaxForm });
  }

  removeTax(line: any, tax: any): void {
    const childIndex = line.taxs.indexOf(tax);
    if (childIndex !== -1) {
      line.taxs.splice(childIndex, 1);
    }
  }

  removeLine(item: any): void {
    const itemIndex = this.lines.indexOf(item);
    if (itemIndex !== -1) {
      this.lines.splice(itemIndex, 1);
    }
  }

  saveInvoice(): void {
    const lines = this.lines.map((line) => {
      console.log({line});
      // line.form.value.salesTotal=line.form.value.price*line.form.value.quantity
      return {
        ...line.form.value,
        taxbleItem:line.taxs.map((x) => x.form.value)
      }
    });
    // console.log(lines);
    this.envoiceModel.lines=lines
    console.log(this.envoiceModel);
    
    this.apiCall.create(this.envoiceModel).subscribe(res=>{
      console.log(res);
      
    })
  }

  getClients() {
    this.clientSer.getAll().subscribe((res: any) => {
      this.clientsList = res;
    });
  }

  getItems() {
    this.itemSer.getAll().subscribe((res: any) => {
      console.log('eee', res);
      this.itemsList = res;
    });
  }


  getTaxs() {
    this.staticSer.getTaxs().subscribe((res: any) => {
      this.taxTypes = res;
    });
  }

  getSubTypes(id: any) {
    const sub:any = this.taxTypes.find(item => item.id === id);
    
    this.subTypes=sub.subtax
  }

  getAllBranches() {}
  getAllUser() {}

  getAllTypes() {}
  
  createInvocieType() {}
  calculateFinalEnvoice() {}
  setBranch() {
    // this.branchId = this.selectedBranch.branch_code
  }
  setUser() {
    // this.client_id = this.selectedUser.tax_number
  }
  setType() {
  
  }
  calculatePriceAndTotalPrice() {
   }
  deleteType(type: any, index: any) {
   
  }
  settingDeductionRatio() {
   
  }
  setPayment() {
    // this.payM = this.patmentType
  }
  createEnvoice() {
  
  }
  resetTypesModal() {
  
  }

  changeTypePriceOnPurpose() {
   
  }

  getCountries() {
   
  }

  setCountry() {
   
  }
}
