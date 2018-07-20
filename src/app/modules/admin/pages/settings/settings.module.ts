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
         { path: 'colors', component: ColorTablePage, data: { pLevel: 2 }, resolve: { colors: ColorsResolver } },
         { path: 'color/add', component: ColorFormPage, data: { pLevel: 3 } },
         { path: 'color/edit/:id', component: ColorFormPage, data: { pLevel: 3 }, resolve: { color: ColorResolver } },
         { path: 'sizes', component: SizeTablePage, data: { pLevel: 2 }, resolve: { sizes: SizesResolver } },
         { path: 'size/add', component: SizeFormPage, data: { pLevel: 3 } },
         { path: 'size/edit/:id', component: SizeFormPage, data: { pLevel: 3 }, resolve: { size: SizeResolver } },
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