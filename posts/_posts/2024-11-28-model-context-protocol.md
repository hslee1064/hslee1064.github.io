---
layout: post
title: "Model Context Protocol"
date: 2024-11-28
description: "회사에서 Model Context Protocol 리뷰가 필요해서 정리"
excerpt: ""
tags:
- LLM
comments: true
---
### Abstract
- 회사에서 Model Context Protocol 리뷰가 필요해서 정리

## Introduction

- Claude App, LLM App, IDE 등 호스트와 외부 데이터 및 도구 간의 통합을 가능하게 하는 프로토콜
- LLM이 컨텍스트 정보를 잘 사용할 수 있도록 도움을 주는 클라이언트
    - **(Server) Resources**: Text, Image, PDF, Audio, Video 등
    - **(Server) Prompts**: Prompt 템플릿
    - **(Server) Tools**: sqlite, git, google map, slack, custom tool 등
    - **(Client) Sampling:** 다양한 서버 정보를 취사선택
- JSON-RPC 2.0을 이용한 메세지 전달
- Language Server Protocol 이라는 프로그래밍 개발 지원 프로토콜에서 영감을 받음

## Overview
- **Hosts** are LLM applications (like Claude Desktop or IDEs) that initiate connections
- **Clients** maintain 1:1 connections with servers, inside the host application
- **Servers** provide context, tools, and prompts to clients

## **Features**

### Servers:

- **Resources**: Context and data, for the user or the AI model to use
- **Prompts**: Templated messages and workflows for users
- **Tools**: Functions for the AI model to execute

### Clients

- **Sampling**: Server-initiated agentic behaviors and recursive LLM interactions
    

### Client Sample Code
```
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
from mcp.types import AnyUrl

# Create server parameters for stdio connection
server_params = StdioServerParameters(
    command="uv",
    # args=["--directory", "/Users/lee/Documents/mcp", "run", "tool_server.py"],
    # args=["--directory", "/Users/lee/Documents/mcp", "run", "resource_server.py"],
    args=["--directory", "/Users/lee/Documents/mcp", "run", "prompt_server.py"],
    env=None # Optional environment variables
)

async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            # Initialize the connection
            await session.initialize()

            # List available resources
            # resources = await session.list_resources()

            # List available prompts
            # prompts = await session.list_prompts()

            # List available tools
            # tools = await session.list_tools()
            # print(tools)

            # Read a resource
            # resource = await session.list_resources()
            # print(resource)

            # Call a tool
            # result = await session.call_tool("get_heartbeat", arguments={"user": "Hyunsik Lee"})
            # print(result)

            # Get a prompt
            prompt = await session.get_prompt("git-commit", arguments={"arg1": "value"})
            print(prompt)
        
if __name__ == "__main__":
    import asyncio
    asyncio.run(run())
```

### Tool Server Sample Code
```
from mcp.server import Server
from mcp import Tool
from mcp.types import TextContent, ImageContent, EmbeddedResource
import json

# Create a server instance
app = Server("heartbeat-server")

@app.list_tools()
async def list_tools() -> list[Tool]:
    """List available tools."""
    return [
        Tool(
            name="get_heartbeat",
            description="Get a heartbeat",
            inputSchema={
                "type": "object",
                "properties": {
                    "user": {
                        "type": "string",
                        "description": "user name"
                    },
                },
                "required": ["user"]
            }
        )
    ]
    
@app.call_tool()
async def call_tool(name: str, arguments) -> list[TextContent | ImageContent | EmbeddedResource]:
    """Handle tool calls for heartbeat."""
    if name != "get_heartbeat":
        raise ValueError(f"Unknown tool: {name}")

    if not isinstance(arguments, dict) or "user" not in arguments:
        raise ValueError("Invalid arguments")

    reply = {
        "text": f"Hello {arguments['user']}, my heart beats for you!"
    }

    return [
        TextContent(
            type="text",
            text=json.dumps(reply, indent=2)
        )
    ]

async def main():
    # Import here to avoid issues with event loops
    from mcp.server.stdio import stdio_server

    async with stdio_server() as (read_stream, write_stream):
        await app.run(
            read_stream,
            write_stream,
            app.create_initialization_options()
        )

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
```

### Resource Server Sample Code
```
from mcp.server import Server
from mcp import Tool
from mcp.types import AnyUrl, FileUrl
from mcp import types

# Create a server instance
app = Server("heartbeat-server")

@app.list_resources()
async def list_resources() -> list[types.Resource]:
    return [
        types.Resource(
            uri=FileUrl("file://Users/lee/Documents/mcp/README.md"), # type: ignore
            name="Application Logs",
            mimeType="text/plain"
        )
    ]

@app.read_resource()
async def read_resource(uri: AnyUrl) -> str:
    if str(uri) == "file:///logs/app.log":
        log_contents = "log"
        return log_contents

    raise ValueError("Resource not found")

async def main():
    # Import here to avoid issues with event loops
    from mcp.server.stdio import stdio_server

    async with stdio_server() as (read_stream, write_stream):
        await app.run(
            read_stream,
            write_stream,
            app.create_initialization_options()
        )

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
```


## References
### Python SDK

https://github.com/modelcontextprotocol/python-sdk

### MCP Server

https://github.com/modelcontextprotocol/servers

### Example
https://medium.com/@shuvro_25220/is-anthropics-model-context-protocol-mcp-the-interoperability-standard-we-ve-been-waiting-for-f2fe9e38110c