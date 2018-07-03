import { State, Action, StateContext } from '@ngxs/store';
import { PageTitle } from '~/store/actions/page.actions';

interface PageStateModel {
   title: string;
}

@State<PageStateModel>({
   name: 'page'
})
export class PageState {

   @Action(PageTitle)
   setPageTitle(context: StateContext<PageStateModel>, { payload }: PageTitle) {
      context.patchState({ title: payload });
   }
}