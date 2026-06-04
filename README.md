# Bng2latlongConverter SDK

Convert British National Grid easting/northing (OSGB36) to WGS84 latitude and longitude

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About bng2latlong Converter

The **bng2latlong Converter** is a small HTTP service from [GetTheData](https://www.getthedata.com/bng2latlong) that turns Ordnance Survey British National Grid coordinates (OSGB36 easting and northing, in metres) into WGS84 geographic coordinates (latitude and longitude in decimal degrees). It is useful for plotting UK survey, postcode, or map data on global mapping platforms such as Google Maps, Leaflet, or Mapbox.

What you get from the API:
- A single GET endpoint that accepts easting and northing path parameters
- Response fields: `status`, `error` (on failure), `easting`, `northing`, `latitude`, `longitude`
- JSON output by default, with optional XML output by appending `/xml` to the request

The conversion is performed server-side using PHPCoord (Doug Wright's port of Jonathan Stott's public-domain PHP coordinate library). No authentication is needed, CORS is enabled, and the service publishes uptime and response-time metrics on its monitoring page. Rate limits are not documented.

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

## 30-second quickstart

### TypeScript

```ts
import { Bng2latlongConverterSDK } from 'bng2latlong-converter'

const client = new Bng2latlongConverterSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

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
| **CoordinateConversion** | Single coordinate-conversion resource exposed at `/bng2latlong/{easting}/{northing}` that returns the equivalent WGS84 latitude and longitude for a pair of OSGB36 British National Grid coordinates. | `/bng2latlong/{easting}/{northing}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from bng2latlongconverter_sdk import Bng2latlongConverterSDK

client = Bng2latlongConverterSDK({})


# Load a specific coordinateconversion
coordinateconversion, err = client.CoordinateConversion(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'bng2latlongconverter_sdk.php';

$client = new Bng2latlongConverterSDK([]);


// Load a specific coordinateconversion
[$coordinateconversion, $err] = $client->CoordinateConversion(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/bng2latlong-converter-sdk/go"

client := sdk.NewBng2latlongConverterSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "Bng2latlongConverter_sdk"

client = Bng2latlongConverterSDK.new({})


# Load a specific coordinateconversion
coordinateconversion, err = client.CoordinateConversion(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("bng2latlong-converter_sdk")

local client = sdk.new({})


-- Load a specific coordinateconversion
local coordinateconversion, err = client:CoordinateConversion(nil):load(
  { id = "example_id" }, nil
)
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
client = Bng2latlongConverterSDK.test(None, None)
result, err = client.CoordinateConversion(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = Bng2latlongConverterSDK::test(null, null);
[$result, $err] = $client->CoordinateConversion(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.CoordinateConversion(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = Bng2latlongConverterSDK.test(nil, nil)
result, err = client.CoordinateConversion(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:CoordinateConversion(nil):load(
  { id = "test01" }, nil
)
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

## Using the bng2latlong Converter

- Upstream: [https://www.getthedata.com/bng2latlong](https://www.getthedata.com/bng2latlong)

- Free to use for any purpose, commercial or non-commercial
- A link back to the API page is appreciated but not mandatory
- No authentication or API key required
- Conversion library (PHPCoord by Doug Wright, originally by Jonathan Stott) is in the public domain

---

Generated from the bng2latlong Converter OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
