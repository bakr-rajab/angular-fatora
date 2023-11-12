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
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { take, takeUntil } from 'rxjs/operators';
import { ReplaySubject, Subject } from 'rxjs';

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

  // subTypes: Array<{ id: string; code: string }> = [];
  subTypes: any;

  taxableItems: Array<TaxableItem> = [];
  public items: ReplaySubject<Item[]> = new ReplaySubject<Item[]>(1);
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
  protected _onDestroy = new Subject<void>();

  public itemCtrl = new FormControl<string>('');
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
    this.items.next(this.itemsList.slice());
    this.itemCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });
  }
  protected filterBanks() {
    if (!this.itemsList.length) {
      return;
    }
    let search: any = this.itemCtrl.value;

    if (!search) {
      this.items.next(this.itemsList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.items.next(
      this.itemsList.filter(
        (bank) => bank.name.toLowerCase().indexOf(search?.toLowerCase()) > -1
      )
    );
  }

  setItemPrice(id: any, line: any) {
    const price = this.itemsList.find((item) => item.id === id)?.price;

    line.form.patchValue({
      price: price,
    });
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
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
      sub: [],
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
      console.log({ line });
      // line.form.value.salesTotal=line.form.value.price*line.form.value.quantity
      return {
        ...line.form.value,
        taxbleItem: line.taxs.map((x) => x.form.value),
      };
    });
    // console.log(lines);
    this.envoiceModel.lines = lines;
    console.log(this.envoiceModel);

    this.apiCall.create(this.envoiceModel).subscribe((res) => {
      console.log(res);
    });
  }

  getClients() {
    this.clientSer.getAll().subscribe((res: any) => {
      this.clientsList = res;
    });
  }

  getItems() {
    this.itemSer.getAll().subscribe((res: any) => {
      this.itemsList = res;
      this.items.next(res.slice());
    });
  }

  getTaxs() {
    this.staticSer.getTaxs().subscribe((res: any) => {
      this.taxTypes = res;
    });
  }

  setSub(v: any) {
    const sub: any = this.taxTypes.find((item) => item.id === v.value.taxId);
    v.value.sub = sub.subtax;
    console.log(v);
  }

  getSubTypes(v: any, id: any) {
    // const sub: any = this.taxTypes.find((item) => item.id === id);
    // console.log(sub.subtax);
    // v.value.sub = [...sub.subtax];
    // console.log(v);
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
  setType() {}
  calculatePriceAndTotalPrice() {}
  deleteType(type: any, index: any) {}
  settingDeductionRatio() {}
  setPayment() {
    // this.payM = this.patmentType
  }
  createEnvoice() {}
  resetTypesModal() {}

  changeTypePriceOnPurpose() {}

  getCountries() {}

  setCountry() {}
}
