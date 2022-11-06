import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { StudentModel } from './studentdashboard.model';


@Component({
  selector: 'app-studentdashboard',
  templateUrl: './studentdashboard.component.html',
  styleUrls: ['./studentdashboard.component.css']
})
export class StudentdashboardComponent implements OnInit {


  formvalue!: FormGroup;
  studentModelObj :StudentModel= new StudentModel();
  submitted:boolean=false;
  studentData!:any;
  showAdd :boolean =false;
  showupdate:boolean=false;
  

  constructor( private formbuilder:FormBuilder, 
    private api :ApiService){

    }

  ngOnInit(): void {
    this.formvalue= this.formbuilder.group({
      studentID: [''],
      firstname: ['',Validators.required], 
      lastname: ['',Validators.required], 
      email: ['',[Validators.required, Validators.email]], 
      mobile: ['',[Validators.required,Validators.minLength(10)]], 
      dob: ['',[Validators.required,Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]], 
    });

    this. getAllStudent();
  }

  
  

  clickAddStudent(){
    this.formvalue.reset();
    this.showAdd=true;
    this.showupdate=false;

  }

  postStudentDetails(){ 
    this.studentModelObj.firstname=this.formvalue.value.firstname;
    this.studentModelObj.lastname=this.formvalue.value.lastname;
    this.studentModelObj.email=this.formvalue.value.email;
    this.studentModelObj.mobile=this.formvalue.value.mobile;
    this.studentModelObj.dob=this.formvalue.value.dob;


    this.api.postStudent(this.studentModelObj)
    .subscribe((res:any)=>{
      console.log(res);
      alert('Student Details Added Successfully')
      let ref= document.getElementById('cancel')
      ref?.click();
      this.formvalue.reset();
      this. getAllStudent();

      
    })
    
  }

  // onAdd(){
  //   this.showAdd = true

  //   if(this.formvalue.invalid){
  //     return
  //   }

  //   alert("Success")
  // }

  getAllStudent(){
    this.api.getStudent()
    .subscribe((res: any)=>{
      this.studentData=res;
      
    })
  }
  
  deleteStudent(row:any){
    this.api.deleteStudent(row.id)
    .subscribe((res: any)=>{
      console.log(res);
      alert("Student Deleted");
      this.getAllStudent();
    })

  }
  onEdit(row:any){
    this.showAdd=false;
    this.showupdate=true;
    this.studentModelObj.id=row.id;
    this.formvalue.controls['firstname'].setValue(row.firstname);
    this.formvalue.controls['lastname'].setValue(row.lastname);
    this.formvalue.controls['email'].setValue(row.email);
    this.formvalue.controls['mobile'].setValue(row.mobile);
    this.formvalue.controls['dob'].setValue(row.dob)
  }
  updateStudentDetails(){
    this.studentModelObj.firstname=this.formvalue.value.firstname;
    this.studentModelObj.lastname=this.formvalue.value.lastname;
    this.studentModelObj.email=this.formvalue.value.email;
    this.studentModelObj.mobile=this.formvalue.value.mobile;
    this.studentModelObj.dob=this.formvalue.value.dob;

    this.api.updateStudent(this.studentModelObj,this.studentModelObj.id)
    .subscribe((res:any)=>{
      console.log(res);
      alert('Student Details updated Successfully')
      let ref= document.getElementById('cancel')
      ref?.click();
      this.formvalue.reset();
      this. getAllStudent();
    })
  }

  // onUpdate(){
  //   this.showupdate = true

  //   if(this.formvalue.invalid){
  //     return
  //   }

  //   alert("Success")
  // }
  
  
  // onSubmit(){
   
  //   this.submitted = true;

  //   if(this.formvalue.invalid){
  //     return
  //   }

  //   alert("Success")
  // }

  // }



}