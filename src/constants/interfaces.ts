interface Iuser {
  id: string;
  name: string;
  password: string;
}

interface Idiscussion {
  id?: string;
  contacts: [];
  name?: string;
  group_name?: string;
  status?: string;
}

interface Imessage {
  id: string;
  discussion_id: string;
  user_id: string;
  value: string;
  date: string;
  name: string;
}
