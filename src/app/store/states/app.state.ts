import { State, Action, StateContext } from '@ngxs/store';
import { SetAppUser, RemoveAppUser } from '~store/actions/app.actions';

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
   @Action(SetAppUser)
   setAppUser(context: StateContext<AppStateModel>, { payload }: SetAppUser) {
      context.patchState({ user: payload });
   }

   @Action(RemoveAppUser)
   removeAppUser(context: StateContext<AppStateModel>) {
      context.patchState({ user: null });
   }
}