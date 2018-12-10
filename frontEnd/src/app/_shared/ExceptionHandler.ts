import { ErrorHandler, Inject } from '@angular/core';
import { AlertComponent } from '../_directives';


export class CustomErrorHandler implements ErrorHandler {

    constructor() {
    }

    handleError(error: any): void {
        this.showErrorInConsole(error);

    }

    private showErrorInConsole(error: any) :void {
        if (console && console.group && console.error) {
            console.group("Error Log");
            console.error(error);
            console.error(error.message);
            console.error(error.stack);
            console.groupEnd();
        }
    }
}