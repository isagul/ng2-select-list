import {
  AfterViewInit,
  Component, ElementRef,
  EventEmitter,
  forwardRef, HostListener,
  Input, OnChanges,
  OnDestroy,
  OnInit,
  Output, QueryList, ViewChild, ViewChildren
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';

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
  @Input() options: any = [];
  @Input() placeholder = 'Choose item';
  @Input() disabled = false;
  @Input() isFilterOption = false;
  @Input() isAllSelect = false;
  @Input() filterPlaceholder = 'Search...';
  @Input() noResultMessage = 'No result!';
  @Input() multiple = false;
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
  public selectedOption: any;
  public allOption = {
    value: 'ALL',
    label: 'ALL'
  };
  public optionSubject = new BehaviorSubject([]);
  public isDropDownOpen = false;

  // @ViewChildren('filterInput') filterInput: QueryList<any>;
  hasFocus = false;
  private clearClicked = false;
  private selectContainerClicked = false;
  private optionListClicked = false;
  private optionClicked = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() {

  }

  select(value) {
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

  get value() {
    return this._value;
  }

  set value(v) {
    this._value = v;
  }

  @HostListener('window:click')
  onWindowClick() {
    if (!this.selectContainerClicked &&
      (!this.optionListClicked || (this.optionListClicked && this.optionClicked))) {
      this.closeDropdown();
      if (!this.optionClicked) {
        this._blur();
      }
    }
    this.clearClicked = false;
    this.selectContainerClicked = false;
    this.optionListClicked = false;
    this.optionClicked = false;
  }

  onSelectContainerClick(event) {
    this.selectContainerClicked = true;
    if (!this.clearClicked) {
      this.toggleDropdown();
    }
  }

  ngOnInit(): void {
    this.optionSubject.subscribe(item => {
      this.filteredOptions = item;
    });
    this.isAllChecked = this.isAllSelect;
    this.filteredOptions = [...this.options];
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
    this.selectedAccounts = [];
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
    /*if (this.isDropDownOpen) {
      this.filterInput.changes.subscribe(res => {
        console.log(res.first.nativeElement);
      });
    }*/
  }

  private toggleDropdown() {
    /*console.log('isDropDownOpen', this.isDropDownOpen);
    console.log('multiple', this.multiple);*/
    if (this.multiple) {
      this.isDropDownOpen = true;
    } else {
      if (!this.isDropDownOpen) {
        this.openDropdown();
      } else {
        this.closeDropdown();
      }
    }
    // console.log('isDropDownOpen', this.isDropDownOpen);
  }

  private openDropdown() {
    if (!this.isDropDownOpen) {
      this.isDropDownOpen = true;
      /*setTimeout(() => {
          if (this.multiple) {
              this.filterInput.nativeElement.focus();
          }
      });*/
    }
  }

  private closeDropdown() {
    if (this.isDropDownOpen) {
      this.isDropDownOpen = false;
    }
  }

  _blur() {
    if (this.hasFocus) {
      this.hasFocus = false;
      this.onTouched();
      this.blur.emit(null);
    }
  }

  _focus() {
    if (!this.hasFocus) {
      this.hasFocus = true;
      this.focus.emit(null);
    }
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
    this.isDropDownOpen = true;
    if (ev.checked) {
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
    if (ev.checked) {
      this.filteredOptions.map(option => {
        option.checked = true;
      });
      this.isAllChecked = true;
      this.writeValue('ALL');
      this.selected.emit('ALL');
    } else {
      this.selectedAccounts = [];
      this.filteredOptions.map(option => {
        option.checked = false;
      });
      this.isAllChecked = false;
      this.writeValue([]);
      this.selected.emit([]);
    }
    this.isChangeSelectListPlaceHolder = this.options.some(option => {
      return option.checked;
    });
  }

  clickedInput(ev) {
    ev.stopPropagation();
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
    this.selectedOption = ev;
    this.isChangeSelectListPlaceHolder = true;
    this.selected.emit(ev.value);
    this.writeValue(ev.value);
  }

  getOneClickedAll(ev) {
    this.selectedOption = ev;
    this.isChangeSelectListPlaceHolder = true;
    this.selected.emit(ev.value);
    this.writeValue(ev.value);
  }

  ngOnDestroy(): void {
  }

}
