import {
  AfterViewInit, ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input, OnChanges,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {BehaviorSubject, Subject} from 'rxjs';

@Component({
  selector: 'lib-ng2-select-list',
  templateUrl: 'ng2-select-list.component.html',
  styleUrls: ['./ng2-select-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Ng2SelectListComponent),
      multi: true
    }
  ],
})
export class Ng2SelectListComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges, ControlValueAccessor {
  public isDropDownOpen = false;
  @Input() options: any = [];
  optionSubject = new BehaviorSubject([]);
  @Input() placeholder: string;
  @Input() disabled: boolean;
  @Input() isFilterOption: boolean;
  @Input() isAllSelect: boolean;
  @Input() filterPlaceholder: string;
  @Input() noResultMessage: string;
  @Input() multiple: boolean;
  @Output() selected = new EventEmitter();
  @Output() filterInputChanged = new EventEmitter();
  @Output() focus = new EventEmitter();
  @Output() blur = new EventEmitter();
  public isAllChecked = false;
  public filterValue = '';
  public filteredOptions = [];
  public isChangeSelectListPlaceHolder = false;
  public selectedAccounts = [];
  private _value: Array<any> = [];
  public selectedOption = '';
  public allOption = {
    value: 'ALL',
    label: 'ALL'
  };
  onChange: any = () => {};
  onTouched: any = () => {};


  constructor() {

  }

  select(value: string | Array<string>) {
    this.writeValue(value);
  }

  writeValue(value) {
    this.value = value;
    this.onChange(this.value);
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  get value(): string | string[] {
    return this._value;
  }

  set value(v: string | string[]) {
    if (typeof v === 'undefined' || v === null || v === '') {
      v = [];
    }
    else if (typeof v === 'string') {
      v = [v];
    }
    else if (!Array.isArray(v)) {
      throw new TypeError('Value must be a string or an array.');
    }

    // this.optionList.value = v;
    this._value = v;
    // this.updateState();
  }

  ngOnInit(): void {
    this.optionSubject.subscribe(item => {
      this.filteredOptions = item;
    });
    this.isAllChecked = this.isAllSelect;
    this.filteredOptions = [...this.options];
    this.closeDropdown();
  }

  ngAfterViewInit(): void {
    if (this.disabled) {
      document.getElementById('multiple-select').classList.add('block-click-select');
      document.getElementById('multiple-select').classList.remove('let-click-select');
    } else {
      document.getElementById('multiple-select').classList.remove('block-click-select');
      document.getElementById('multiple-select').classList.add('let-click-select');
    }
  }

  ngOnChanges() {
    this.optionSubject.next(this.options);
    if (this.isAllSelect) {
      this.options.map(option => {
        option.checked = true;
      });
    } else {
      this.options.map(option => {
        option.checked = false;
      });
    }
  }

  openDropdown() {
    this.isDropDownOpen = true;
    this.focus.emit(true);
    this.blur.emit(false);
  }

  closeDropdown() {
    window.addEventListener('click', (e) => {
      this.isDropDownOpen = document.getElementById('multiple-select').contains(e.target as Node);
      if (!this.isDropDownOpen) {
        this.focus.emit(false);
        this.blur.emit(true);
      }
    });

  }

  filterOptions() {
    let updatedOptions = [...this.options];

    updatedOptions = this.options.filter(option => {
      return option.label.includes(this.filterValue);
    });

    this.filteredOptions = [...updatedOptions];

    this.filterInputChanged.emit(this.filterValue);
  }
  selectAccount(ev, account) {
    if (ev.target.checked) {
      this.selectedAccounts.push(account.value);
      account.checked = true;
    } else {
      this.selectedAccounts.splice(this.selectedAccounts.indexOf(account.value), 1);
      account.checked = false;
    }
    this.isAllChecked = this.options.every(option => {
      return option.checked;
    });

    this.isChangeSelectListPlaceHolder = this.options.some(option => {
      return option.checked;
    });

    this.checkedItemCount();
    this.writeValue(this.selectedAccounts);
    return this.selected.emit(this.selectedAccounts);
  }

  allChecked(ev) {
    if (ev.target.checked) {
      this.filteredOptions.map(option => {
        option.checked = true;
      });
      this.isAllChecked = true;
      // this.allSelected.emit('ALL');
      this.selected.emit('ALL');
    } else {
      this.filteredOptions.map(option => {
        option.checked = false;
      });
      this.isAllChecked = false;
      // this.allSelected.emit('');
      this.selected.emit([]);
    }
  }

  /*
  * it calculates count of checked items.
  * */
  checkedItemCount() {
    let count = 0;
    this.filteredOptions.map(option => {
      if (option.checked) {
        count++;
      }
    });
    return count;
  }


  /* NOT MULTIPLE */

  getOneClickedAccount(ev) {
    this.selectedOption = ev.label;
    this.isDropDownOpen = false;
    this.isChangeSelectListPlaceHolder = true;
    this.selected.emit([ev.value]);
    this.writeValue([ev.value]);
  }

  getOneClickedAll(ev) {
    this.selectedOption = ev;
    this.isDropDownOpen = false;
    this.isChangeSelectListPlaceHolder = true;
    this.selected.emit([ev]);
    this.writeValue([ev]);
  }

  ngOnDestroy(): void {
  }

}
