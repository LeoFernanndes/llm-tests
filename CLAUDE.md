# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Python-based LLM testing repository focused on implementing Retrieval Augmented Generation (RAG) using LangChain. The project explores different approaches to document processing, vector storage, and question-answering systems.

## Environment Setup

1. **Virtual Environment**: The project uses a Python virtual environment in `./venv/`
2. **Dependencies**: Install dependencies with `pip install -r requirements.txt`
3. **Environment Variables**: Copy `.env` file with required API keys and database configuration:
   - `OPENAI_API_KEY`: OpenAI API key for embeddings and LLM
   - PostgreSQL connection details for vector storage (see docker-compose.yml)

## Development Commands

- **Linting**: `ruff check .` (configured in pyproject.toml)
- **Formatting**: `ruff format .`
- **Type Checking**: `pyright` (configured in pyproject.toml with strict mode)
- **Start Services**: `docker-compose up -d` (starts PostgreSQL with pgvector and Redis)

## Architecture

### Core Components

1. **Document Processing Pipeline**:
   - PDF documents stored in `content_source/pdf/`
   - Text splitting using RecursiveCharacterTextSplitter
   - Vector embeddings via OpenAI text-embedding-3-large

2. **Vector Storage Options**:
   - **FAISS**: In-memory vector store for experimentation (`langchain_retrieval_augmented_generation_1.ipynb`)
   - **PostgreSQL + pgvector**: Persistent vector storage (`pgvectorstore.ipynb`)

3. **RAG Implementation**:
   - Uses LangGraph for building retrieval-augmented generation workflows
   - State management with TypedDict for question/context/answer flow
   - Hub-based prompts for consistent question-answering

### Key Patterns

- **LangGraph State Machines**: Sequential workflows with `retrieve` → `generate` steps
- **Environment Configuration**: Uses python-dotenv for configuration management
- **Async Database Operations**: PostgreSQL vector store uses async patterns
- **Document Chunking**: Consistent chunking strategy (512-1024 tokens with 30 token overlap)

## Infrastructure

- **PostgreSQL with pgvector**: Container runs on port 54301 with vector similarity search capabilities
- **Redis**: Available on port 63701 for caching (if needed)
- **Vector Dimensions**: Uses 3072-dimensional embeddings (text-embedding-3-large)

## File Structure

- `langchain/`: Jupyter notebooks with different RAG implementations
- `content_source/pdf/`: PDF documents for processing and indexing
- `pyproject.toml`: Python project configuration with Ruff and Pyright settings
- `docker-compose.yml`: Infrastructure services (PostgreSQL + Redis)