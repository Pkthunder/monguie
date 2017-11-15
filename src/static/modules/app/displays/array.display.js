import { Component, Input } from 'angular-core';
import { DisplayComponent } from './display.abstract';

@Component({
    selector:'array-display',
    template:
``,
    styleUrls: ''
})
export class ArrayDisplayComponent extends DisplayComponent {
    @Input('subdoc') subdoc;

    constructor () {}

    ngOnInit () {

    }
}