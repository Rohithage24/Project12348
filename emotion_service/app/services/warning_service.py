# Temporary in-memory warning tracker
# (Fullstack team can later move this to database)

user_warnings = {}

MAX_WARNINGS = 3

def add_warning(user_id: str):
    count = user_warnings.get(user_id, 0) + 1
    user_warnings[user_id] = count
    return count

def should_stop_interview(user_id: str):
    return user_warnings.get(user_id, 0) >= MAX_WARNINGS
