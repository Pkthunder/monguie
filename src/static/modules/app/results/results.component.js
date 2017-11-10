import { Component, Input, Inject } from 'angular-core';

@Component({
    selector: 'result',
    templateUrl: 'static/templates/results.html'
})
export class ResultsComponent {
    @Input('doc') doc;
    expand = false;

    constructor () {}

    ngOnInit () {
        console.log(this.doc);

        this.display = `{ _id: ${ this.doc._id }, ... }`;
        this.keys = Object.keys(this.doc);
    }
}