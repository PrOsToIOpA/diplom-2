const apiVersion = 10;
const baseURL = `https://api.cashback.amg.nl/publishers/${apiVersion}/`;
const newBaseURL = 'https://api.cashback.amg.nl/publishers/';
const registration = 'signup';
const reset_password = 'reset_password';
const oauthToken = 'oauth/token';
const advertisers = 'advertisers';
const claims = 'claims';
const user = 'user';
const payout = '/payout';
const transactions = '/transactions';
const payouts = '/payouts';
const likes = '/likes';
const clicks = '/clicks';
const magic_links = '/magic_links';
const programs = 'programs';
const categories = 'categories';
const tracking_link = '/tracking_link';
const authenticated_user = 'user/installations';

export const urls = {
  baseURL: () => baseURL,
  setBaseURL: () => newBaseURL,
  registration: () => registration,
  reset_password: () => reset_password,
  login: () => oauthToken,
  advertisers: () => advertisers,
  claims: () => claims,
  user: () => user,
  payout: () => user + payout,
  transactions: () => user + transactions,
  payouts: () => user + payouts,
  likes: () => user + likes,
  clicks: () => user + clicks,
  magic_links: () => user + magic_links,
  programs: () => programs,
  categories: () => categories,
  tracking_link: (id: number) => programs + '/' + id + tracking_link,
  like_program: (id: number) => programs + id + likes,
  authenticated_user: (ID: number) =>
    newBaseURL + ID + '/' + authenticated_user,
  update_authenticated_user: (ID: number, id: number) =>
    newBaseURL + ID + '/' + authenticated_user + '/' + id,
};
