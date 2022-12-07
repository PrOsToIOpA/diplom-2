import {IProgram} from '../types/programs';

export const SET_PROGRAMS = 'SET_PROGRAMS';

export const setPrograms = (data: Array<IProgram>) => (
  console.log('action data', data),
  {
    type: SET_PROGRAMS,
    data,
  }
);

export const FETCH_PROGRAMS = 'FETCH_PROGRAMS';
export const SUCCESS_PROGRAMS = 'SUCCESS_PROGRAMS';
export const FAILURE_PROGRAMS = 'FAILURE_PROGRAMS';
export const fetchPrograms = () => ({
  type: FETCH_PROGRAMS,
});
export const FETCH_UNSORTED_PROGRAMS = 'FETCH_UNSORTED_PROGRAMS';
export const fetchUnsortedPrograms = () => ({
  type: FETCH_UNSORTED_PROGRAMS,
});
export const successPrograms = (data: Array<IProgram>) => ({
  type: SUCCESS_PROGRAMS,
  data,
});
export const failurePrograms = () => ({
  type: FAILURE_PROGRAMS,
});

export const SET_PROGRAMS_SEARCH_TEXT = 'SET_PROGRAMS_SEARCH_TEXT';
export const setProgramText = (data: string) => ({
  type: SET_PROGRAMS_SEARCH_TEXT,
  data,
});

export const FETCH_TRACKING_LINK = 'FETCH_TRACKING_LINK';
export const SUCCESS_TRACKING_LINK = 'SUCCESS_TRACKING_LINK';
export const FAILURE_TRACKING_LINK = 'FAILURE_TRACKING_LINK';
export const fetchTrackingLink = (programID: number) => ({
  type: FETCH_TRACKING_LINK,
  data: programID,
});
export const successTrackingLink = () => ({
  type: SUCCESS_TRACKING_LINK,
});
export const failureTrackingLink = () => ({
  type: FAILURE_TRACKING_LINK,
});

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const SUCCESS_CATEGORIES = 'SUCCESS_CATEGORIES';
export const FAILURE_CATEGORIES = 'FAILURE_CATEGORIES';
export const fetchCategories = () => ({
  type: FETCH_CATEGORIES,
});
export const successCategories = (data: any) => ({
  type: SUCCESS_CATEGORIES,
  data,
});
export const failureCategories = () => ({
  type: FAILURE_CATEGORIES,
});

export const FILTER_PROGRAMS = 'FILTER_PROGRAMS';
export const filterPrograms = (idCategory: number) => ({
  type: FILTER_PROGRAMS,
  data: idCategory,
});

export const CLEAR_PROGRAMS_REDUCER = 'CLEAR_PROGRAMS_REDUCER';
export const clearProgramsReducer = () => ({
  type: CLEAR_PROGRAMS_REDUCER,
});
