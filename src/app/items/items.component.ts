import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Item } from '../models/item.model';
import { ItemService } from '../service-layer/item.service';
import { GroupService } from '../service-layer/group.service';
import { StaticService } from '../service-layer/static.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SnackbarService } from '../snackbar.service';

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

  isLoading = false;
  totaRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [10, 20, 30, 40, 50];
  displayedColumns: string[] = [
    'id',
    'name',
    'code',
    'price',
    'unit',
    'taxCode',
    'actions',
  ];
  dataSource: MatTableDataSource<Item> = new MatTableDataSource(this.itemList);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private cd: ChangeDetectorRef,
    private snack: SnackbarService,
    private restCall: ItemService,
    private groupSer: GroupService,
    private staticSer: StaticService
  ) {}

  ngOnInit(): void {
    sidebarToggling();
    this.getAllItems();
  }

  getAllItems() {
    this.isLoading = true;
    this.restCall
      .getAll(this.currentPage + 1, this.pageSize)
      .subscribe((res) => {
        this.dataSource = new MatTableDataSource(res.items);
        this.paginator.length = res.meta?.totalItems;
        this.cd.detectChanges();
        this.isLoading = false;
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getAllItems();
  }
  create() {
    this.isLoading = true;
    this.restCall.create(this.itemModel).subscribe((res) => {
      this.dataSource.data.push(res);
      this.cd.detectChanges();
      this.snack.openSnackBar('تم الحفظ', 3000, 'notif-success');
      this.isLoading = false;
    });
    this.isLoading = false;
  }

  update() {
    this.isLoading = true;
    this.restCall.update(this.itemModel).subscribe((res) => {
      this.getAllItems();
      this.snack.openSnackBar('تم التعديل', 3000, 'notif-success');
      this.isLoading = false;
    });
    this.isLoading = false;
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
    console.log(item);
    
    this.itemModel = item;
  }

  resetModal() {
    this.itemModel = new Item();
  }

  delete(id: string) {
    this.isLoading = true;
    this.restCall.delete(id).subscribe((res) => {
      if (res.affected === 1) {
        this.dataSource.data = this.dataSource.data.filter(
          (item: any) => item.id != id
        );
        this.cd.detectChanges();
        this.snack.openSnackBar('تم الحذف', 3000, 'notif-success');
      }
      this.isLoading = false;
    });
  }
}
