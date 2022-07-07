import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShopFormService } from 'src/app/services/shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardMonths: number[] = [];
  creditCardYears: number[] = [];

  constructor(private formBuilder: FormBuilder, private shopFormService: ShopFormService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    const startMonth: number = new Date().getMonth()+1;
    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved the credit card month" + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

    this.shopFormService.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved the credit card year" + JSON.stringify(data));
        this.creditCardYears = data;
      }
    );

    }



  copyShipToBill(event){
    if(event.target.checked){
      this.checkoutFormGroup.controls['billingAddress']
      .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    }else{

      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }

  onSubmit() {
    console.log(this.checkoutFormGroup.get("customer")!.value);
  }

  handleMonthsAndYears(){
    const creditCardFormGroup = this.checkoutFormGroup.get("creditCard")!;
    const currentYear = new Date().getFullYear();
    const selectedYear = Number(creditCardFormGroup.value.expirationYear);

    let startMonth: number;
    if(currentYear == selectedYear){
      startMonth = new Date().getMonth() + 1;
    }else{
      startMonth = 1;
    }
    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved the credit card month" + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

  }
}
