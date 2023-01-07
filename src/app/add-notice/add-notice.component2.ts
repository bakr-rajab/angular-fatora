import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TypesAddedModel } from '../models/invoice/TypesAddedModel';
import { GenericService } from '../service-layer/generic.service';

declare function paggnation():any;
declare function sidebarToggling(): any;
@Component({
  selector: 'app-add-notice',
  templateUrl: './add-notice.component.html',
  styleUrls: ['./add-notice.component.css']
})
export class AddNoticeComponent implements OnInit {

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
  specificInvoiceReq:any
  typeCommDisc :any =0
  typeAddedTax:any
  totalCommDisc:any = 0 
  totalAddedTax:any = 0
  totalBeforeTaxes:any = 0
  sepcificEnvoiceReq:any
  sepcificEnvoiceRes:any
  initVal:any
  initalUser:any
  initalPay:any
  typeCommRatioValue:any
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
    calculatePriceAndTotalPrice(){
      this.price = this.amount*this.typePrice
      //this.totalPrice = this.price - this.price*this.typePercentage/100
      this.typeCommRatioValue = this.price*this.typeCommDisc/100
      this.totalPrice = this.price - this.price*this.typeCommDisc/100
    }
    deleteType(type:any, index:any){
      //for (let i = 0; i < this.addedTypesList.length; i++) {
       // if(this.addedTypesList[i].typeCode == type.typeCode){
          this.addedTypesList.splice(index,1);
       // }
        console.log(type)
        if(Number(this.typesCounter) != 0){
          this.typesCounter = this.typesCounter - 1;
          this.finalEnvoiceTotal =Math.abs(Number(type.total) - Number(this.finalEnvoiceTotal))
          this.finalEnvoiceTax =Math.abs(Number(this.finalEnvoiceTax) - (Number(type.value - type.total)))
          //this.settingDeductionRatio()
          this.totalAddedTax = this.totalAddedTax - type.typeAddedTax
          this.totalCommDisc = this.totalCommDisc - type.typeCommDisc
          this.totalBeforeTaxes = this.totalBeforeTaxes - type.value
        }
      //}
      this.deductionRatio = 0
      this.deductionValue = 0
      this.envoiceNet = 0
      console.log(this.addedTypesList)
      this.envoiceTypesList.splice(0, this.envoiceTypesList.length)
      this.addedTypesList.forEach(val => this.envoiceTypesList.push(val.invoiceTypeCode));
      console.log(this.envoiceTypesList)  
    }
    createInvocieType(){
      this.createInvocieRequest = {
        "target":"invoice_type",
        "action":"create",
        "total_money_type":Number(this.totalPrice),
        "amount":Number(this.amount),
        "invoice_type_id":Number(this.typeCode),
        "user_id": sessionStorage.getItem('userId'),
        "type_tax_percentage": this.typePercentage,
        "type_added_tax":this.totalPrice*this.typePercentage/100,
        "type_comm_tax":this.typeCommRatioValue,
        "type_comm_ratio":this.typeCommDisc
      }
      this.apiCall.restServiceCall(this.createInvocieRequest).subscribe(res =>{
        this.envoiceTypesRes = res
        this.envoiceTypesList.push(this.envoiceTypesRes.data.invoice_type_code)
        console.log(this.envoiceTypesList)
      })
      this.addedType = new TypesAddedModel();
      this.addedType.amount = this.amount
      this.addedType.typeCode = this.typeCode
      this.addedType.typeName = this.typeName
      this.addedType.unit = this.typeUnit
      this.addedType.value = Number(this.price)
      this.addedType.total =  this.totalPrice;
      this.addedType.typeCommDisc = this.typeCommRatioValue
      this.addedType.typeAddedTax = this.totalPrice*this.typePercentage/100
      this.addedTypesList.push(this.addedType);
      this.typesCounter = this.typesCounter + 1
      if(this.initTable== false){
        paggnation();
        this.initTable = true;
      } 
      this.calculateFinalEnvoice()
    }
    calculateFinalEnvoice(){
      this.addedTypesList.forEach(val => this.tempList.push(Object.assign({}, val)));
      this.finalEnvoiceTax = 0
      this.finalEnvoiceTotal = 0
      this.totalAddedTax = 0
      this.totalCommDisc = 0
      this.totalBeforeTaxes = 0
      //this.typesCounter = 1
      for (let i = 0; i < this.tempList.length; i++) {
        this.finalEnvoiceTotal = Number(this.finalEnvoiceTotal) + Number(this.tempList[i].total);
        //this.finalEnvoiceTax = Number(this.finalEnvoiceTax) + Number((this.tempList[i].value - this.tempList[i].total))
        //this.typesCounter = Number(this.typesCounter + i)
        this.totalCommDisc = this.totalCommDisc + this.tempList[i].typeCommDisc
        this.totalAddedTax = this.totalAddedTax + this.tempList[i].typeAddedTax
        this.totalBeforeTaxes = this.totalBeforeTaxes + this.tempList[i].value
      }
      this.envoiceNet = this.finalEnvoiceTotal
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
      this.getSepicificEnvoice()
    }
    getSepicificEnvoice(){
      this.sepcificEnvoiceReq={
        "target":"invoice",
        "action":"invoice_full_info",
        "invoice_code":sessionStorage.getItem('envoiceCode'),
        "user_id":sessionStorage.getItem('userId')
        }
        this.apiCall.restServiceCall(this.sepcificEnvoiceReq).subscribe(res =>{
          this.sepcificEnvoiceRes = res
          this.initVal = this.sepcificEnvoiceRes.data[0].branch[0].brnach_name_ar
          this.initalUser = this.sepcificEnvoiceRes.data[0].client[0].client_name
          this.initalPay = this.sepcificEnvoiceRes.data[0].payment_type
          this.branchId = this.sepcificEnvoiceRes.data[0].branch[0].branch_code
          this.client_id = this.sepcificEnvoiceRes.data[0].client[0].tax_number
          this.payM = this.sepcificEnvoiceRes.data[0].payment_type
          this.date = this.sepcificEnvoiceRes.data[0].date
          this.comment = this.sepcificEnvoiceRes.data[0].notes
          this.deductionRatio = this.sepcificEnvoiceRes.data[0].discount_ratio
          this.envoiceNet = this.sepcificEnvoiceRes.data[0].total_invoice
          this.typesCounter =this.sepcificEnvoiceRes.data[0].invoice_types.invoice_type.length
          this.totalBeforeTaxes = this.sepcificEnvoiceRes.data[0].total_before_taxes
          this.totalAddedTax =  this.sepcificEnvoiceRes.data[0].total_added_tax
          this.totalCommDisc = this.sepcificEnvoiceRes.data[0].total_comm_tax
          if(this.sepcificEnvoiceRes.data[0].invoice_types.invoice_type.length != 0){
            for (let i = 0; i < this.typesCounter; i++){
              this.envoiceTypesList.push(this.sepcificEnvoiceRes.data[0].invoice_types.invoice_type[i].invoice_type_code)
              this.addedType = new TypesAddedModel();
              this.addedType.amount = this.sepcificEnvoiceRes.data[0].invoice_types.invoice_type[i].amount
              this.addedType.typeCode = this.sepcificEnvoiceRes.data[0].invoice_types.invoice_type[i].invoice_type_id[0].type_code
              this.addedType.typeName = this.sepcificEnvoiceRes.data[0].invoice_types.invoice_type[i].invoice_type_id[0].type_name
              this.addedType.unit = this.sepcificEnvoiceRes.data[0].invoice_types.invoice_type[i].invoice_type_id[0].unit_of_measurment
              this.addedType.value = this.sepcificEnvoiceRes.data[0].invoice_types.invoice_type[i].invoice_type_id[0].price
              this.addedType.total = this.sepcificEnvoiceRes.data[0].invoice_types.invoice_type[i].total_money_type
              this.addedType.typeAddedTax = this.sepcificEnvoiceRes.data[0].invoice_types.invoice_type[i].type_added_tax
              this.addedType.typeCommDisc = this.sepcificEnvoiceRes.data[0].invoice_types.invoice_type[i].type_comm_tax
              this.addedType.invoiceTypeCode = this.sepcificEnvoiceRes.data[0].invoice_types.invoice_type[i].invoice_type_code
              this.addedTypesList.push(this.addedType)
            }
           // this.addedTypesList.forEach(val => this.tempList.push(Object.assign({}, val)));
          }
          this.selectedBranch = "def"
          this.selectedUser = "def"
          this.patmentType = "def"
          this.calculateFinalEnvoice()
        })
    } 

    createEnvoiceReport(){
      this.createEnvoiceReportReq={
        "target":"invoice_report",
        "action":"create",
        "date":this.date,
        "notice_number":Number(this.noticeNum),
        "report_type":"Add", 
        "invoice_id":this.envoiceCode,
        "notes":this.comment,
        "invoice_types":this.envoiceTypesList, 
        "user_id":sessionStorage.getItem('userId'),
        "client_name":this.clientName,
        "ph_number":this.phNum,
        "branch_name": this.branchName,
        "tax_number":this.client_id
        }
        this.apiCall.restServiceCall(this.createEnvoiceReportReq).subscribe(res =>{
          this.router.navigate(['/viewAddedNotice']); 
        })
    }
}
