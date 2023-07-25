import { Component, OnInit } from '@angular/core';
import { GenericService } from '../service-layer/generic.service';
import { Item } from '../models/item.model';
import { ItemService } from '../service-layer/item.service';
import { GroupService } from '../service-layer/group.service';
import { StaticService } from '../service-layer/static.service';

declare function paggnation(): any;
declare function sidebarToggling(): any;
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemComponent implements OnInit {
  itemModel = new Item();
  itemList!: Item[];

  selectedGroup: any;
  selectedUnit: any;

  symbols = ['EGS', 'GS1'];
  initSybol: any;
  groupsList!: any[];
  unitList!: any[];
  initTable: boolean = false;

  constructor(
    private restCall: ItemService,
    private groupSer: GroupService,
    private staticSer: StaticService
  ) {}

  ngOnInit(): void {
    sidebarToggling();
    // this.initTable=true
    this.getAllItems();
  }

  getAllItems() {
    this.restCall.getAll().subscribe((res) => {
      this.itemList = res;
      if (this.initTable === false) {
        console.log("4444");
        
        paggnation();
        this.initTable = true;
      }
    });
  }

  create() {
    console.log(this.itemModel);
    
    this.restCall.create(this.itemModel).subscribe((res) => {
      // this.getAllItems()
      this.itemList.push(res);
    });
  }

  update() {
    this.restCall.update(this.itemModel).subscribe((res) => {
      this.getAllItems();
    });
  }

  getGroups() {
    this.groupSer.getAll().subscribe((res) => {
      this.groupsList = res;
    });
  }

  getUnits() {
    this.staticSer.getUnits().subscribe((res) => {
      this.unitList = res;
    });
  }

  setItemToEdite(item: Item) {
    this.itemModel = item;
  }

  resetModal() {
    // this.typeCode = ""
    // this.typeTaxCode = ""
    // this.typeName = ""
    // this.price = ""
    // this.taxPercent = ""
    // this.typeSymbol = ""
  }
  delete(id: string) {
    this.restCall.delete(id).subscribe((res) => {
      if (res.affected === 1) {
        this.itemList = this.itemList.filter((item: any) => item.id != id);
      }
    });
  }
}
