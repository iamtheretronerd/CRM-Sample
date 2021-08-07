import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  Messages:any=[];
  constructor(private router:Router,private toastr:ToastrService,private httpClient:HttpClient,private _router:ActivatedRoute) { }
  logout():void{
    localStorage.removeItem('CRM-Customer');
    this.router.navigateByUrl('/login').then();
  }
  post():void{
    const headers={'content-type':'application/json'};
    const email=localStorage.getItem('CRM-Customer');
    const review=(<HTMLInputElement>document.getElementById('value')).value;
    console.log(review)
    const body={"email":email,"review":review};
    this.httpClient.post('/review',body,{'headers':headers})
    .subscribe(res=>{
      (<HTMLInputElement>document.getElementById('value')).value="1";
      this.toastr.success('Review Posted !' );
    })
  }
  ngOnInit(): void {
    const headers={'content-type':'application/json'};
    const email=localStorage.getItem('CRM-Customer');
    const body={"email":email};
    this.httpClient.post('/getMessages',body,{'headers':headers})
    .subscribe(res=>{
      this.Messages=res;
      console.log(res);
    })
  }
}
