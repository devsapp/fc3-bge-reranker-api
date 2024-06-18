from fastapi import FastAPI
from fastapi.responses import RedirectResponse
import uvicorn
from schema import RerankRequest,RerankResponse
import service
app = FastAPI()


@app.get("/")
def index():
    return RedirectResponse(url="/docs")

@app.post("/rerank",response_model=RerankResponse)
async def compare_sentences(request: RerankRequest):
    """For normal reranker(重排)"""
    return {
        "object": "list",
        "data": service.rerank(request.query, request.compare_to_sentences)
    }


uvicorn.run(app, host="0.0.0.0", port=8000)
