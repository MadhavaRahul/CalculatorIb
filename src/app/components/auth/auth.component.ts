import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthSvcService } from '../../service/auth-svc.service';
import { passwordStrengthValidator } from '../../shared/Validators/passwordStrength.validator';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  islog:boolean=true
  Reg!: FormGroup
  Log!: FormGroup
  constructor(private fb: FormBuilder, private authSvc:AuthSvcService, private router:Router){}
  ngOnInit(){
    this.Reg=this.fb.group({
      first: ['',[Validators.required, Validators.minLength(3)]],
      last: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, passwordStrengthValidator]],
    })
    this.Log=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
  }
  onRegister(){
    if(this.Reg.invalid){
      return
    }
    const success=this.authSvc.register(this.Reg.value)
    if(success){
       alert('Register Successfully!')
       this.Reg.reset();
       this.islog=true;
    }
    else{
      alert('User already exists');
    }
    // console.log(this.Reg.value)
    // alert("save successfully")
    // debugger
    // const isData=localStorage.getItem("IbAuth");
    // if(isData != null){
    //   const Arraylocal=JSON.parse(isData)
    //   Arraylocal.push(this.Reg.value)
    //   localStorage.setItem("IbAuth",JSON.stringify(Arraylocal))
    // }
    // else{
    //   const Arraylocal=[]
    //   Arraylocal.push(this.Reg.value)
    //   localStorage.setItem("IbAuth",JSON.stringify(Arraylocal))
    // }
    // alert('Register Successfully!')
    // this.Reg.reset();
  }
  onLogin(){
    if(this.Log.invalid){
      return;
    }
    const {email,password}=this.Log.value
    const success=this.authSvc.login(email,password)
    if(success){
      this.router.navigateByUrl('/nav')
    }
    else{
      alert('Invalid credentials')
    }
  }
}
