# Angular ng2-select-list. Quick, simple and understandable

## Features
- [x] Custom binding to property
- [x] A bridge between the Angular forms API and a native element in the DOM
- [x] Multiselect checkbox using material theme
- [x] Flexible autocomplete 
- [x] Custom search

## Installation
#### Install ng2-select-list
```
  npm install --save ng-select-list
```
#### Import Ng2SelectListModule and FormsModule modules:
```javascript
  import { Ng2SelectListModule } from '@ng-select/ng-select';
  import { FormsModule } from '@angular/forms';
  
  @NgModule({
    declarations: [AppComponent],
    imports: [Ng2SelectListModule, FormsModule],
    bootstrap: [AppComponent]
  })
  export class AppModule {}
```

# API
### Inputs
| Input  | Type | Default | Description  
| ------------- | ------------- | ------------- | -------------  
| options  | Array<any>  | []  | Items array. 
| multiple  | Boolean  | false  | Allows to select multiple items. 
| placeholder  | String  | Choose item  | Placeholder text.
| disabled  | Boolean  | false | Allows select list disable. 
| isFilterOption  | boolean  | false | Allow to search for value.
| isAllSelect  | booelan  | false |  Allows all option checked.   
| filterPlaceholder  | String  | Search... | Search placeholder text.  
| noResultMessage  | String  | No result! | Set custom text if items array empty.

### Outputs
| Output  | Description  
| ------------- | -------------  
| selected  | It works when selected an item. It returns item's value.
| filterInputChanged  | It works when typed into search input. It returns user's search text as string.
| focus  | It works on select focus.
| blur  | It works on select blur.

#### Inspiration
This component is inspired by ng-select. Check their amazing work and components. :)
