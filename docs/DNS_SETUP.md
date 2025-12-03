# DNS Configuration for downloads.bitcoin-os.website

## Required DNS Records

Add the following DNS records to your domain provider (e.g., Namecheap, Cloudflare, GoDaddy):

### Option 1: CNAME Record (Recommended)
```
Type: CNAME
Name: downloads
Value: bitcoin-corp.github.io
TTL: 3600 (or Auto)
```

### Option 2: A Records (Alternative)
```
Type: A
Name: downloads
Value: 185.199.108.153
TTL: 3600

Type: A  
Name: downloads
Value: 185.199.109.153
TTL: 3600

Type: A
Name: downloads
Value: 185.199.110.153
TTL: 3600

Type: A
Name: downloads
Value: 185.199.111.153
TTL: 3600
```

## Verification Steps

1. **Add DNS Records**: Log into your domain provider and add the CNAME or A records above

2. **Wait for Propagation**: DNS changes can take 0-48 hours to propagate (usually within 1 hour)

3. **Enable in GitHub**:
   - Go to: https://github.com/bitcoin-corp/bitcoin-OS/settings/pages
   - Under "Custom domain", it should show `downloads.bitcoin-os.website`
   - Click "Save"
   - Wait for DNS check to complete
   - Enable "Enforce HTTPS" once available

4. **Test the Domain**:
   ```bash
   # Check DNS propagation
   dig downloads.bitcoin-os.website
   
   # Or use nslookup
   nslookup downloads.bitcoin-os.website
   ```

## Troubleshooting

- **404 Error**: Ensure the CNAME file exists in /docs folder
- **DNS Not Found**: Wait longer for propagation or check DNS records
- **SSL Error**: Wait for GitHub to provision SSL certificate (can take up to 24 hours)
- **Wrong Content**: Clear browser cache and try incognito mode

## Final URLs

Once configured, the site will be accessible at:
- https://downloads.bitcoin-os.website/
- https://bitcoin-corp.github.io/bitcoin-OS/ (backup)

## SSL Certificate

GitHub Pages automatically provisions an SSL certificate for custom domains. This process:
1. Starts after DNS verification
2. Takes 15-60 minutes typically
3. Shows a green checkmark when complete