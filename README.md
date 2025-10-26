# LLM Tests
<p align="center">
<img src="https://leofernandes.s3.sa-east-1.amazonaws.com/github/llm-tests/chat-1.png" alt="Chat interface">
</p>

## Dependencies
1. PgVector (available on the compose files)  
1. Python 3.11 (available on llm-tests-backend Dockerfile)  
1. Node 22 (available on llm-tests-ui Dockerfile)  
1. OpenAi account  


## Setup
1. Refer to **llm-tests-backend** and **llm-tests-ui** to check required .env files and other specific setup instructions.  
2. Run `docker compose up --build` to spin up the application available on port 5173 by default.  

## References
[Navigating the RAG Landscape: A Deep Dive into Frameworks like LangChain, LlamaIndex, and Beyond](https://medium.com/@ajayverma23/navigating-the-rag-landscape-a-deep-dive-into-frameworks-like-langchain-llamaindex-and-beyond-4aed96ff93dd)  
[LangChain - Build a Retrieval Augmented Generation (RAG) App: Part 1](https://python.langchain.com/docs/tutorials/rag/)  
[LangChain - Conceptual guide](https://python.langchain.com/docs/concepts/)  
