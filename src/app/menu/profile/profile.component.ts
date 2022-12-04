import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { customerStore } from 'src/app/customer.repository';
import { Customer, CustomerDTO } from 'src/app/login/account.model';
import { CustomerService } from 'src/service/customer.service';
import { InfoService } from 'src/service/infoCustomer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  formProfile!: FormGroup;
  customer: CustomerDTO = {};
  subCustomer!: Subscription;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    readonly router: Router,
    private toastr: ToastrService,
    private infoService: InfoService
  ) {}

  ngOnDestroy() {
    this.subCustomer.unsubscribe();
  }

  ngOnInit() {
    this.initForm();
    this.subCustomer = customerStore.subscribe((res: any) => {
      if (res.customer) {
        this.customer = res.customer as CustomerDTO;
        console.log(this.customer);

        this.fillValueForm();
      }
    });
  }

  initForm() {
    this.formProfile = this.fb.group({
      customerName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      image: ['', [Validators.required]],
      email: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      customerType: ['', [Validators.required]],
      citizenIdentifyCart: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }

  saveCustomer(customer: Customer) {
    this.customerService.addCustomer(customer).subscribe();
  }

  fillValueForm() {
    let bd;
    if (this.customer.birthday) bd = this.formatDate(this.customer.birthday);
    else bd = null;
    console.log(bd);
    this.formProfile.patchValue({
      id: this.customer.id,
      customerName: this.customer.customerName,
      phoneNumber: this.customer.phoneNumber,
      birthday: bd,
      gender: this.customer.gender,
      email: this.customer.email,
      customerType: this.customer.customerType,
      citizenIdentifyCart: this.customer.citizenIdentifyCart,
      status: this.customer.status,
    });
    console.log(this.customer.id);
  }

  update() {
    this.addValueCustomer();
    console.log(this.addValueCustomer());
    this.customerService.updateCustomer(this.customer).subscribe((res) => {
      this.toastr.success('Cập nhật thông tin thành công!');
      this.router.navigate(['/home']).then((r) => console.log(r));
    });
  }

  addValueCustomer() {
    console.log(this.formProfile.value);
    this.customer.customerName = this.formProfile.value.customerName;
    this.customer.phoneNumber = this.formProfile.value.phoneNumber;
    this.customer.birthday = this.formProfile.value.birthday;
    this.customer.gender = this.formProfile.value.gender;
    this.customer.email = this.formProfile.value.email;
    this.customer.customerType = this.formProfile.value.customerType;
    this.customer.citizenIdentifyCart =
      this.formProfile.value.citizenIdentifyCart;
    this.customer.status = this.formProfile.value.status;
  }

  formatDate(date: Date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}
