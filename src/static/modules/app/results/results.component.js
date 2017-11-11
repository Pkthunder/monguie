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
        const isArray = this.doc instanceof Array;

        this.keys = Object.keys(this.doc);
        this.preview = '';
        this.isArray = isArray;

        this.keys.slice(0, 3).map(key => {
            if (!isArray) {
                this.preview += `${ key }:  `
            }

            this.preview += `${ this.doc[key] }, `;
        });
    }
}

@Component({
    selector: 'result-value',
    templateUrl: 'static/templates/result-value.html'
})
export class ResultValueComponent {
    @Input('result') result;

    constructor () {}

    ngOnInit () {
        let type = typeof this.result;
        this.type = (type === 'object' && this.result instanceof Array) ? 'array' : type;
        this.classes = {
            'result-string': this.type == 'string',
            'result-number': this.type == 'number',
            'result-boolean': this.type == 'boolean',
            'result-array': this.type == 'array',
            'result-object': this.type == 'object'
        };
    }
}