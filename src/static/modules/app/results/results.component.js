import { Component, Input, Inject } from 'angular-core';

@Component({
    selector: 'result',
    templateUrl: 'static/templates/results.html'
})
export class ResultComponent {
    @Input('doc') doc;
    expand = false;

    constructor () {}

    ngOnInit () {
        console.log(this.doc);

        this.display = `{ _id: ${ this.doc._id }, ... }`;
        this.keys = Object.keys(this.doc);
    }
}

@Component({
    selector: 'result-value',
    //templateUrl: 'static/templates/results-value.html'
    template: `<span class="result-value" [ngClass]="classes">{{ result }}</span>`
})
export class ResultValueComponent {
    @Input('result') result;

    constructor () {}

    ngOnInit () {
        this.type = typeof this.result;
        this.classes = {
            'result-string': this.type == 'string',
            'result-number': this.type == 'number',
            'result-boolean': this.type == 'boolean'
            //, 'result-string': 'type'
        };
    }
}