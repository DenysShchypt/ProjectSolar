export default (): {
  port: string | undefined;
  db_port: number | undefined;
  db_host: string | undefined;
  db_name: string | undefined;
  db_user: string | undefined;
  db_password: string | undefined;
  secret_jwt: string | undefined;
  expire_jwt: string | undefined;
  google_client_id: string | undefined;
  google_client_secret: string | undefined;
  base_url: string | undefined;
  mail_from: string | undefined;
  mail_api_key: string | undefined;
  base_url_client: string | undefined;
} => ({
  port: process.env.PORT,
  db_port: parseInt(process.env.POSTGRES_PORT, 10),
  db_host: process.env.POSTGRES_HOST,
  db_name: process.env.POSTGRES_DB,
  db_user: process.env.POSTGRES_USER,
  db_password: process.env.POSTGRES_PASSWORD,
  secret_jwt: process.env.SECRET_KEY,
  expire_jwt: process.env.EXPIRE_JWT,
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  base_url: process.env.BASE_URL,
  mail_from: process.env.MAIL_UKRNET_FROM,
  mail_api_key: process.env.UKRNET_API_KEY,
  base_url_client: process.env.BASE_URL_CLIENT,
});
