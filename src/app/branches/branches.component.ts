import { Component, OnInit } from '@angular/core';
import { GenericService } from '../service-layer/generic.service';

declare function paggnation(): any;
declare function sidebarToggling(): any;
 
@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {

  getBranchesReq:any
  branchesRes:any
  branchesList:any
  i:any
  branchNameAr:any
  branchNameEn:any
  editeReq:any
  branchId:any
  deleteBranchReq:any
  addBranchReq:any
  branchCode:any
  invoiceSerial:any
  initTable:boolean = false
  constructor(private apiCall: GenericService) { }

  ngOnInit(): void {
    // paggnation();
    sidebarToggling()
    this.getAllBranches()
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
        if(this.initTable== false){
          paggnation();
          this.initTable = true;
        }
      })
  }

  editeBranch(){
    this.editeReq={
      "target":"branch",
      "action":"edite",
      "unique_value":{
          "branch_code":this.branchId
      },
      "branch_name_en":this.branchNameEn,
      "brnach_name_ar":this.branchNameAr,
      "user_id":sessionStorage.getItem('userId'),
      "account_branch_code" :  this.branchCode  
    }
      this.apiCall.restServiceCall(this.editeReq).subscribe(res =>{ 
        
      })
      this.getAllBranches()
  }

  setAndDeleteBranch(branch:any){
    this.deleteBranchReq = {
      "target":"branch",
      "action":"delete",
      "key":"branch_code",
      "value":branch.branch_code,
      "user_id":sessionStorage.getItem('userId')
      }
      this.apiCall.restServiceCall(this.deleteBranchReq).subscribe(res =>{ 
        
      })
      this.getAllBranches()
  }
  AddBranch(){
    this.addBranchReq={
      "target":"branch",
      "action":"create",
      "branch_name_en":this.branchNameEn,
      "brnach_name_ar":this.branchNameAr,
      "invoice_counter": this.invoiceSerial,
      "account_branch_code": this.branchCode,
      "user_id":sessionStorage.getItem('userId')
      }
      this.apiCall.restServiceCall(this.addBranchReq).subscribe(res =>{ 
        
      })
      this.getAllBranches()
  }
  setBranchToEdite(branch:any){
    this.branchId = branch.branch_code
    this.branchNameAr = branch.brnach_name_ar
    this.branchNameEn = branch.branch_name_en
   
  }

}
