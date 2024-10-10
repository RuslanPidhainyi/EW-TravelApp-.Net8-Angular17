import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OffersListComponent } from './offers/offers-list/offers-list.component';
import { OffersDetailComponent } from './offers/offers-detail/offers-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { authGuard } from './_guards/auth.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            { path: '', component: LoginComponent },
            { path: 'offers', component: OffersListComponent },
            { path: 'offers/:id', component: OffersDetailComponent },
            { path: 'lists', component: ListsComponent },
            { path: 'messages', component: MessagesComponent },
            { path: '**', component: LoginComponent, pathMatch: 'full' },
        ],
    },
    { path: '**', component: LoginComponent, pathMatch: 'full', },
];
