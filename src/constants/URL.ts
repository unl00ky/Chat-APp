const PORT = 8000;
const DOMAIN = "localhost";

const BASE_URL = `http://${DOMAIN}:${PORT}`;

export const CONTACTS_ENDPOINT = `${BASE_URL}/api/contacts`;
export const DISCUSSIONS_ENDPOINT = `${BASE_URL}/api/discussions`;
export const AUTHENTICATE_ENDPOINT = `${BASE_URL}/api/authenticate`;
export const MESSAGES_ENDPOINT = `${BASE_URL}/api/messages`;
