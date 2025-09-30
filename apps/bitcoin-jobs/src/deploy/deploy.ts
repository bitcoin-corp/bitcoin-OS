import { Spreadsheet } from '../contracts/SpreadsheetContract'
import { bsv, TestWallet, DefaultProvider } from 'scrypt-ts'

async function deploySpreadsheet() {
    // Initialize test wallet and provider
    const provider = new DefaultProvider()
    const wallet = new TestWallet('', provider)

    // Generate a new private key for the spreadsheet owner
    const privateKey = bsv.PrivateKey.fromRandom()
    const publicKey = bsv.PublicKey.fromPrivateKey(privateKey)

    // Spreadsheet configuration
    const spreadsheetId = 'spreadsheet_' + Date.now().toString()
    const title = 'My BSV Spreadsheet'

    // Create and deploy the spreadsheet contract
    const spreadsheet = new Spreadsheet(
        publicKey,
        bsv.crypto.Hash.sha256(Buffer.from(spreadsheetId)).toString('hex'),
        Buffer.from(title).toString('hex'),
        100n, // maxRows
        26n   // maxCols (A-Z)
    )

    // Connect wallet and deploy
    await spreadsheet.connect(wallet)

    console.log('Deploying spreadsheet contract...')
    const deployTx = await spreadsheet.deploy()
    console.log('Deployment transaction:', deployTx.id)

    console.log('Spreadsheet deployed successfully!')
    console.log('Contract ID:', spreadsheet.getScriptHash())
    console.log('Spreadsheet ID:', spreadsheetId)

    return {
        contract: spreadsheet,
        txId: deployTx.id,
        spreadsheetId: spreadsheetId,
        privateKey: privateKey.toString(),
        publicKey: publicKey.toString()
    }
}

// Example usage
if (require.main === module) {
    deploySpreadsheet()
        .then(result => {
            console.log('Deployment result:', result)
        })
        .catch(error => {
            console.error('Deployment failed:', error)
        })
}

export { deploySpreadsheet }
