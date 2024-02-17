from fastapi import APIRouter
from sqlalchemy import delete

from api.messages.models import Messages

from api.messages.utils import create_new_message
from db.models import session, Discussion, Message

from api.websocket_manager.ws import ConnectionManager

messages_router = APIRouter()


@messages_router.post("/api/messages")
async def create_message(message_data: Messages):
    discussion_obj = session.query(Discussion).filter_by(id=message_data.discussion_id).first()

    new_message = create_new_message(message_data)

    clients = []
    for contact in list(discussion_obj.contacts):
        clients.append(str(contact.id))

    connection_manager = ConnectionManager()
    await connection_manager.broadcast("new message", clients)
    return new_message


@messages_router.get("/api/messages/")
def get_messages(discussion_id):
    all_messages = session.query(Message).filter_by(discussion_id=discussion_id).all()

    return all_messages


@messages_router.delete("/api/messages")
async def delete_message(message_id, discussion_id):
    discussion = session.query(Discussion).get(discussion_id)

    message = session.query(Message).get(message_id)
    session.delete(message)
    session.commit()
    clients = []
    for contact in list(discussion.contacts):
        clients.append(str(contact.id))

    connection_manager = ConnectionManager()
    await connection_manager.broadcast("new message", clients)
