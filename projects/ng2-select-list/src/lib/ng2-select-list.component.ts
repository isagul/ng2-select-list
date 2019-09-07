import {
  AfterViewInit, ChangeDetectionStrategy,
  Component, ElementRef,
  EventEmitter,
  forwardRef, HostListener,
  Input, OnChanges,
  OnDestroy,
  OnInit,
  Output, ViewChild,
  SimpleChanges
} from '@angular/core';
import {ControlValueAccessor, FormGroupDirective, NG_VALUE_ACCESSOR} from '@angular/forms';
import {BehaviorSubject, fromEvent} from 'rxjs';
import {take} from 'rxjs/operators';

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
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Ng2SelectListComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges, ControlValueAccessor {
  @Input() options: any = [];
  @Input() placeholder: string;
  @Input() disabled: boolean;
  @Input() isFilterOption: boolean;
  @Input() filterPlaceholder: string;
  @Input() noResultMessage: string;
  @Input() multiple = false;
  @Input() crossButton = false;
  @Output() selected = new EventEmitter();
  @Output() deSelected = new EventEmitter();
  @Output() filterInputChanged = new EventEmitter();
  @Output() focus = new EventEmitter();
  @Output() blur = new EventEmitter();
  public filterValue = '';
  public filteredOptions = [];
  public isChangeSelectListPlaceHolder = false;
  public selectedAccounts = [];
  private values: Array<any> = [];
  public selectedOption: any;
  public isAllSelect: boolean;
  public isSelectedAnItem = true;
  optionSubject = new BehaviorSubject([]);
  public isDropDownOpen = false;
  @ViewChild('filterInput' , {static: false}) filterInput: ElementRef;
  public hasFocus = false;
  public clearClicked = false;
  public selectContainerClicked = false;
  public optionListClicked = false;
  public optionClicked = false;
  public allPlaceholder: string;
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
    return this.values;
  }

  set value(v) {
    this.values = v;
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

  onSelectContainerClick(event: any) {
    this.selectContainerClicked = true;
    if (!this.clearClicked) {
      this.toggleDropdown();
    }

    const x = fromEvent(document, 'click');
    if (this.isDropDownOpen) {
      x.pipe(take(1)).subscribe(() => {
        if (this.filterInput !== undefined) {
          this.filterInput.nativeElement.focus();
        }
      });
    }
  }

  ngOnInit(): void {
    this.optionSubject.subscribe(item => {
      this.filteredOptions = item;
    });
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

  ngOnChanges(changes: SimpleChanges) {
    this.handleInputChanges(changes);
    this.selectedAccounts = [];
    this.optionSubject.next(this.options);
    if (this.isAllSelect) {
      this.options.filter(opt => {
        return opt.value !== 'ALL';
      }).map(option => {
        option.checked = true;
        this.selectedAccounts.push(option.value);
      });
    } else {
      this.options.filter(opt => {
        return opt.value !== 'ALL';
      }).map(option => {
        option.checked = false;
      });
    }
  }

  private handleInputChanges(changes: SimpleChanges) {
    const optionsChanged: boolean = changes.hasOwnProperty('options');
    const noFilterChanged: boolean = changes.hasOwnProperty('noFilter');
    const placeholderChanged: boolean = changes.hasOwnProperty('placeholder');

    if (optionsChanged) {
      if (changes.options.currentValue.length > 0) {
        if (changes.options.currentValue[0].value === 'ALL') {
          this.isAllSelect = true;
          this.isChangeSelectListPlaceHolder = true;
          this.allPlaceholder = changes.options.currentValue[0].value;
        } else {
          this.isAllSelect = false;
        }
      }
    }
    if (optionsChanged || noFilterChanged) {
    }
    if (placeholderChanged) {
    }
  }

  public checkDropdownToggle(ev) {
    if (this.multiple) {
      ev.stopPropagation();
    }
  }


  public toggleDropdown() {
    if (!this.isDropDownOpen) {
      this.openDropdown();
    } else {
      this.closeDropdown();
    }
  }

  private openDropdown() {
    if (!this.isDropDownOpen) {
      this.isDropDownOpen = true;
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
    if (account.value === 'ALL') {
      this.allChecked(ev);
    } else {
      if (ev.checked) {
        this.selectedAccounts.push(account.value);
        account.checked = true;
      } else {
        this.selectedAccounts.splice(this.selectedAccounts.indexOf(account.value), 1);
        account.checked = false;
      }
      this.isAllSelect = this.options.filter(option => {
        return option.value !== 'ALL';
      }).every(value => {
        return value.checked;
      });

      this.isChangeSelectListPlaceHolder = this.options.some(option => {
        return option.checked;
      });
      // console.log(this.selectedAccounts);
      this.checkedItemCount();
      this.allPlaceholder = undefined;
      this.writeValue(this.selectedAccounts);
      return this.selected.emit(this.selectedAccounts);
    }
  }

  allChecked(ev) {
    this.selectedAccounts = [];
    if (ev.checked) {
      this.isAllSelect = true;
      this.filteredOptions.map(option => {
        option.checked = true;
      });
      this.filteredOptions.map(option => {
        if (option.value !== 'ALL') {
          this.selectedAccounts.push(option.value);
        }
      });
      this.writeValue(this.selectedAccounts);
      this.selected.emit(this.selectedAccounts);
    } else {
      this.isAllSelect = false;
      this.filteredOptions.map(option => {
        option.checked = false;
      });
      this.writeValue([]);
      this.selected.emit([]);
    }
    this.isChangeSelectListPlaceHolder = this.options.some(option => {
      return option.checked;
    });
    this.checkedItemCount();
  }

  /*
  * it calculates count of checked items.
  * */
  checkedItemCount() {
    let count = 0;
    this.filteredOptions.map(option => {
      if (option.value !== 'ALL' && option.checked) {
        count++;
      }
    });
    return count;
  }

  clickedInput(ev) {
    ev.stopPropagation();
  }


  /* NOT MULTIPLE */

  getOneClickedAccount(ev) {
    this.isDropDownOpen = false;
    this.isSelectedAnItem = true;
    this.selectedOption = ev;
    this.allPlaceholder = undefined;
    this.toggleDropdown();
    this.isChangeSelectListPlaceHolder = true;
    this.selected.emit(ev.value);
    this.writeValue(ev.value);
  }

  getOneClickedAll(ev) {
    this.selectedOption = ev;
    this.isSelectedAnItem = false;
    this.isChangeSelectListPlaceHolder = true;
    this.selected.emit(ev.value);
    this.writeValue(ev.value);
  }

  clearSelectedItem() {
    this.isChangeSelectListPlaceHolder = false;
    this.isSelectedAnItem = false;
    this.toggleDropdown();
    this.deSelected.emit('');
    this.writeValue('');
  }

  ngOnDestroy(): void {
  }
}
