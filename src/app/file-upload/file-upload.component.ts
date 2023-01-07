import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {



  ngOnInit(): void {
    this.headers= {
      'target':'client',
      'action':'import',
      'validators':'client',
      'user_id':sessionStorage.getItem('userId')
    }
    console.log(this.router.url)
  }

  fileUpRes:any;
  showSuccessMsg = false;
  showErrorMsg = false;
  fileName = '';
  formData = new FormData();
  showUploadBtn = false
  filePath:any
  
  headers :any
  constructor(private http: HttpClient,private router: Router) {}

  onFileSelected(event:any):any {
    this.showSuccessMsg = false
    this.showErrorMsg = false
    
      const file:File = event.target.files[0];
      console.log(file)
      if (file) {

          this.fileName = file.name;
          console.log(this.fileName)
          //const formData = new FormData();

          this.formData.append("file", file);
          this.showUploadBtn = true;
          
      } 
  }

  doUploadAction(){
    const upload$ = this.http.post("http://backend.fatuora.com/api/uploadfile", this.formData, {headers: this.headers});

          upload$.subscribe(res =>{
            this.fileUpRes = res;
            if(this.fileUpRes.status == true){
                this.showSuccessMsg = true
                this.showErrorMsg = false
                if(this.router.url != '/salesInvoice'){
                  this.filePath =this.fileUpRes.file_paht
                  this.download(this.filePath)
                }
            }else if(this.fileUpRes.status == false){
                this.showErrorMsg = true
                this.showSuccessMsg = false
            }
          });

  }

  download(url:any) {
    const a = document.createElement('a')
    a.href = url
    a.download = url.split('/').pop()
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
}
