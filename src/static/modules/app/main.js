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

// custom modules
import { ApiServiceProvider } from 'Api';
import { ResultComponent, ResultValueComponent } from 'Results';

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

    name = 'Agent: Codename Duchess';
    results = [];

    constructor (http) {
        this.http = http;
    }

    ngOnInit () {
        this.http.getData().then( data => this.results = data);
    }
}
AppComponent.parameters = [
    [ new Inject('ApiService') ]
];

// Example of injecting a service
// AppComponent.parameters = [
//     [ new Inject('ShareDBService') ]
// ];

// taken from docs (based on app.module.ts)
@NgModule({
    imports:        [ BrowserModule, HttpModule, FormsModule ],
    declarations:   [ AppComponent, ResultComponent, ResultValueComponent ],
    bootstrap:      [ AppComponent ],
    providers:      [ ApiServiceProvider ]
})
export class AppModule {}

// taken from docs (based on main.ts)
platformBrowserDynamic().bootstrapModule(AppModule);