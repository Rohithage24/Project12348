# Stores warnings per user session (in-memory for now)
warning_counter = {}

def get_warning_count(user_id: str):
    return warning_counter.get(user_id, 0)

def increment_warning(user_id: str):
    warning_counter[user_id] = warning_counter.get(user_id, 0) + 1
    return warning_counter[user_id]

def reset_session(user_id: str):
    warning_counter[user_id] = 0
