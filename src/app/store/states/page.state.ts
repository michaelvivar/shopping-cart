import { State, Action, StateContext } from '@ngxs/store';
import { PageTitle, BackButton, AddButton, ResetButtons } from '~/store/actions/page.actions';

interface PageStateModel {
   title?: string;
   buttons: {
      back?: { icon?: string, link: string },
      add?: { icon?: string, link: string }
   }
}

@State<PageStateModel>({
   name: 'page',
   defaults: {
      buttons: {}
   }
})
export class PageState {

   @Action(PageTitle)
   setPageTitle(context: StateContext<PageStateModel>, { payload }: PageTitle) {
      context.patchState({ title: payload });
   }

   @Action(BackButton)
   setBackButton(context: StateContext<PageStateModel>, { payload }: BackButton) {
      const state = context.getState();
      state.buttons.back = payload;
      if (!payload.icon) {
         state.buttons.back.icon = 'chevron_left';
      }
      context.setState(state);
   }

   @Action(AddButton)
   setAddButton(context: StateContext<PageStateModel>, { payload }: AddButton) {
      const state = context.getState();
      state.buttons.add = payload;
      if (!payload.icon) {
         state.buttons.add.icon = 'add';
      }
      context.setState(state);
   }

   @Action(ResetButtons)
   resetButtons(context: StateContext<PageStateModel>) {
      const state = context.getState();
      state.buttons = {};
      context.setState(state);
   }
}