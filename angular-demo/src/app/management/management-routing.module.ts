import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {BasePageComponent} from "./components/base-page/base-page.component";
import {LoginGuard} from "../account/component/login/utils/login-guard";

const routes: Routes = [
  {path:"management",
    component:BasePageComponent,
    children:[
      {path:"home",
        loadChildren: () => import('../homePage/home.module').then(m => m.HomeModule)
      },
      {path:"users",
        loadChildren: () => import('../user/user.module').then(m => m.UserModule)
      },
      {path:"campaigns",
        loadChildren: () => import('../campaigns/campaigns.module').then(m => m.CampaignsModule)
      },
      {path:"donators",
        loadChildren: () => import('../donator/donator.module').then(m => m.DonatorModule)
      },
    ],
    canActivate:[LoginGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})

export class ManagementRoutingModule { }
