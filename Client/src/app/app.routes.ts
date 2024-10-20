import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OffersListComponent } from './offers/offers-list/offers-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { authGuard } from './_guards/auth.guard';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { OfferDetailComponent } from './offers/offer-detail/offer-detail.component';
import { MemberDetailComponent } from './member/member-detail/member-detail.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            { path: '', component: LoginComponent },
            { path: 'offers', component: OffersListComponent },
            { path: 'offers/:id', component: OfferDetailComponent },
            { path: 'member/:username', component: MemberDetailComponent },
            { path: 'lists', component: ListsComponent },
            { path: 'messages', component: MessagesComponent },
        ],
    },
    { path: 'errors', component: TestErrorsComponent },
    { path: 'not-found', component: NotFoundComponent },
    { path: 'server-error', component: ServerErrorComponent },
    { path: '**', component: NotFoundComponent, pathMatch: 'full', },
];