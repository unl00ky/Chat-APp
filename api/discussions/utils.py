import uuid

from fastapi import HTTPException

from db.models import session, User, Discussion


def remove_duplicate(contacts):
    return list(dict.fromkeys(contacts))


def check_discussion_exists(contacts):
    discussions = session.query(Discussion).all()
    for discussion in discussions:
        discussion_contacts = []
        for contact in discussion.contacts_ids:
            discussion_contacts.append(str(contact))
        if set(discussion_contacts) == set(contacts):
            return True
    return False


def create_new_discussion(contacts, group_name):
    users = session.query(User).filter(User.id.in_(contacts)).all()
    if group_name:
        new_discussion = Discussion(
            group_name=group_name,
            name=None,
            contacts_ids=contacts
        )
    else:
        new_discussion = Discussion(
            name=None,
            contacts_ids=contacts
        )
    session.add(new_discussion)
    for user in users:
        user.discussions.append(new_discussion)
    session.commit()

    return new_discussion


# def update_discussion(discussion_id, contacts):
#     discussions = fake_db.get("discussions")
#     current_discussion = discussions[discussion_id]
#     discussion_contacts = current_discussion["contacts"]
#     for contact in contacts:
#         if contact not in discussion_contacts:
#             discussion_contacts.append(contact)
#
#     if current_discussion.get("group_name"):
#         discussion_obj = {
#             "id": discussion_id,
#             "contacts": discussion_contacts,
#             "group_name": current_discussion.get("group_name")
#         }
#     else:
#         discussion_obj = {
#             "id": discussion_id,
#             "contacts": discussion_contacts,
#         }
#     discussions[discussion_id] = discussion_obj
#     with open("storage/discussions.json", "w") as file:
#         json.dump(discussions, file)
#     return discussions[discussion_id]

def update_name_discussion(user_id, connection_manager):
    user = session.query(User).filter_by(id=user_id).first()

    for discussion in user.discussions:
        if len(discussion.contacts) >= 2:
            users_in_discussion = []
            for contact in discussion.contacts:
                if str(contact.id) != user_id:
                    current_contact = session.query(User).filter_by(id=contact.id).first()
                    users_in_discussion.append(current_contact.name)
            discussion.name = ", ".join(users_in_discussion)
            active_users = 0
            for contact in discussion.contacts:
                if str(contact.id) in connection_manager.active_connections:
                    active_users += 1
            if active_users >= 2:
                discussion.status = "Active"
            else:
                discussion.status = "Offline"
        elif len(discussion.contacts) == 1:
            discussion.name = user.name
            discussion.status = "Active"
    session.commit()
    return list(user.discussions)
