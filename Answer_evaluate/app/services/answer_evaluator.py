from sentence_transformers import SentenceTransformer, util
import re

model = SentenceTransformer('all-MiniLM-L6-v2')
SIMILARITY_THRESHOLD = 0.45  # lowered for flexible matching


def split_into_phrases(text):
    # Split by commas, "and", "by", etc.
    parts = re.split(r',| and | by | using | with ', text.lower())
    return [p.strip() for p in parts if len(p.strip()) > 4]


def keyword_score(user_answer: str, keywords: list):
    user_answer = user_answer.lower()
    matches = sum(1 for word in keywords if word.lower() in user_answer)
    return matches / len(keywords) if keywords else 0


def evaluate_answer(user_answer: str, key_concepts: list, keywords: list):
    phrases = split_into_phrases(user_answer)
    phrase_embeddings = model.encode(phrases, convert_to_tensor=True)

    matched_concepts = []
    missed_concepts = []

    for concept in key_concepts:
        concept_embedding = model.encode(concept, convert_to_tensor=True)
        similarities = util.cos_sim(concept_embedding, phrase_embeddings)[0]
        best_score = float(similarities.max())

        if best_score >= SIMILARITY_THRESHOLD:
            matched_concepts.append(concept)
        else:
            missed_concepts.append(concept)

    concept_score = len(matched_concepts) / len(key_concepts) if key_concepts else 0
    keyword_match_score = keyword_score(user_answer, keywords)

    final_score = round((concept_score * 0.7 + keyword_match_score * 0.3) * 100, 2)

    if final_score >= 70:
        evaluation = "Correct"
    elif final_score >= 40:
        evaluation = "Partially Correct"
    else:
        evaluation = "Incorrect"

    return {
        "score_percentage": final_score,
        "evaluation": evaluation,
        "matched_concepts": matched_concepts,
        "missed_concepts": missed_concepts,
        "keyword_match_score": round(keyword_match_score * 100, 2)
    }
