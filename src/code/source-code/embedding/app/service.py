import os
from FlagEmbedding import FlagReranker

reranker = FlagReranker(os.environ.get('MODEL_PATH'), use_fp16=True) 
def rerank(source_query:str, compare_to_sentences: list[str]):
    payload = [[source_query, item] for item in compare_to_sentences]
    scores = reranker.compute_score(payload, normalize=True)
    # 将numpy浮点数转换为Python float
    python_scores = [score.item() for score in scores]
    return python_scores
