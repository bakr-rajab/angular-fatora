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


declare function paggnation(): any;
declare function sidebarToggling(): any

@Component({
  selector: 'app-add-sales-invoice',
  templateUrl: './add-sales-invoice.component.html',
  styleUrls: ['./add-sales-invoice.component.css'],
})
export class AddSalesInvoiceComponent implements OnInit {
  addedTypesList = []
  documentTypes = ["I", "C", "D"]
  envoiceModel: Envoice = new Envoice();
  envoicesList: Array<Envoice> = [];
  clientsList: Array<Client> = [];
  lines: Array<Line> = [];

  taxs:Array<any>=[]

  taxTypes: Array<{ id: string, code: string }> = [];

  subTypes: Array<{ id: string, code: string }> = [];

  taxableItems: Array<TaxableItem> = [];
  itemsList: Array<Item> = [];
  currencyList: Array<any> = [{ id: "1", name: "USD" }, { id: "2", name: "EG" }]
  itemPrice!:number
  salesTotal:number=0;
  itemsDiscount:number=0;
  netTotal:number=0



  constructor(private apiCall: EnvoiceService,
    private clientSer: ClientService,
    private itemSer: ItemService,
    private staticSer: StaticService,
    public router: Router) { }

  ngOnInit(): void {
    this.getClients()
    sidebarToggling();
    const savedLines = sessionStorage.getItem('lines')
    if (savedLines) {
      this.lines = JSON.parse(savedLines);
    }
  }

  
  addPanel() {
    console.log("after adding", this.lines);
    let line = new Line()
    // line.taxableItems = new TaxableItem()
    this.lines.push(new Line())
  }

  addTax() {
    this.taxs.push({taxId:1,subId:1,rate:1})
  }


  saveItem(line: any, panel: MatExpansionPanel) {

    line.taxableItem = this.taxableItems
    if (this.lines.length === 1) {
      // this.lines[0].taxableItem = this.taxableItems
    }
    // this.lines.push
    sessionStorage.setItem("lines", JSON.stringify(this.lines))
    this.taxableItems = []
    panel.close()
  }

  deleteItem(index: number) {
    this.lines.splice(index, 1);
    sessionStorage.setItem("lines", JSON.stringify(this.lines))
  }
  getClients() {
    this.clientSer.getAll().subscribe((res: any) => {
      this.clientsList = res;
    })
  }

  getItems() {
    this.itemSer.getAll().subscribe((res: any) => {
      console.log("eee",res);
      this.itemsList = res;
    })
  }

  setItemValue(i:any){
    this.itemPrice=i.price 
  }

  getTaxs() {
    this.staticSer.getTaxs().subscribe((res: any) => {
      this.taxTypes = res;
    })
  }

  getSubTypes(sub:number){
    
  }

  getAllBranches() {

  }
  getAllUser() {

  }

  getAllTypes() {

  }

  createInvocieType() {

  }
  calculateFinalEnvoice() {

  }
  setBranch() {
    // this.branchId = this.selectedBranch.branch_code
  }
  setUser() {
    // this.client_id = this.selectedUser.tax_number
  }
  setType() {
    // this.typeCode = this.selectedType.type_code
    // this.typePercentage = this.selectedType.tax_percentage
    // this.typeName = this.selectedType.type_name
    // this.typeUnit = this.selectedType.unit_of_measurment
    // this.typePrice = this.selectedType.price
    // this.accountTypeCode = this.selectedType.account_type_code
  }
  calculatePriceAndTotalPrice() {
    //this.price = this.amount*this.typePrice
    //this.price = this.typePrice
    //this.totalPrice = this.price - this.price*this.typePercentage/100
    // this.typeCommRatioValue = this.amount * this.typePrice * this.typeCommDisc / 100
    // this.totalPrice = (this.amount * this.typePrice) - (this.amount * this.typePrice) * this.typeCommDisc / 100
  }
  deleteType(type: any, index: any) {
    //for (let i = 0; i < this.addedTypesList.length; i++) {
    // if(this.addedTypesList[i].typeCode == type.typeCode){
    // this.addedTypesList.splice(index, 1);
    // // }
    // console.log(type)
    // if (Number(this.typesCounter) != 0) {
    //   this.typesCounter = this.typesCounter - 1;
    //   this.finalEnvoiceTotal = Math.abs(Number(type.total) - Number(this.finalEnvoiceTotal))
    //   this.finalEnvoiceTax = Math.abs(Number(this.finalEnvoiceTax) - (Number(type.value - type.total)))
    //   //this.settingDeductionRatio()
    //   this.totalAddedTax = Math.abs(this.totalAddedTax.toFixed(2) - type.typeAddedTax.toFixed(2))
    //   this.totalCommDisc = Math.abs(this.totalCommDisc.toFixed(2) - type.typeCommDisc.toFixed(2))
    //   this.totalBeforeTaxes = Math.abs(this.totalBeforeTaxes - type.value * type.amount)
    // }
    //}
    // this.deductionRatio = 0
    // this.deductionValue = 0
    // this.envoiceNet = 0
    // console.log(this.addedTypesList)
    // this.envoiceTypesList.splice(0, this.envoiceTypesList.length)
    // this.addedTypesList.forEach(val => this.envoiceTypesList.push(val.invoiceTypeCode));
    // console.log(this.envoiceTypesList)

  }
  settingDeductionRatio() {
    // this.deductionValue = Number(this.finalEnvoiceTotal) * Number(this.deductionRatio / 100);
    // this.envoiceNet = this.finalEnvoiceTotal + this.totalAddedTax - this.deductionValue
  }
  setPayment() {
    // this.payM = this.patmentType
  }
  createEnvoice() {
    // this.createEnvoiceReq = {
    //   "target": "invoice",
    //   "action": "create",
    //   "date": this.date,
    //   "client": this.client_id,
    //   "payment_type": this.payM,
    //   "branch": this.branchId,
    //   "discount_ratio": this.deductionRatio,
    //   "discount_value": this.deductionValue,
    //   "total_invoice": Number(this.envoiceNet),
    //   "notes": this.comment,
    //   "invoice_types": this.envoiceTypesList,
    //   "user_id": sessionStorage.getItem('userId'),
    //   "total_added_tax": this.totalAddedTax,
    //   "total_comm_tax": this.totalCommDisc,
    //   "total_before_taxes": this.totalBeforeTaxes,
    //   "country": this.selectedCountry.Desc_en,
    //   "countryCode": this.selectedCountry.code,
    //   "invoice_type": "invoice",
    //   "total_after_comm_tax": this.finalEnvoiceTotal,
    //   "deduction_value": this.deductionValue
    // }
    // this.apiCall.restServiceCall(this.createEnvoiceReq).subscribe(res => {
    //   this.router.navigate(['/salesInvoice']);
    // })

  }
  resetTypesModal() {
    // this.amount = 0
    // this.price = 0
    // this.totalPrice = 0
    // this.typeCommDisc = 0
    // this.typePrice = this.selectedType.price
  }

  changeTypePriceOnPurpose() {
    // this.typeCommRatioValue = this.amount * this.typePrice * this.typeCommDisc / 100
    // this.totalPrice = (this.amount * this.typePrice) - (this.amount * this.typePrice) * this.typeCommDisc / 100
  }


  getCountries() {
    // this.countriesReq = {
    //   "target": "static",
    //   "action": "get_all_elements",
    //   "table_name": "countries"
    // }
    // this.apiCall.restServiceCall(this.countriesReq).subscribe(res => {
    //   this.countriesRes = res
    //   this.countriesData = this.countriesRes.data
    //   if (this.initTable == false) {
    //     paggnation();
    //     this.initTable = true;
    //   }
    // })
  }

  setCountry() {
    // console.log(this.selectedCountry.Desc_ar)
  }
}
