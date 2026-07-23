# n8n Workflow Architecture - WhatsApp AI Inventory Sync

This directory contains the production-ready **n8n workflow definitions** for processing incoming WhatsApp voice notes and product crate photos into live hyperlocal inventory.

---

## 📁 Directory Structure

```
n8n/
├── README.md                          # Workflow architecture documentation
├── workflows/
│   ├── whatsapp_inventory_sync.json   # Main 11-step master production workflow
│   ├── test_whisper_stt.json          # Modular test workflow for Whisper STT
│   ├── test_florence_vision.json      # Modular test workflow for Florence-2 Vision
│   ├── test_groq_llm.json             # Modular test workflow for Groq LLM parser
│   └── test_bge_embeddings.json       # Modular test workflow for BAAI BGE embeddings
└── schemas/
    ├── webhook_payload.json           # Inbound WhatsApp webhook schema
    └── success_response.json          # Workflow execution output JSON schema
```

---

## ⚙️ Master 11-Step Workflow Pipeline

```
1. Receive WhatsApp Webhook (POST /webhook/whatsapp-inventory)
   ↓
2. Validate Request (Check HMAC signature & payload integrity)
   ↓
3. Download Image Crate Asset (WhatsApp Media API)
   ↓
4. Download Audio Voice Note Asset (WhatsApp Media API)
   ↓
5. Store Temporary Assets (Supabase Storage: /inventory-assets)
   ↓
6. Speech-to-Text Transcription (Whisper API / Groq Whisper)
   ↓
7. Vision Object Detection (Florence-2 Large)
   ↓
8. LLM Inventory Parsing (Groq Llama-3 70B Structured JSON)
   ↓
9. Generate Vector Embeddings (BAAI BGE Large 1024-dim)
   ↓
10. Store Inventory & Freshness Score (Supabase DB RPC / Table Upsert)
   ↓
11. Return Standardized Execution JSON Response
```

---

## 🔑 Required Environment Variables in n8n

| Variable Name | Description | Example Value |
| :--- | :--- | :--- |
| `WHATSAPP_API_TOKEN` | Bearer token for WhatsApp Cloud API | `EAAG...` |
| `SUPABASE_URL` | Supabase API URL | `https://xyzcompany.supabase.co` |
| `SUPABASE_SERVICE_KEY` | Supabase Service Role Key | `eyJhbGci...` |
| `GROQ_API_KEY` | Groq LLM & Whisper API Key | `gsk_...` |
| `FLORENCE_VISION_ENDPOINT` | HuggingFace Florence-2 Endpoint | `https://api-inference.huggingface.co/models/microsoft/Florence-2-large` |
| `BGE_EMBEDDINGS_ENDPOINT` | HuggingFace BAAI BGE Endpoint | `https://api-inference.huggingface.co/models/BAAI/bge-large-en-v1.5` |

---

## 📄 Standardized Payload Formats

### Inbound WhatsApp Webhook Payload:
```json
{
  "object": "whatsapp_business_account",
  "entry": [{
    "id": "WHATSAPP_BUSINESS_ACCOUNT_ID",
    "changes": [{
      "value": {
        "messaging_product": "whatsapp",
        "metadata": {
          "display_phone_number": "15550255555",
          "phone_number_id": "100609346387085"
        },
        "contacts": [{ "profile": { "name": "Alex Rivera Market" }, "wa_id": "15559876543" }],
        "messages": [{
          "from": "15559876543",
          "id": "wamid.HBgLMTU1NTk4NzY1NDMVAgARGBI1RTY3OEQzQzU3RjU1RTZBODcA",
          "timestamp": "1721758400",
          "type": "audio",
          "audio": { "mime_type": "audio/ogg; codecs=opus", "id": "MEDIA_ID_AUDIO" },
          "image": { "mime_type": "image/jpeg", "id": "MEDIA_ID_IMAGE" }
        }]
      }
    }]
  }]
}
```

### Output Response Format:
```json
{
  "status": "success",
  "shopId": "shop-1",
  "itemsExtracted": 3,
  "overallFreshness": 97,
  "overallConfidence": 96,
  "latencyMs": 1240,
  "extractedInventory": [
    { "name": "Organic Vine Tomatoes", "price": 2.49, "unit": "lb", "quantity": 25, "freshnessScore": 98 },
    { "name": "Yukon Gold Potatoes", "price": 1.99, "unit": "lb", "quantity": 40, "freshnessScore": 95 },
    { "name": "Fresh Bunch Spinach", "price": 2.99, "unit": "bundle", "quantity": 15, "freshnessScore": 97 }
  ]
}
```
