##Features
- [x] Custom binding to property or object
- [x] Custom option, label, header and footer templates
- [x] Multiselect
- [x] Flexible autocomplete 
- [x] Custom search

##Installation
####Install ng2-select-list
```
  npm install --save ng-select-list
```
####Import Ng2SelectListModule and FormsModule modules:
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

#API
#####Inputs
| Input  | Type | Default | Required | Description
| ------------- | ------------- | ------------- | ------------- | -------------
| options  | Content Cell  | Content Cell | Content Cell | Content Cell 
| multiple  | Content Cell  | Content Cell | Content Cell | Content Cell 
| placeholder  | Content Cell  | Content Cell | Content Cell | Content Cell 
| disabled  | Content Cell  | Content Cell | Content Cell | Content Cell 
| isFilterOption  | Content Cell  | Content Cell | Content Cell | Content Cell 
| isAllSelect  | Content Cell  | Content Cell | Content Cell | Content Cell 
| filterPlaceholder  | Content Cell  | Content Cell | Content Cell | Content Cell 
| noResultMessage  | Content Cell  | Content Cell | Content Cell | Content Cell 

#####Outputs
| Output  | Type | Default | Required | Description
| ------------- | ------------- | ------------- | ------------- | -------------
| selected  | Content Cell  | Content Cell | Content Cell | Content Cell 
| filterInputChanged  | Content Cell  | Content Cell | Content Cell | Content Cell 
| focus  | Content Cell  | Content Cell | Content Cell | Content Cell 
| blur  | Content Cell  | Content Cell | Content Cell | Content Cell 

####Inspiration
This component is inspired by ng-select. Check their amazing work and components :)
# NgSelectList

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
