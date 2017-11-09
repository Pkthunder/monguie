// angular dependencies
import 'reflect-metadata';
import 'zone.js';
import 'rxjs';

// angular modules
import { platformBrowserDynamic } from 'angular-platform-browser-dynamic';
import { Component, NgModule, Inject } from 'angular-core';
import { HttpModule } from 'angular-http';
import { FormsModule } from 'angular-forms';
import { BrowserModule } from 'angular-platform-browser';

/**
 * All code below is boilerplate Angular++ code
 *
 * It creates the "main" Component and Angular Module, as well as bootstraps the application
 */
// taken from docs (based on app.component.ts)
@Component({
    selector: 'app',
    templateUrl: 'static/templates/app.html'
})
export class AppComponent {

    counter = 0;
    name = 'Agent: Codename Duchess';

    constructor () {}

    ngOnInit () {}
}

// Example of injecting a service
// AppComponent.parameters = [
//     [ new Inject('ShareDBService') ]
// ];

// taken from docs (based on app.module.ts)
@NgModule({
    imports:        [ BrowserModule, HttpModule, FormsModule ],
    declarations:   [ AppComponent ],
    bootstrap:      [ AppComponent ],
    providers:      [  ]
})
export class AppModule {}

// taken from docs (based on main.ts)
platformBrowserDynamic().bootstrapModule(AppModule);