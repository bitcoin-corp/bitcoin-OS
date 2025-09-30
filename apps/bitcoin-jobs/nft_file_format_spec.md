# `.nft` File Format Specification

## Overview
The `.nft` format is a container for versioned spreadsheets stored and managed on the Bitcoin (BSV) blockchain.  
Each save creates a new immutable version, chained together via digital signatures in transactions (UTXO model).  
Users can encrypt data selectively (whole file, rows, columns, or cells) and sell controlled access.  
Ownership and revenue distribution can be tokenized via BSV-native tokens.

---

## File Structure
An `.nft` file is a ZIP-like container with the following structure:

```
root.nft
├── manifest.json      # metadata (version, parent, author)
├── sheet.csv | sheet.xml | sheet.xlsx   # the actual spreadsheet data
├── schema.json        # data types, column/row definitions, permissions
├── keys.json          # encrypted symmetric keys for selective access
├── signatures.json    # chain of digital signatures
```

---

## `manifest.json`
```jsonc
{
  "version": "1.0.0",
  "file_format": "csv",              // or xml/xlsx
  "hash": "sha256-...",
  "parent_txid": "abc123...",
  "author_pubkey": "02ab...",
  "timestamp": "2025-09-13T21:00:00Z",
  "encryption": {
    "type": "AES-256-GCM",
    "granularity": "row"             // none | file | row | column | cell
  },
  "nft_root_txid": "def456..."       // the genesis TX for this spreadsheet asset
}
```

---

## `schema.json`
Defines structure, data types, and permission rules.

```jsonc
{
  "columns": [
    {"name": "Date", "type": "datetime"},
    {"name": "Amount", "type": "decimal"},
    {"name": "Notes", "type": "string"}
  ],
  "permissions": {
    "public": ["Date"],
    "restricted": ["Amount", "Notes"]
  }
}
```

---

## `keys.json`
Contains symmetric keys for granular decryption, encrypted for buyers.

```jsonc
{
  "file_key": {
    "encrypted_for": "buyer_pubkey",
    "ciphertext": "base64..."
  },
  "row_keys": [
    {"row": 1, "encrypted_for": "buyer_pubkey", "ciphertext": "base64..."}
  ]
}
```

---

## `signatures.json`
Chain of digital signatures linking each version to the previous one.

```jsonc
{
  "txid": "ghi789...",
  "signed_by": "02ab...",
  "signature": "base64...",
  "parent_signature": "base64..."
}
```

---

## Blockchain Mapping
- Each `.nft` save corresponds to a Bitcoin transaction.
- Transaction `OP_RETURN` (or metadata envelope) stores:
  ```jsonc
  {
    "nft_txid": "ghi789...",
    "parent_txid": "abc123...",
    "hash": "sha256(file)",
    "format": "csv",
    "uri": "b://... or off-chain link",
    "author_pubkey": "02ab..."
  }
  ```
- UTXO model ensures immutability and versioning (one save = one UTXO).

---

## Tokenization (Optional)
- Spreadsheets may issue tokens representing equity ("shares").
- Revenue generated from selling data access can be distributed as dividends to token holders via pay-to-script transactions.

---

## Use Cases
- **Collaborative accounting ledgers** (real-time, auditable, immutable).
- **Data marketplaces**: sell rows/columns/cells of data selectively.  
- **IP assets**: issue shares in a spreadsheet and share profits.  
- **Scientific data publishing**: transparent version control of datasets.

---

## Roadmap for Implementation
1. MVP: `.nft` supports **whole-file versioning** only.  
2. Add **row/column selective encryption**.  
3. Add **per-cell encryption**.  
4. Integrate tokenization + dividends distribution.  
