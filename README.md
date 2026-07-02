# Bng2latlongConverter SDK

bng2latlong Converter client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## Try it

**TypeScript**
```bash
npm install bng2latlong-converter
```

**Python**
```bash
pip install bng2latlong-converter-sdk
```

**PHP**
```bash
composer require voxgig/bng2latlong-converter-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/bng2latlong-converter-sdk/go
```

**Ruby**
```bash
gem install bng2latlong-converter-sdk
```

**Lua**
```bash
luarocks install bng2latlong-converter-sdk
```

## Quickstart

### TypeScript

```ts
import { Bng2latlongConverterSDK } from 'bng2latlong-converter'

const client = new Bng2latlongConverterSDK({
  apikey: process.env.BNG2LATLONG-CONVERTER_APIKEY,
})

// Load coordinateconversion data
const coordinateconversion = await client.CoordinateConversion().load({})
console.log(coordinateconversion.data)
```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o bng2latlong-converter-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "bng2latlong-converter": {
      "command": "/abs/path/to/bng2latlong-converter-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **CoordinateConversion** |  | `/bng2latlong/{easting}/{northing}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from bng2latlongconverter_sdk import Bng2latlongConverterSDK

client = Bng2latlongConverterSDK({
    "apikey": os.environ.get("BNG2LATLONG-CONVERTER_APIKEY"),
})


# Load a specific coordinateconversion
coordinateconversion, err = client.CoordinateConversion().load({"id": "example_id"})
print(coordinateconversion)
```

### PHP

```php
<?php
require_once 'bng2latlongconverter_sdk.php';

$client = new Bng2latlongConverterSDK([
    "apikey" => getenv("BNG2LATLONG-CONVERTER_APIKEY"),
]);


// Load a specific coordinateconversion
[$coordinateconversion, $err] = $client->CoordinateConversion()->load(["id" => "example_id"]);
print_r($coordinateconversion);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/bng2latlong-converter-sdk/go"

client := sdk.NewBng2latlongConverterSDK(map[string]any{
    "apikey": os.Getenv("BNG2LATLONG-CONVERTER_APIKEY"),
})

// Load coordinateconversion data
coordinateconversion, err := client.CoordinateConversion(nil).Load(map[string]any{}, nil)
fmt.Println(coordinateconversion)
```

### Ruby

```ruby
require_relative "Bng2latlongConverter_sdk"

client = Bng2latlongConverterSDK.new({
  "apikey" => ENV["BNG2LATLONG-CONVERTER_APIKEY"],
})


# Load a specific coordinateconversion
coordinateconversion, err = client.CoordinateConversion().load({ "id" => "example_id" })
puts coordinateconversion
```

### Lua

```lua
local sdk = require("bng2latlong-converter_sdk")

local client = sdk.new({
  apikey = os.getenv("BNG2LATLONG-CONVERTER_APIKEY"),
})


-- Load a specific coordinateconversion
local coordinateconversion, err = client:CoordinateConversion():load({ id = "example_id" })
print(coordinateconversion)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = Bng2latlongConverterSDK.test()
const result = await client.CoordinateConversion().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = Bng2latlongConverterSDK.test()
result, err = client.CoordinateConversion().load({"id": "test01"})
```

### PHP

```php
$client = Bng2latlongConverterSDK::test();
[$result, $err] = $client->CoordinateConversion()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.CoordinateConversion(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = Bng2latlongConverterSDK.test
result, err = client.CoordinateConversion().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:CoordinateConversion():load({ id = "test01" })
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

---

Generated from the bng2latlong Converter OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
