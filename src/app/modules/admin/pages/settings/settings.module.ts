import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~/shared';
import { MainPage } from './pages/main/main-page.component';
import { ColorTablePage } from './pages/color-table/color-table.component';
import { ColorsResolver, ColorResolver, SizesResolver, SizeResolver } from '~/services/resolvers/settings.resolver';
import { ColorFormPage } from './pages/color-form/color-form.component';
import { SizeTablePage } from './pages/size-table/size-table.component';
import { SizeFormPage } from './pages/size-form/size-form.component';

@NgModule({
   imports: [
      SharedModule,
      RouterModule.forChild([
         { path: '', component: MainPage },
         { path: 'colors', component: ColorTablePage, resolve: { colors: ColorsResolver } },
         { path: 'color/add', component: ColorFormPage },
         { path: 'color/edit/:id', component: ColorFormPage, resolve: { color: ColorResolver } },
         { path: 'sizes', component: SizeTablePage, resolve: { sizes: SizesResolver } },
         { path: 'size/add', component: SizeFormPage },
         { path: 'size/edit/:id', component: SizeFormPage, resolve: { size: SizeResolver } },
      ])
   ],
   declarations: [
      MainPage,
      ColorTablePage,
      ColorFormPage,
      SizeTablePage,
      SizeFormPage
   ]
})
export class SettingsModule {

}