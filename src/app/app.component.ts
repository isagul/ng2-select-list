import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  formElements: FormGroup; // form elements.
  title = 'ng-select-list';
  public accountList = [
    {value: 100, label: 'test100', checked: false},
    {value: 200, label: 'test200', checked: false},
    {value: 300, label: 'test300', checked: false},
    {value: 400, label: 'test400', checked: false},
    {value: 500, label: 'test500', checked: false},
    {value: 600, label: 'test600', checked: false},
    {value: 700, label: 'test700', checked: false},
    {value: 800, label: 'test800', checked: false},
    {value: 900, label: 'test900', checked: false},
  ];

  public siteList = [
    {value: 100, label: 'test100', checked: false},
    {value: 200, label: 'test200', checked: false},
    {value: 300, label: 'test300', checked: false},
    {value: 400, label: 'test400', checked: false},
    {value: 500, label: 'test500', checked: false},
    {value: 600, label: 'test600', checked: false},
    {value: 700, label: 'test700', checked: false},
    {value: 800, label: 'test800', checked: false},
    {value: 900, label: 'test900', checked: false},
  ];

  constructor(
    private frmBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formElements = this.frmBuilder.group({
      account: ['', [Validators.required]],
      site: ['', [Validators.required]],
    });
  }

  getClickedAccount() {
    console.log('form elements account => ', this.formElements.get('account').value);
  }

  getClickedSite() {
    console.log('form elements site => ', this.formElements.get('site').value);
  }
}
