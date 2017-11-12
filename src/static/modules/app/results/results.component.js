import { Component, Input, Inject } from 'angular-core';

@Component({
    selector: 'result',
    templateUrl: 'static/templates/results.html'
})
export class ResultComponent {
    @Input('doc') doc;
    expand = false;
    preview = '';

    constructor () {}

    ngOnInit () {
        const isArray = this.doc instanceof Array;
        this.keys = Object.keys(this.doc);
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
    selector: '[attr-display]',
    templateUrl: 'static/templates/attr-display.html'
})
export class AttrDisplayComponent {
    @Input('key') key;
    @Input('result') result;
    hovered = false; // TODO: use this for mouseover effects

    static RESULT_CLASSES = {
        'string': 'result-string',
        'number': 'result-number',
        'boolean': 'result-boolean',
        'array': 'result-array',
        'object': 'result-object'
    };

    constructor () {}

    ngOnInit () {
        let type = typeof this.result;
        this.type = (type === 'object' && this.result instanceof Array) ? 'array' : type;

       this.resultClass = AttrDisplayComponent.RESULT_CLASSES[this.type];
    }
}