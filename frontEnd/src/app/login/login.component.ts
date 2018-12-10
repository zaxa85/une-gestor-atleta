import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VERSION } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService, AuthenticationService, UserService } from '../_services/index';
import { User } from '../_models';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],

})

export class LoginComponent implements OnInit {
    loading = false;
    returnUrl: string;
    title = 'UNE Sistema de Gestión de Atletas';
    version = VERSION;
    form: FormGroup;
    private formSubmitAttempt: boolean;
    users: User[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private userService: UserService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        this.form = this.fb.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    isFieldInvalid(field: string) { // {6}
        return (
            (!this.form.get(field).valid && this.form.get(field).touched) ||
            (this.form.get(field).untouched && this.formSubmitAttempt)
        );
    }

    login() {

        this.loading = true;

        if (this.form.valid) {

            this.authenticationService.login(this.form.value["userName"], this.form.value["password"])
                .subscribe(
                    data => {
                        this.router.navigate([this.returnUrl]);
                    },
                    error => {
                        this.alertService.error(error.message);
                        this.loading = false;
                    });

            this.formSubmitAttempt = true;
        }
    }
}
