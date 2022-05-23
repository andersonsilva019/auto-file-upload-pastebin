import { ConfigPastebinTypes } from "./types/configPastebinTypes";

export function configPastebin({
  api_dev_key,
  api_paste_code,
  api_option,
  api_paste_expireDate,
  api_paste_format,
  api_paste_name,
  api_paste_private,
  api_user_key
}: ConfigPastebinTypes) {
  const body = new URLSearchParams();

  body.append('api_dev_key', api_dev_key);
  body.append('api_paste_code', api_paste_code);
  body.append('api_option', api_option);
  body.append('api_paste_expire_date', api_paste_expireDate);
  body.append('api_paste_format', api_paste_format);
  body.append('api_paste_name', api_paste_name);
  body.append('api_paste_private', api_paste_private);
  body.append('api_user_key', api_user_key);

  return body;
}