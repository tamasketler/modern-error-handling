# Demo API

A minimal .NET 8 API demonstrating different HTTP status codes with consistent JSON error responses.

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)

## Running the API

From the `api` folder:

```bash
dotnet run
```

Or from the project root:

```bash
dotnet run --project api
```

The API will start on:
- **HTTP**: http://localhost:5000
- **HTTPS**: https://localhost:5001

## Swagger UI

Once the API is running, access Swagger UI at:

**http://localhost:5000/swagger**

The OpenAPI specification is available at:

**http://localhost:5000/swagger/v1/swagger.json**

## Available Endpoints

| Endpoint | Method | Status Code | Description |
|----------|--------|-------------|-------------|
| `/api/demo/success` | GET | 200 OK | Returns success with no body |
| `/api/demo/error` | GET | 500 Internal Server Error | Returns JSON error body |
| `/api/demo/upgrade` | GET | 402 Payment Required | Returns JSON error body |

## Error Response Schema

All non-200 responses return a consistent JSON structure:

```json
{
  "code": "ERROR_CODE",
  "message": "Human-readable error message.",
  "statusCode": 500
}
```

### Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `INTERNAL_ERROR` | 500 | An unexpected server error |
| `PLAN_UPGRADE_REQUIRED` | 402 | User needs to upgrade their plan |

