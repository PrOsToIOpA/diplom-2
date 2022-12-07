import * as types from '../actions/programsActions';
import {ICategory, IProgram} from '../types/programs';

interface IAction {
  type: string;
  data: Array<IProgram>;
}
interface IActionText {
  type: string;
  data: string;
}
interface IActionSortProgram {
  type: string;
  data: number;
}

export interface IProgramsReducer {
  programs: Array<IProgram> | null;
  programsUnsorted: Array<IProgram> | null;
  lastProgramsUpdate: number;
  isFetchingPrograms: boolean;
  isFetchingTrackingLink: boolean;
  searchProgramsText: string;
  isFetchingCategories: boolean;
  categories: Array<ICategory> | null;
}

const initialState: IProgramsReducer = {
  programs: null,
  programsUnsorted: null,
  lastProgramsUpdate: 0,
  isFetchingPrograms: false,
  isFetchingTrackingLink: false,
  searchProgramsText: '',
  isFetchingCategories: false,
  categories: null,
};

const programsReducer = (
  state = initialState,
  action: IAction | IActionText | IActionSortProgram,
) => {
  switch (action.type) {
    case types.FETCH_PROGRAMS: {
      return {
        ...state,
        isFetchingPrograms: true,
      };
    }
    case types.SUCCESS_PROGRAMS: {
      return {
        ...state,
        isFetchingPrograms: false,
        programs: action.data,
        programsUnsorted: action.data,
        lastProgramsUpdate: Date.now(),
      };
    }
    case types.FAILURE_PROGRAMS: {
      return {
        ...state,
        isFetchingPrograms: false,
      };
    }
    case types.FETCH_TRACKING_LINK: {
      return {
        ...state,
        isFetchingTrackingLink: true,
      };
    }
    case types.SUCCESS_TRACKING_LINK: {
      return {
        ...state,
        isFetchingTrackingLink: false,
      };
    }
    case types.FAILURE_TRACKING_LINK: {
      return {
        ...state,
        isFetchingTrackingLink: false,
      };
    }
    case types.SET_PROGRAMS_SEARCH_TEXT: {
      return {
        ...state,
        searchProgramsText: action.data,
      };
    }
    case types.FETCH_CATEGORIES: {
      return {
        ...state,
        isFetchingCategories: true,
      };
    }
    case types.SUCCESS_CATEGORIES: {
      return {
        ...state,
        isFetchingCategories: false,
        categories: action.data,
      };
    }
    case types.FAILURE_CATEGORIES: {
      return {
        ...state,
        isFetchingCategories: false,
      };
    }
    case types.CLEAR_PROGRAMS_REDUCER: {
      return {...initialState};
    }
    case types.FILTER_PROGRAMS: {
      return {
        ...state,
        programs: state.programsUnsorted?.filter(program => {
          // @ts-ignore
          return program.category_ids.includes(action.data);
        }),
      };
    }
    case types.FETCH_UNSORTED_PROGRAMS: {
      return {
        ...state,
        programs: state.programsUnsorted,
      };
    }
    default:
      return state;
  }
};

export default programsReducer;
