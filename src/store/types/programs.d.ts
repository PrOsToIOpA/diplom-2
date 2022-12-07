export interface IAdvertiser {
  name: string;
  image_id: string;
  image_url: string;
}

export interface IApp {
  short_description: string;
  body: string;
}

export interface ICommissionGroupsItem {
  name: string;
  value: string;
}

export interface IProgram {
  id: number;
  premium: string;
  image_id: string;
  image_url: string;
  promotion: string;
  spotlight: boolean;
  program_type: string;
  advertiser: IAdvertiser;
  category_ids: Array<number>;
  app: IApp;
  commission_groups: Array<ICommissionGroupsItem>;
}

export interface ICategory {
  name: string;
  id: number;
}
