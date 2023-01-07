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
  comment:any
  paymentMethods=[
    'cash',
    'credit'
  ]
  typeCommDisc :any =0
  typeAddedTax:any
  totalCommDisc:any = 0 
  totalAddedTax:any = 0
  totalBeforeTaxes:any = 0
  deleteInvocieTypeReq:any
  typeCommRatioValue:any

  countriesReq:any
  countriesRes:any
  countriesData:any
  selectedCountry:any
  accountTypeCode:any
  constructor(private apiCall: GenericService,public router:Router) { }

  ngOnInit(): void {
    this.getAllBranches()
    this.getAllTypes()
    this.getAllUser()
    this.getCountries() 
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

    createInvocieType(){
      this.createInvocieRequest = {
        "target":"invoice_type",
        "action":"create",
        "total_money_type":Number(this.totalPrice),
        "amount":Number(this.amount),
        "invoice_type_id":this.typeCode,
        "user_id": sessionStorage.getItem('userId'),
        "type_tax_percentage": this.typePercentage,
        "type_added_tax":this.totalPrice*this.typePercentage/100,
        "type_comm_tax":this.typeCommRatioValue,
        "type_comm_ratio":this.typeCommDisc,
        "invoice_type_price":this.typePrice
      }
      this.apiCall.restServiceCall(this.createInvocieRequest).subscribe(res =>{
        this.envoiceTypesRes = res
        this.envoiceTypesList.push(this.envoiceTypesRes.data.invoice_type_code)
        console.log(this.envoiceTypesList)
        this.addedType = new TypesAddedModel();
      this.addedType.amount = this.amount
      this.addedType.typeCode = this.typeCode
      this.addedType.typeName = this.typeName
      this.addedType.unit = this.typeUnit
      this.addedType.value = Number(this.typePrice)
      this.addedType.total =  this.totalPrice;
      this.addedType.invoiceTypeCode = this.envoiceTypesRes.data.invoice_type_code
      this.addedType.typeCommDisc = this.typeCommRatioValue
      this.addedType.typeAddedTax = this.totalPrice*this.typePercentage/100
      this.addedType.accountTypeCode = this.accountTypeCode
      this.addedTypesList.push(this.addedType);

      if(this.initTable== false){
        paggnation();
        this.initTable = true;
      } 
      this.calculateFinalEnvoice()
      })
      
      
    }
    calculateFinalEnvoice(){
      this.addedTypesList.forEach(val => this.tempList.push(Object.assign({}, val)));
      this.finalEnvoiceTax = 0
      this.finalEnvoiceTotal = 0
      this.totalAddedTax = 0
      this.totalCommDisc = 0
      this.totalBeforeTaxes = 0
      this.typesCounter = 1
      for (let i = 0; i < this.tempList.length; i++) {
        this.finalEnvoiceTotal = Number(this.finalEnvoiceTotal) + Number(this.tempList[i].total);
        //this.finalEnvoiceTax = Number(this.finalEnvoiceTax) + Number((this.tempList[i].value - this.tempList[i].total))
        this.typesCounter = Number(this.typesCounter + i)
        this.totalCommDisc = this.totalCommDisc + this.tempList[i].typeCommDisc
        this.totalAddedTax = this.totalAddedTax + this.tempList[i].typeAddedTax
        this.totalBeforeTaxes = this.totalBeforeTaxes + this.tempList[i].value*this.tempList[i].amount

      }
      this.envoiceNet = this.finalEnvoiceTotal
      this.tempList.splice(0,this.tempList.length)
      console.log(this.tempList)
    }
    setBranch(){
      this.branchId = this.selectedBranch.branch_code
    }
    setUser(){
      this.client_id = this.selectedUser.tax_number
    }
    setType(){
      this.typeCode = this.selectedType.type_code
      this.typePercentage = this.selectedType.tax_percentage
      this.typeName = this.selectedType.type_name
      this.typeUnit = this.selectedType.unit_of_measurment
      this.typePrice = this.selectedType.price
      this.accountTypeCode = this.selectedType.account_type_code
    }
    calculatePriceAndTotalPrice(){
      //this.price = this.amount*this.typePrice
      //this.price = this.typePrice
      //this.totalPrice = this.price - this.price*this.typePercentage/100
      this.typeCommRatioValue = this.amount*this.typePrice*this.typeCommDisc/100
      this.totalPrice = (this.amount*this.typePrice) - (this.amount*this.typePrice) * this.typeCommDisc/100
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
          this.totalAddedTax = Math.abs(this.totalAddedTax.toFixed(2) - type.typeAddedTax.toFixed(2))
          this.totalCommDisc = Math.abs(this.totalCommDisc.toFixed(2) - type.typeCommDisc.toFixed(2))
          this.totalBeforeTaxes = Math.abs(this.totalBeforeTaxes - type.value *type.amount)
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
    settingDeductionRatio(){
      this.deductionValue = Number(this.finalEnvoiceTotal) * Number(this.deductionRatio/100);
      this.envoiceNet = this.finalEnvoiceTotal + this.totalAddedTax - this.deductionValue
    }
    setPayment(){
      this.payM = this.patmentType
    }
    createEnvoice(){
      this.createEnvoiceReq={
        "target":"invoice",
        "action":"create",
        "date":this.date,
        "client":this.client_id,
        "payment_type":this.payM,
        "branch":this.branchId,
        "discount_ratio":this.deductionRatio,
        "discount_value":this.deductionValue,
        "total_invoice":Number(this.envoiceNet),
        "notes":this.comment,
        "invoice_types":this.envoiceTypesList,
        "user_id":sessionStorage.getItem('userId'),
        "total_added_tax":this.totalAddedTax,
        "total_comm_tax":this.totalCommDisc,
        "total_before_taxes":this.totalBeforeTaxes,
        "country": this.selectedCountry.Desc_en,
        "countryCode": this.selectedCountry.code,
        "invoice_type":"add",
        "total_after_comm_tax": this.finalEnvoiceTotal,
        "deduction_value": this.deductionValue
        }
        this.apiCall.restServiceCall(this.createEnvoiceReq).subscribe(res =>{
          this.router.navigate(['/viewAddedNotice']);
        })

    }
    resetTypesModal(){
      this.amount = 0
      this.price = 0
      this.totalPrice = 0
      this.typeCommDisc = 0
      this.typePrice = this.selectedType.price
    }

    changeTypePriceOnPurpose(){
      this.typeCommRatioValue = this.amount*this.typePrice*this.typeCommDisc/100
      this.totalPrice = (this.amount*this.typePrice) - (this.amount*this.typePrice) * this.typeCommDisc/100
    }

    
    getCountries(){
      this.countriesReq={
        "target":"static",
        "action":"get_all_elements",
        "table_name":"countries"
        }
        this.apiCall.restServiceCall(this.countriesReq).subscribe(res =>{ 
          this.countriesRes = res
          this.countriesData = this.countriesRes.data
          if(this.initTable== false){
            paggnation();
            this.initTable = true;
          } 
        })
    }

    setCountry(){
      console.log(this.selectedCountry.Desc_ar)
    }
}
