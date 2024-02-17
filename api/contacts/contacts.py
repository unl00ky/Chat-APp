from fastapi import APIRouter, HTTPException

from db.models import session, User

contacts_router = APIRouter()


@contacts_router.get("/api/contacts")
def get_all_contacts():
    all_users = session.query(User).all()
    return all_users


@contacts_router.get("/api/contacts/{user_id}")
def get_contact(user_id):
    user = session.query(User).filter_by(id=user_id).first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
