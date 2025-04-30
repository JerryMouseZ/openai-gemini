### Configure API Key (.env file)

Create a file named `.env` in the project root directory and add the following content:

```
API_KEYS=your_key1,your_key2
```

You can enter one or more Gemini API Keys, separated by commas. The service will automatically read the keys from this file upon startup.

### Serve locally - with Node, Deno, Bun

Only for Node: `npm install`.

Then `npm run start` / `npm run start:deno` / `npm run start:bun`.


#### Dev mode (watch source changes)

Only for Node: `npm install --include=dev`

Then: `npm run dev` / `npm run dev:deno` / `npm run dev:bun`.


## How to use
If you open your newly-deployed site in a browser, you will only see a `404 Not Found` message. This is expected, as the API is not designed for direct browser access.
To utilize it, you should enter your API address and your Gemini API key into the corresponding fields in your software settings.

> [!NOTE]
> Not all software tools allow overriding the OpenAI endpoint, but many do
> (however these settings can sometimes be deeply hidden).

Typically, you should specify the API base in this format:  
`http://localhost:8080/v1`

The relevant field may be labeled as "_OpenAI proxy_".
You might need to look under "_Advanced settings_" or similar sections.
Alternatively, it could be in some config file (check the relevant documentation for details).

For some command-line tools, you may need to set an environment variable, _e.g._:
```sh
OPENAI_BASE_URL="http://localhost:8080/v1"
```
_..or_:
```sh
OPENAI_API_BASE="http://localhost:8080/v1"
```


## Models

Requests use the specified [model] if its name starts with "gemini-", "gemma-", "learnlm-", 
or "models/". Otherwise, these defaults apply:

- `chat/completions`: `gemini-2.0-flash`
- `embeddings`: `text-embedding-004`

[model]: https://ai.google.dev/gemini-api/docs/models/gemini


## Built-in tools

To use the **web search** tool, append ":search" to the model name
(e.g., "gemini-2.0-flash:search").

Note: The `annotations` message property is not implemented.


## Media

[Vision] and [audio] input supported as per OpenAI [specs].
Implemented via [`inlineData`](https://ai.google.dev/api/caching#Part).

[vision]: https://platform.openai.com/docs/guides/vision
[audio]: https://platform.openai.com/docs/guides/audio?audio-generation-quickstart-example=audio-in
[specs]: https://platform.openai.com/docs/api-reference/chat/create

---

## Supported API endpoints and applicable parameters

- [x] `chat/completions`

  Currently, most of the parameters that are applicable to both APIs have been implemented.
  <details>

  - [x] `messages`
      - [x] `content`
      - [x] `role`
          - [x] "system" (=>`system_instruction`)
          - [x] "user"
          - [x] "assistant"
          - [x] "tool"
      - [ ] `name`
      - [x] `tool_calls`
  - [x] `model`
  - [x] `frequency_penalty`
  - [ ] `logit_bias`
  - [ ] `logprobs`
  - [ ] `top_logprobs`
  - [x] `max_tokens`, `max_completion_tokens`
  - [x] `n` (`candidateCount` <8, not for streaming)
  - [x] `presence_penalty`
  - [x] `response_format`
      - [x] "json_object"
      - [x] "json_schema" (a select subset of an OpenAPI 3.0 schema object)
      - [x] "text"
  - [ ] `seed`
  - [x] `stop`: string|array (`stopSequences` [1,5])
  - [x] `stream`
  - [x] `stream_options`
      - [x] `include_usage`
  - [x] `temperature` (0.0..2.0 for OpenAI, but Gemini supports up to infinity)
  - [x] `top_p`
  - [x] `tools`
  - [x] `tool_choice`
  - [ ] `parallel_tool_calls` (is always active in Gemini)

  </details>
- [ ] `completions`
- [x] `embeddings`
- [x] `models`
