/*
 * Copyright (c) 2023 by MILOSZ GILGA <http://miloszgilga.pl>
 *
 * File name: commons.module.ts
 * Last modified: 23/05/2023, 09:31
 * Project name: stars-magnet-client
 *
 * Licensed under the MIT license; you may not use this file except in compliance with the License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * THE ABOVE COPYRIGHT NOTICE AND THIS PERMISSION NOTICE SHALL BE INCLUDED IN ALL COPIES OR
 * SUBSTANTIAL PORTIONS OF THE SOFTWARE.
 *
 * The software is provided "as is", without warranty of any kind, express or implied, including but not limited
 * to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event
 * shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an
 * action of contract, tort or otherwise, arising from, out of or in connection with the software or the use
 * or other dealings in the software.
 */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import * as NgbBts from "@ng-bootstrap/ng-bootstrap";

import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";

import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { PasswordTogglerComponent } from "./components/password-toggler/password-toggler.component";
import { DimissibleAlertComponent } from "./components/dimissible-alert/dimissible-alert.component";
import { LazyPageLoaderComponent } from "./components/lazy-page-loader/lazy-page-loader.component";

import { OnlyFirstPipe } from "./pipes/only-first/only-first.pipe";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

@NgModule({
    declarations: [
        // pages
        NotFoundPageComponent,
        // components
        HeaderComponent,
        FooterComponent,
        PasswordTogglerComponent,
        DimissibleAlertComponent,
        LazyPageLoaderComponent,
        // pipes
        OnlyFirstPipe,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterLink,
        HttpClientModule,
        RouterLinkActive,
        NgbBts.NgbAlert,
        NgbBts.NgbCollapse,
        NgbBts.NgbDropdown,
        NgbBts.NgbDropdownMenu,
        NgbBts.NgbDropdownToggle,
    ],
    exports: [
        FooterComponent,
        PasswordTogglerComponent,
        OnlyFirstPipe,
        DimissibleAlertComponent,
        HeaderComponent,
        LazyPageLoaderComponent,
    ],
})
export class CommonsModule {
}
