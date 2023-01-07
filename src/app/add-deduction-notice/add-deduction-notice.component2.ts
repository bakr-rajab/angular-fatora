import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TypesAddedModel } from '../models/invoice/TypesAddedModel';
import { GenericService } from '../service-layer/generic.service';

declare function paggnation():any;
declare function sidebarToggling(): any;
declare function disableOthers(index:any): any
declare function enableAll(index:any):any
@Component({
  selector: 'app-add-deduction-notice',
  templateUrl: './add-deduction-notice.component.html',
  styleUrls: ['./add-deduction-notice.component.css']
})
export class AddDeductionNoticeComponent implements OnInit {

  getBranchesReq:any
  branchesRes:any
  branchesList:any
  getUserModel:any
  usersRes:any
  usersList:any
  getAllTypesReq:any
  allTypesRes:any
  typesList:any
  selectedBranch:any
  branchId:any
  selectedUser:any
  client_id:number = 0
  selectedType:any
  typeCode:any
  createInvocieRequest:any
  amount:any
  price:any
  totalPrice:any
  envoiceTypesList: Array<any> = [];
  envoiceTypesRes:any
  typePercentage:any
  addedTypesList: Array<TypesAddedModel> = [];
  addedType = new TypesAddedModel();
  typeName:any
  typeUnit:any
  typePrice:any
  initTable:boolean=false
  finalEnvoiceTotal:number = 0
  finalEnvoiceTax:number = 0
  typesCounter:number = 0
  tempList: Array<TypesAddedModel> = []
  deductionRatio: number = 0
  deductionValue : number = 0
  envoiceNet: number = 0
  createEnvoiceReq:any
  createEnvoiceRes:any
  date:any
  patmentType:any
  payM:any
  getAllEnvoicesReq:any
  envoicesRes:any
  envoicesList:any
  selectedEnvoice:any
  envoiceCode:any
  createEnvoiceReportReq:any
  noticeNum:any
  comment:any
  envoiceTypesReq:any
  selectedEnvoiceTypesList:any
  selectedEnvoiceTypesRes:any
  amounttoedite:any
  tempTotal:number = 0
  tempTax:number = 0
  deductionNoticeReq:any
  showeError:any
  hideSaveBtn:boolean = false
  originAmount: Array<number> = []
  currentAmount:any
  typeCommDisc :any =0
  typeAddedTax:any
  totalCommDisc:any = 0 
  totalAddedTax:any = 0
  totalBeforeTaxes:any = 0
  initTotalAddedTax:any = 0
  initTotalCommTax:any = 0
  initTotalBeforeTax:any = 0
  clientName:any
  phNum:any
  branchName:any
  constructor(private apiCall: GenericService,public router:Router) { }

  ngOnInit(): void {
    this.getAllBranches()
    this.getAllTypes()
    this.getAllUser()
    this.getAllEnvoices()
    sidebarToggling();
  }
  getAllBranches(){
    this.getBranchesReq={
      "target":"branch",
      "action":"get_all_branchs",
      "user_id":sessionStorage.getItem('userId')
      }
      this.apiCall.restServiceCall(this.getBranchesReq).subscribe(res =>{ 
        this.branchesRes = res
        this.branchesList = this.branchesRes.data
      })
  }
  getAllUser(){
    this.getUserModel = {
      target:"client",
      action:"get_all_clients",
      user_id:sessionStorage.getItem('userId')
      }
      this.apiCall.restServiceCall(this.getUserModel).subscribe(res =>{ 
        this.usersRes = res
        this.usersList = this.usersRes.data
      })
    }

    getAllTypes(){
      this.getAllTypesReq={
        "target":"type",
        "action":"get_all_types",
        "user_id":sessionStorage.getItem('userId')
        }
        this.apiCall.restServiceCall(this.getAllTypesReq).subscribe(res =>{
          this.allTypesRes =res
          this.typesList = this.allTypesRes.data  
        })
    }

    setBranch(){
      this.branchId = this.selectedBranch.branch_code
      this.branchName = this.selectedBranch.brnach_name_ar
    }
    setUser(){
      this.client_id = this.selectedUser.tax_number
      this.clientName = this.selectedUser.client_name
      this.phNum = this.selectedUser.ph_number
    }
    setType(){
      this.typeCode = this.selectedType.type_code
      this.typePercentage = this.selectedType.tax_percentage
      this.typeName = this.selectedType.type_name
      this.typeUnit = this.selectedType.unit_of_measurment
      this.typePrice = this.selectedType.price
    }

    getAllEnvoices(){
      this.getAllEnvoicesReq={
        "target":"invoice",
        "action":"get_all_invoices",
        "user_id":sessionStorage.getItem('userId')
        }
        this.apiCall.restServiceCall(this.getAllEnvoicesReq).subscribe(res =>{ 
          this.envoicesRes = res
          this.envoicesList = this.envoicesRes.data
        })
    }

    setEnvocie(){
      this.envoiceCode=this.selectedEnvoice.invoice_code
      this.selectedEnvoiceTypesList = this.selectedEnvoice.invoice_types
      for(let i=0; i<= this.addedTypesList.length; i++){
        this.addedTypesList.pop()
      }
      this.getEnvoiceTypes()
    }

  getEnvoiceTypes(){
    this.envoiceTypesReq={
      "target":"invoice_type",
      "action":"get_invoice_type",
      "invoice_type_code":this.selectedEnvoiceTypesList,
      "user_id":sessionStorage.getItem('userId')
      }
      this.apiCall.restServiceCall(this.envoiceTypesReq).subscribe(res =>{ 
        this.selectedEnvoiceTypesRes = res
        //this.addedTypesList = this.selectedEnvoiceTypesRes.data
        this.typesCounter = this.selectedEnvoiceTypesRes.data.length;
        for (let i = 0; i < this.selectedEnvoiceTypesRes.data.length; i++){
          this.addedType = new TypesAddedModel();
          this.addedType.amount = this.selectedEnvoiceTypesRes.data[i].amount
          this.originAmount.push(this.addedType.amount);
          this.addedType.typeCode = this.selectedEnvoiceTypesRes.data[i].invoice_type_id[0].type_code
          this.addedType.typeName = this.selectedEnvoiceTypesRes.data[i].invoice_type_id[0].type_name
          this.addedType.unit = this.selectedEnvoiceTypesRes.data[i].invoice_type_id[0].unit_of_measurment
          this.addedType.value = this.selectedEnvoiceTypesRes.data[i].invoice_type_id[0].price
          this.addedType.total = this.selectedEnvoiceTypesRes.data[i].total_money_type
          this.addedType.invoiceTypeTaxPercentage = this.selectedEnvoiceTypesRes.data[i].type_tax_percentage;
          this.addedType.typeAddedTax = this.selectedEnvoiceTypesRes.data[i].type_added_tax
          this.addedType.typeCommDisc = this.selectedEnvoiceTypesRes.data[i].type_comm_tax
          this.addedType.typeCommRatio = this.selectedEnvoiceTypesRes.data[i].type_comm_ratio
          this.initTotalAddedTax = this.initTotalAddedTax + this.selectedEnvoiceTypesRes.data[i].type_added_tax
          this.initTotalCommTax =  this.initTotalCommTax + this.selectedEnvoiceTypesRes.data[i].type_comm_tax
          this.initTotalBeforeTax = this.initTotalBeforeTax + this.selectedEnvoiceTypesRes.data[i].invoice_type_id[0].price * this.selectedEnvoiceTypesRes.data[i].amount
          this.addedTypesList.push(this.addedType)
          this.tempTotal = this.tempTotal + this.selectedEnvoiceTypesRes.data[i].total_money_type;
          this.tempTax = this.tempTax + (Math.abs(this.selectedEnvoiceTypesRes.data[i].invoice_type_id[0].price - this.selectedEnvoiceTypesRes.data[i].total_money_type))
        }
        this.finalEnvoiceTotal = this.tempTotal
        this.finalEnvoiceTax = this.tempTax
        this.totalBeforeTaxes = this.initTotalBeforeTax
        this.totalAddedTax = this.initTotalAddedTax
        this.totalCommDisc = this.initTotalCommTax
        if(this.initTable== false){
          paggnation();
          this.initTable = true;
        } 
      })  
  }

  deleteType(type:any, index:any){
    //for (let i = 0; i < this.addedTypesList.length; i++) {
     // if(this.addedTypesList[i].typeCode == type.typeCode){
        this.addedTypesList.splice(index,1);
     // }
      console.log(type)
      if(Number(this.typesCounter) != 0){
        this.typesCounter = this.typesCounter - 1;
        this.finalEnvoiceTotal =Math.floor(Math.abs(Number(type.total) - Number(this.finalEnvoiceTotal)))
        this.finalEnvoiceTax =Math.floor(Math.abs(Number(this.finalEnvoiceTax) - (Math.abs(Number(type.value - type.total)))))
        //this.settingDeductionRatio()
      }
    //}
    this.deductionRatio = 0
    this.deductionValue = 0
    this.envoiceNet = 0
    console.log(this.addedTypesList)

    this.addedTypesList.forEach(val => this.tempList.push(Object.assign({}, val)));
    this.finalEnvoiceTax = 0
    this.finalEnvoiceTotal = 0
    this.typesCounter = 0
    this.totalBeforeTaxes = 0
    this.totalAddedTax = 0
    this.totalCommDisc = 0
    for (let i = 0; i < this.tempList.length; i++) {
      this.finalEnvoiceTotal = Number(this.finalEnvoiceTotal) + Number(this.tempList[i].total);
      this.finalEnvoiceTax = Number(this.finalEnvoiceTax) + Math.abs(Number((this.tempList[i].value - this.tempList[i].total)))
      this.typesCounter = Number(this.typesCounter + 1)

      this.totalBeforeTaxes = this.totalBeforeTaxes + this.tempList[i].value * Number(this.tempList[i].amount)
      this.totalAddedTax = this.totalAddedTax + this.tempList[i].typeAddedTax
      this.totalCommDisc = this.totalCommDisc + this.tempList[i].typeCommDisc
    }
    this.tempList.splice(0,this.tempList.length)
    console.log(this.tempList)
  }
  // createInvocieType(){
  //   this.createInvocieRequest = {
  //     "target":"invoice_type",
  //     "action":"create",
  //     "total_money_type":Number(this.totalPrice),
  //     "amount":Number(this.amount),
  //     "invoice_type_id":Number(this.typeCode),
  //     "user_id": sessionStorage.getItem('userId')
  //   }
  //   this.apiCall.restServiceCall(this.createInvocieRequest).subscribe(res =>{
  //     this.envoiceTypesRes = res
  //     this.envoiceTypesList.push(this.envoiceTypesRes.data.invoice_type_code)
  //     console.log(this.envoiceTypesList)
  //   })
  //   this.addedType = new TypesAddedModel();
  //   this.addedType.amount = this.amount
  //   this.addedType.typeCode = this.typeCode
  //   this.addedType.typeName = this.typeName
  //   this.addedType.unit = this.typeUnit
  //   this.addedType.value = Number(this.price)
  //   this.addedType.total =  this.totalPrice;
  //   this.addedTypesList.push(this.addedType);
  //   if(this.initTable== false){
  //     paggnation();
  //     this.initTable = true;
  //   } 
  //   this.calculateFinalEnvoice()
  // }
  calculateFinalEnvoice(amount:any, r:any){
    this.showeError=this.addedTypesList.length+1
    this.hideSaveBtn = false
    for(let c = 0; c < this.addedTypesList.length; c++){
      enableAll('ele'+c);
    }
    if(amount == 0 || amount > this.originAmount[r]){
      this.showeError = r
      this.currentAmount = this.originAmount[r]
      this.hideSaveBtn = true
      for(let c = 0; c <= this.addedTypesList.length; c++){
        if(c != r){
          disableOthers('ele'+c);
        }
      }
      return;
    }

    console.log(this.addedTypesList)

    
    //this.addedTypesList.forEach((e,i) => e.total = Math.abs(amount*e.value - amount*e.value*Number(e.invoiceTypeTaxPercentage)))
    // this.addedTypesList[r].total = Math.abs(Number(amount) * Number(this.addedTypesList[r].value) - 
    // Number(amount) * Number(this.addedTypesList[r].value) * Number(this.addedTypesList[r].invoiceTypeTaxPercentage)/100)
    this.addedTypesList[r].total= Math.abs(Number(amount) * Number(this.addedTypesList[r].value) -
     Number(amount) * Number(this.addedTypesList[r].value)* this.addedTypesList[r].typeCommRatio/100)
    this.addedTypesList[r].typeCommDisc = Number(amount) * Number(this.addedTypesList[r].value)* this.addedTypesList[r].typeCommRatio/100
    this.addedTypesList[r].typeAddedTax = this.addedTypesList[r].total * this.addedTypesList[r].invoiceTypeTaxPercentage/100
    this.addedTypesList.forEach(val => this.tempList.push(Object.assign({}, val)));
    this.finalEnvoiceTax = 0
    this.finalEnvoiceTotal = 0
    this.typesCounter = 0
    this.totalBeforeTaxes = 0
    this.totalAddedTax = 0
    this.totalCommDisc = 0
    for (let i = 0; i < this.tempList.length; i++) {
      this.finalEnvoiceTotal = Number(this.finalEnvoiceTotal) + Number(this.tempList[i].total);
      this.finalEnvoiceTax = Number(this.finalEnvoiceTax) + Math.abs(Number((this.tempList[i].value - this.tempList[i].total)))
      this.typesCounter = Number(this.typesCounter + 1)

      this.totalBeforeTaxes = this.totalBeforeTaxes + this.tempList[i].value * Number(this.tempList[i].amount)
      this.totalAddedTax = this.totalAddedTax + this.tempList[i].typeAddedTax
      this.totalCommDisc = this.totalCommDisc + this.tempList[i].typeCommDisc
    }
    this.tempList.splice(0,this.tempList.length)
    console.log(this.tempList)
  }
  settingDeductionRatio(){
    this.deductionValue = Number(this.finalEnvoiceTotal) * Number(this.deductionRatio/100);
    this.envoiceNet = this.finalEnvoiceTotal - this.deductionValue
  }
  resetTypesModal(){
    this.amount = 0
    this.price = 0
    this.totalPrice = 0
  }
  addDeductionNotice(){
    this.deductionNoticeReq={
      "target":"invoice_report",
      "action":"create",
      "date":this.date,
      "notice_number":Number(this.noticeNum),
      "report_type":"discount", 
      "invoice_id":this.envoiceCode,
      "notes":this.comment,
      "invoice_types":this.addedTypesList, 
      "user_id":sessionStorage.getItem('userId'),
      "client_name":this.clientName,
      "ph_number":this.phNum,
      "branch_name": this.branchName,
      "tax_number":this.client_id
      }
      this.apiCall.restServiceCall(this.deductionNoticeReq).subscribe(res =>{ 
        this.router.navigate(['/viewAddeddDeductionNotice']); 
      })
  }
}
