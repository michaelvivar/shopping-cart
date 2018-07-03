import { State, StateContext, Action } from "@ngxs/store";
import { AppUser, RemoveAppUser } from "~/store/actions/app.actions";

interface AppStateModel {
   user: any;
}

@State<AppStateModel>({
   name: 'app',
   defaults: {
      user: null
   }
})
export class AppState {
   @Action(AppUser)
   appUser(context: StateContext<AppStateModel>, { payload }: AppUser) {
      context.patchState({ user: payload });
   }

   @Action(RemoveAppUser)
   removeAppUser(context: StateContext<AppStateModel>) {
      context.patchState({ user: null });
   }
}