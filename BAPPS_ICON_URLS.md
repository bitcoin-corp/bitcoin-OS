# Bitcoin OS Apps - Icon URLs for Bitcoin Apps Store

## Production Icon URLs (UPDATED)

These are the correct icon URLs that should be used on https://www.bitcoinapps.store/rankings:

### Bitcoin OS Main Apps - VERIFIED WORKING URLS

1. **Bitcoin Writer**
   - Primary: `https://bitcoin-os.vercel.app/bitcoin-writer-icon.png`
   - Alternative: `https://bitcoin-writer.vercel.app/logo192.png`
   - Fallback: `https://bitcoin-writer.vercel.app/logo.svg`

2. **Bitcoin Music**
   - Primary: `https://bitcoin-os.vercel.app/bitcoin-music-icon.png`
   - Note: Icon pending creation

3. **Bitcoin Drive**
   - Primary: `https://bitcoin-os.vercel.app/bitcoin-drive-icon.jpg`
   - Alternative: `https://bitcoin-drive.vercel.app/bitcoindrive-icon.jpg`
   - Fallback: `https://bitcoin-drive.vercel.app/favicon.jpg`

4. **Bitcoin Email**
   - Primary: `https://bitcoin-os.vercel.app/bitcoin-email-icon.png`
   - Alternative: `https://bitcoin-email.vercel.app/bitcoin-email-icon.png`
   - Fallback: `https://bitcoin-email.vercel.app/icon-512.png`

5. **Bitcoin Spreadsheet (Bitcoin Sheets)**
   - Primary: `https://bitcoin-os.vercel.app/bitcoin-sheets-icon.png`
   - Alternative: `https://bitcoin-spreadsheet.vercel.app/logo.png`

6. **Bitcoin Wallet**
   - Primary: `https://bitcoin-os.vercel.app/bitcoin-wallet-icon.png`
   - Alternative: `https://bitcoin-wallet-sable.vercel.app/logo192.png`
   - Fallback: `https://bitcoin-wallet-sable.vercel.app/logo512.png`

7. **Bitcoin Jobs**
   - Primary: `https://bitcoin-os.vercel.app/bitcoin-jobs-icon.png`
   - Alternative: `https://bitcoin-jobs.vercel.app/logo.png`
   - Fallback: `https://bitcoin-jobs.vercel.app/favicon.png`

8. **Bitcoin Calendar**
   - Primary: `https://bitcoin-os.vercel.app/bitcoin-calendar-icon.png`
   - Note: Icon pending creation

9. **Bitcoin Exchange**
   - Primary: `https://bitcoin-os.vercel.app/bitcoin-exchange-icon.png`
   - Note: Icon pending creation

## Implementation Note

The Bitcoin Apps Store should update their image sources from relative paths to these absolute URLs. For example:

### Current (Broken):
```html
<img src="/bitcoin-writer-logo.jpg" alt="Bitcoin Writer">
```

### Should be:
```html
<img src="https://bitcoin-writer.vercel.app/logo.svg" alt="Bitcoin Writer" onerror="this.src='https://bitcoin-os.vercel.app/bitcoin-writer-icon.png'">
```

## Fallback Strategy

Each image tag should include an `onerror` handler to use the alternative URL if the primary fails:

```html
<img 
  src="PRIMARY_URL" 
  alt="APP_NAME" 
  onerror="this.src='ALTERNATIVE_URL'"
>
```

## Contact

For icon updates or issues, please contact:
- GitHub: https://github.com/bitcoin-corp/bitcoin-OS/issues
- Website: https://bitcoin-corp.vercel.app/

---

*Last Updated: December 2024*
*By: The Bitcoin Corporation LTD*