import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../Services/students.service';
import { Student } from "../Models/student";

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {

  constructor(private _studentService: StudentsService) { }

  students: Student[] = [];

  ngOnInit() {
    this._studentService.getStudents().subscribe(response => {
      var result = response.split("\n");
      for (let index = 0; index < result.length; index++) {
        this.students.push(this.parseStudents(result[index].split(',')));
      }
    }, error => {
      console.log("Error", error);
    });;
  }

  parseStudents(info: string[]) {
    let student: Student = new Student();
    student.type = info[0];
    student.name = info[1];
    student.gender = this.parseGender(info[2]);
    student.timeStamp = this.parseDate(info[3]);
    return student;
  }

  parseDate(date:string){
    var year = parseInt(date.substring(0,4));
    var month = parseInt(date.substring(4,6));
    var day = parseInt(date.substring(6,8));
    var hour = parseInt(date.substring(8,10));
    var minute = parseInt(date.substring(10,12));
    var second = parseInt(date.substring(12,14));
    var rdate = new Date(year,month,day,hour,minute,second);
    return rdate;
  }

  parseGender(gender:string){
    var completegender="Male";
    if(gender==="F"){
      completegender = "Female";
    }
    return completegender;
  }

}
