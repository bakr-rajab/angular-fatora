import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddPlan } from '../models/programs/addPlan';
import { deletePlan } from '../models/programs/deletePlan';
import { EditePlan } from '../models/programs/editePlan';
import { GetPrograms } from '../models/programs/getPrograms';
import { GenericService } from '../service-layer/generic.service';

declare function paggnation():any;
declare function sidebarToggling(): any;
@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {
  response : any;
  plans : any
  programsModel: GetPrograms = new GetPrograms;
  addPlanModel: AddPlan = new AddPlan;
  editeModel:  EditePlan = new EditePlan
  deleteModel: deletePlan = new deletePlan
  id_Edite!: string;
  id_Rm!: string;
  initTable:boolean=false
  constructor(private apiCall: GenericService, private router: Router) { }

  ngOnInit(): void {
    
    sidebarToggling();
    this.getAllPlans();
  }

  getAllPlans(){
    this.programsModel.target = "plan"
    this.programsModel.action = "get_all_plans"
    this.apiCall.restServiceCall(this.programsModel).subscribe(res =>{
      this.response = res;
      this.plans = this.response.data; 
      if(this.initTable== false){
        paggnation();
        this.initTable = true;
      } 
    })
  }
  addPlan(){
    this.addPlanModel.action= "create"
    this.addPlanModel.target= "plan"
    this.addPlanModel.plan_duration = Number(this.addPlanModel.plan_duration);
    this.apiCall.restServiceCall(this.addPlanModel).subscribe(res =>{ 
    })
    this.getAllPlans();
  }

  editePlan(){
    this.editeModel.action= "edit"
    this.editeModel.target= "plan"
    this.editeModel.unique_value = {plan_id : this.id_Edite};
    this.editeModel.plan_duration = Number(this.editeModel.plan_duration);
    this.apiCall.restServiceCall(this.editeModel).subscribe(res =>{ 
    })
    this.getAllPlans();
  }

  deletePlan(){

  }
  setPlanIdToEdite(id: any){
    this.id_Edite = id;
  }
  setPlanToRm(id: any){
    this.id_Rm = id;
    this.deleteModel.action="delete"
    this.deleteModel.target="plan"
    this.deleteModel.key="plan_id"
    this.deleteModel.value= id
    this.apiCall.restServiceCall(this.deleteModel).subscribe(res =>{ 
    })
    this.getAllPlans();
  }
  
}
