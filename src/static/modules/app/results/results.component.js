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

            const value = this.doc[key];

            if (typeof value == 'object') {
                const previewKey = Object.keys(value);
                this.preview += `{ ${ previewKey[0] }: ${ value[previewKey[0]] }`;

                if (previewKey.length > 1) {
                    this.preview += ', ...'
                }

                this.preview += ' }, ';
        }
            else {
                this.preview += `${ value }, `;
            }
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

@Component({
    selector: 'preview-display',
    templateUrl: 'static/templates/preview-display.html'
})
export class PreviewDisplayComponent {
    @Input('preview') preview;

    static PREVIEW_CLASSES = {
        'string': 'preview-string',
        'number': 'preview-number',
        'boolean': 'preview-boolean',
        'array': 'preview-array',
        'object': 'preview-object'
    };

    constructor () {}

    ngOnInit () {
        const isArray = this.preview instanceof Array;
        this.isArray = isArray;

        if (isArray) {
            this.list = this.preview;
        }
        else {
            this.list = Object.keys(this.preview);
        }
    }

    typeClass (item, isLast) {
        let type = typeof item;
        type = (type === 'object' && type instanceof Array) ? 'array' : type;

        const classes = [PreviewDisplayComponent.PREVIEW_CLASSES[type]];

        if (!isLast) classes.push('addComma');
        if (isLast && (this.preview.length && this.preview.length > 3)) classes.push('addEllipsis');

        return classes;
    }
}


// TODO: make separate classes for preview-array and preview-object

// TODO: make separate classes for display-array and display-object and display-primitive