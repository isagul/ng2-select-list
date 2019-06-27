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
    {value: 1, label: 'tom100', checked: false},
    {value: 2, label: 'tom200', checked: false},
    {value: 3, label: 'tom300', checked: false},
    {value: 4, label: 'tom400', checked: false},
    {value: 5, label: 'tom500', checked: false},
    {value: 6, label: 'tom600', checked: false},
    {value: 7, label: 'tom700', checked: false},
    {value: 8, label: 'tom800', checked: false},
    {value: 9, label: 'tom900', checked: false},
  ];

  constructor(private frmBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formElements = this.frmBuilder.group({
      account: ['', [Validators.required]],
      site: ['', [Validators.required]],
    });
  }

  getClickedAccount(ev) {
    console.log(ev);
    console.log('form elements', this.formElements.get('account').value);
  }
}
