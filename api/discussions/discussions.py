from api.discussions.models import DiscussionsType

from fastapi import APIRouter, HTTPException

from api.discussions.utils import remove_duplicate, check_discussion_exists, create_new_discussion, \
    update_name_discussion

from api.websocket_manager.ws import ConnectionManager

from db.models import session, User

discussions_router = APIRouter()


@discussions_router.post("/api/discussions")
async def create_discussion(data: DiscussionsType):
    connection_manager = ConnectionManager()

    contacts = data.contacts
    group_name = data.group_name

    for contact in contacts:
        user = session.query(User).filter_by(id=contact).first()
        if not user:
            raise HTTPException(status_code=404, detail=f"user {user.name} not found")

    contacts = remove_duplicate(contacts)

    # if data.id:
    #     updated_group = update_discussion(data.id, contacts)
    #     clients = []
    #     for contact in updated_group["contacts"]:
    #         clients.append(contact)
    #
    #     connection_manager = ConnectionManager()
    #     await connection_manager.broadcast("new discussion", clients)
    #     return updated_group

    discussion = check_discussion_exists(contacts)
    if discussion:
        raise HTTPException(status_code=404, detail="discussion already exists")

    discussion = create_new_discussion(contacts, group_name)

    clients = []
    for contact in list(discussion.contacts):
        clients.append(str(contact.id))

    await connection_manager.broadcast("new discussion", clients)
    return discussion


@discussions_router.get("/api/discussions")
async def get_discussion(user_id):
    connection_manager = ConnectionManager()

    user_discussions = update_name_discussion(user_id, connection_manager)
    return list(user_discussions)
