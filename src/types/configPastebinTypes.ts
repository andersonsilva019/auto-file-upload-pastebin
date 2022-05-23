export type ExpireDateParams = 'N' | '10M' | '1H' | '1D' | '1W' | '2W' | '1M' | '6M' | '1Y';
export type StatusPaste = '0' | '1' | '2'; // 0=public 1=unlisted 2=private

export interface ConfigPastebinTypes {
  api_dev_key: string;
  api_paste_code: string;
  api_paste_private: string;
  api_paste_format: string;
  api_option: string;
  api_paste_name: string;
  api_paste_expireDate: string;
  api_user_key: string;
}