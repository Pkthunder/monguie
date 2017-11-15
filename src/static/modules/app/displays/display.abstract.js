import { Input } from 'angular-core';

export class DisplayComponent {
    @Input('doc') doc;

    constructor () {}
}