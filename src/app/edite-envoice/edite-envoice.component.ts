import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TypesAddedModel } from '../models/invoice/TypesAddedModel';
import { GenericService } from '../service-layer/generic.service';

declare function paggnation():any;
declare function sidebarToggling(): any
@Component({
  selector: 'app-edite-envoice',
  templateUrl: './edite-envoice.component.html',
  styleUrls: ['./edite-envoice.component.css']
})
export class EditeEnvoiceComponent implements OnInit {

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
  userEditFlag:boolean = false
  branchEditeFlag:boolean = false
  paymentEditeFlag:boolean = false
  paymentMethods=[
    'cash',
    'credit'
  ]
  sepcificEnvoiceReq:any
  sepcificEnvoiceRes:any
  initVal:any
  initalUser:any
  initalPay:any
  initCountry:any
  editeEnvoicReq:any
  typeCommDisc :any =0
  typeAddedTax:any
  totalCommDisc:any = 0 
  totalAddedTax:any = 0
  totalBeforeTaxes:any = 0
   typeCommRatioValue:any
   countriesReq:any
   countriesRes:any
   countriesData:any
   selectedCountry:any
   accountTypeCode:any
   isInvoice:boolean =true
  constructor(private apiCall: GenericService,public router:Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('routeBack') == '/salesInvoice'){
      this.isInvoice = true
    }else{
      this.isInvoice = false
    }
    this.getAllBranches()
    this.getAllTypes()
    this.getAllUser()
    this.getSepicificEnvoice()
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
      this.addedType.typeCommDisc = this.typeCommRatioValue
      this.addedType.typeAddedTax = this.totalPrice*this.typePercentage/100
      this.addedType.accountTypeCode = this.accountTypeCode
      this.addedTypesList.push(this.addedType);
      this.typesCounter = this.typesCounter + 1
      if(this.initTable== false){
        paggnation();
        this.initTable = true;
      } 
      this.calculateFinalEnvoice()
    })
    }
    calculateFinalEnvoice(){
      this.tempList = []
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
        this.totalBeforeTaxes = this.totalBeforeTaxes + this.tempList[i].value*this.tempList[i].amount
      }
      this.envoiceNet = this.finalEnvoiceTotal
      this.tempList.splice(0,this.tempList.length)
      console.log(this.tempList)
    }
    setBranch(){
      this.branchEditeFlag = true
      this.branchId = this.selectedBranch.branch_code
    }
    setUser(){
      this.userEditFlag =  true
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
          this.totalBeforeTaxes = Math.abs(this.totalBeforeTaxes - type.value * type.amount)
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
      this.paymentEditeFlag = true
      this.payM = this.patmentType
    }
    // createEnvoice(){
    //   this.createEnvoiceReq={
    //     "target":"invoice",
    //     "action":"create",
    //     "date":this.date,
    //     "client":this.client_id,
    //     "payment_type":this.payM,
    //     "branch":this.branchId,
    //     "discount_ratio":this.deductionRatio,
    //     "total_invoice":Number(this.envoiceNet),
    //     "notes":this.comment,
    //     "invoice_types":this.envoiceTypesList,
    //     "user_id":sessionStorage.getItem('userId')
    //     }
    //     this.apiCall.restServiceCall(this.createEnvoiceReq).subscribe(res =>{
    //       this.router.navigate(['/salesInvoice']);
    //     })

    // }
    resetTypesModal(){
      this.amount = 0
      this.price = 0
      this.totalPrice = 0
    }

    changeTypePriceOnPurpose(){
      this.typeCommRatioValue = this.amount*this.typePrice*this.typeCommDisc/100
      this.totalPrice = (this.amount*this.typePrice) - (this.amount*this.typePrice) * this.typeCommDisc/100
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
          this.initCountry = this.sepcificEnvoiceRes.data[0].country
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
          this.finalEnvoiceTotal = this.sepcificEnvoiceRes.data[0].total_after_comm_tax
          this.deductionValue = this.sepcificEnvoiceRes.data[0].deduction_value
          if(this.sepcificEnvoiceRes.data[0].invoice_types.invoice_type.length != 0){
            for (let i = 0; i < this.typesCounter; i++){
              this.envoiceTypesList.push(this.sepcificEnvoiceRes.data[0].invoice_types.invoice_type[i].invoice_type_code)
              this.addedType = new TypesAddedModel();
              this.addedType.amount = this.sepcificEnvoiceRes.data[0].invoice_types.invoice_type[i].amount
              this.addedType.typeCode = this.sepcificEnvoiceRes.data[0].invoice_types.invoice_type[i].invoice_type_id[0].type_code
              this.addedType.typeName = this.sepcificEnvoiceRes.data[0].invoice_types.invoice_type[i].invoice_type_id[0].type_name
              this.addedType.accountTypeCode = this.sepcificEnvoiceRes.data[0].invoice_types.invoice_type[i].invoice_type_id[0].account_type_code
              this.addedType.unit = this.sepcificEnvoiceRes.data[0].invoice_types.invoice_type[i].invoice_type_id[0].unit_of_measurment
              this.addedType.value = this.sepcificEnvoiceRes.data[0].invoice_types.invoice_type[i].invoice_type_id[0].price
              this.addedType.editedPrice =  this.sepcificEnvoiceRes.data[0].invoice_types.invoice_type[i].invoice_type_id[0].invoice_type_price
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
          this.selectedCountry = "def"
          //this.calculateFinalEnvoice()
        })
    } 

    editeEnvocie(){
     // this.addedTypesList.forEach(val => this.envoiceTypesList.push(val.invoiceTypeCode));
      this.editeEnvoicReq={
        "target":"invoice",
        "action":"edite",
        "unique_value":{
            "invoice_code":sessionStorage.getItem('envoiceCode')
        },
        "client":Number(this.client_id),
        "payment_type":this.payM,
        "branch":this.branchId,
        "discount_ratio":Number(this.deductionRatio),
        "discount_value":this.deductionValue,
        "total_invoice":Number(this.envoiceNet),
        "notes":this.comment,
        "invoice_types":this.envoiceTypesList,
        "total_added_tax":this.totalAddedTax,
        "total_comm_tax":this.totalCommDisc,
        "total_before_taxes":this.totalBeforeTaxes,
        "country":this.selectedCountry.Desc_en,
        "countryCode": this.selectedCountry.code,
        "total_after_comm_tax": this.finalEnvoiceTotal
        }
        this.apiCall.restServiceCall(this.editeEnvoicReq).subscribe(res =>{
          this.router.navigate([sessionStorage.getItem('routeBack')]);
        })
    }

    lastScreen(){
      this.router.navigate([sessionStorage.getItem('routeBack')]);
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
