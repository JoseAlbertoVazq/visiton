import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, SocialLoginModule } from 'angular-6-social-login';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { QuillModule } from 'ngx-quill';

import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogBadgeComponent } from './dialogs/dialog-badge/dialog-badge.component';
import { DialogCreateUserComponent } from './dialogs/dialog-create-user/dialog-create-user.component';
import { DialogDeleteBadgeComponent } from './dialogs/dialog-delete-badge/dialog-delete-badge.component';
import { DialogDeleteCategoryComponent } from './dialogs/dialog-delete-category/dialog-delete-category.component';
import { DialogDeleteRouteComponent } from './dialogs/dialog-delete-route/dialog-delete-route.component';
import { DialogDeleteUserComponent } from './dialogs/dialog-delete-user/dialog-delete-user.component';
import { DialogEditCategoryComponent } from './dialogs/dialog-edit-category/dialog-edit-category.component';
import { DialogEditUserComponent } from './dialogs/dialog-edit-user/dialog-edit-user.component';
import { DialogNewCategoryComponent } from './dialogs/dialog-new-category/dialog-new-category.component';
import { DialogPoiCreateComponent } from './dialogs/dialog-poi-create/dialog-poi-create.component';
import { DialogPoiDeleteComponent } from './dialogs/dialog-poi-delete/dialog-poi-delete.component';
import { DialogPoiEditComponent } from './dialogs/dialog-poi-edit/dialog-poi-edit.component';
import { DialogRouteComponent } from './dialogs/dialog-route/dialog-route.component';
import { DialogUpdateProfileComponent } from './dialogs/dialog-update-profile/dialog-update-profile.component';
import { MaterialModule } from './material-module';

// Configs
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('Your-Facebook-app-id')
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('Your-Google-Client-Id')
        }
      ]
  );
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    DialogPoiCreateComponent,
    DialogPoiDeleteComponent,
    DialogPoiEditComponent,
    DialogNewCategoryComponent,
    DialogEditCategoryComponent,
    DialogDeleteCategoryComponent,
    DialogUpdateProfileComponent,
    DialogDeleteUserComponent,
    DialogCreateUserComponent,
    DialogEditUserComponent,
    DialogBadgeComponent,
    DialogDeleteBadgeComponent,
    DialogRouteComponent,
    DialogDeleteRouteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    SocialLoginModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA-JcBiiDwRaudqbUlqAC4c-Ehn4uPCsqY'
    }),
    QuillModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyC9iLIAKYPgmNojVVXXHCP1nRt_lAMkxOQ',
      authDomain: 'entreapp-erasmus.firebaseapp.com',
      storageBucket: 'entreapp-erasmus.appspot.com'
    }),
    AngularFireStorageModule
  ],
  entryComponents: [
    DialogNewCategoryComponent,
    DialogEditCategoryComponent,
    DialogDeleteCategoryComponent,
    DialogDeleteUserComponent,
    DialogCreateUserComponent,
    DialogEditUserComponent,
    DialogPoiCreateComponent,
    DialogPoiDeleteComponent,
    DialogPoiEditComponent,
    DialogBadgeComponent,
    DialogDeleteBadgeComponent,
    DialogRouteComponent,
    DialogDeleteRouteComponent,
    DialogUpdateProfileComponent
  ],
  providers: [ {provide: MAT_DIALOG_DATA, useValue: {}}, {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},    {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
