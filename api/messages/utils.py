from datetime import datetime
from db.models import session, User, Discussion, Message


def create_new_message(message_data):
    now = datetime.now()
    current_time = f"{now.hour}:{now.minute}:{now.second}"

    user = session.query(User).filter_by(id=message_data.user_id).first()
    discussion = session.query(Discussion).filter_by(id=message_data.discussion_id).first()

    msg = Message(
        discussion_id=message_data.discussion_id,
        user_id=message_data.user_id,
        value=message_data.value,
        date=current_time,
        name=user.name
    )
    user.messages.append(msg)
    discussion.messages.append(msg)
    session.commit()

    return msg
