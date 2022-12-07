export interface IApiRegistration {
  email: string;
  verification: string;
  birthdate?: string;
  password: string;
  first_name?: string;
}
export interface ISetTokenToHeaders {
  token: string;
}

export interface ISetApiVersion {
  apiVersion: number;
  language: string;
}

export interface IApiLogin {
  grant_type: 'password' | 'refresh_token';
  username?: string;
  password?: string;
  refresh_token?: string;
}

export interface IApiPostClaims {
  click_id: string;
  advertiser_id: string;
  order_reference: string;
  amount: string;
  expected_cashback: string;
  converted_at: string;
  file: string;
}

export interface IApiPostUserPayout {
  bank_account_number: string;
}

export interface IResetPassword {
  email: string;
}
