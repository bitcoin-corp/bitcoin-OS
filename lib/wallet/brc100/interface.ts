/**
 * BRC-100 Wallet Interface
 * The complete unified wallet interface for BSV blockchain
 */

import * as Types from './types'

export interface Wallet {
  // Transaction Operations
  createAction: (
    args: {
      description: Types.DescriptionString5to50Characters
      inputBEEF?: Types.BEEF
      inputs?: Types.TransactionInput[]
      outputs?: Types.TransactionOutput[]
      lockTime?: Types.PositiveIntegerOrZero
      version?: Types.PositiveIntegerOrZero
      labels?: Types.LabelStringUnder300Characters[]
      options?: Types.CreateActionOptions
    },
    originator?: Types.OriginatorDomainNameString
  ) => Promise<{
    txid?: Types.TXIDHexString
    tx?: Types.AtomicBEEF
    noSendChange?: Types.OutpointString[]
    sendWithResults?: Array<{
      txid: Types.TXIDHexString
      status: 'unproven' | 'sending' | 'failed'
    }>
    signableTransaction?: {
      tx: Types.AtomicBEEF
      reference: Types.Base64String
    }
  } | Types.WalletError>

  signAction: (
    args: {
      spends: Record<
        Types.PositiveIntegerOrZero,
        {
          unlockingScript: Types.HexString
          sequenceNumber?: Types.PositiveIntegerOrZero
        }
      >
      reference: Types.Base64String
      options?: {
        acceptDelayedBroadcast?: Types.BooleanDefaultTrue
        returnTXIDOnly?: Types.BooleanDefaultFalse
        noSend?: Types.BooleanDefaultFalse
        sendWith?: Types.TXIDHexString[]
      }
    },
    originator?: Types.OriginatorDomainNameString
  ) => Promise<{
    txid?: Types.TXIDHexString
    tx?: Types.AtomicBEEF
    sendWithResults?: Array<{
      txid: Types.TXIDHexString
      status: 'unproven' | 'sending' | 'failed'
    }>
  } | Types.WalletError>

  abortAction: (
    args: { reference: Types.Base64String },
    originator?: Types.OriginatorDomainNameString
  ) => Promise<{ aborted: true } | Types.WalletError>

  listActions: (
    args: {
      labels: Types.LabelStringUnder300Characters[]
      labelQueryMode?: 'any' | 'all'
      includeLabels?: Types.BooleanDefaultFalse
      includeInputs?: Types.BooleanDefaultFalse
      includeInputSourceLockingScripts?: Types.BooleanDefaultFalse
      includeInputUnlockingScripts?: Types.BooleanDefaultFalse
      includeOutputs?: Types.BooleanDefaultFalse
      includeOutputLockingScripts?: Types.BooleanDefaultFalse
      limit?: Types.PositiveIntegerDefault10Max10000
      offset?: Types.PositiveIntegerOrZero
      seekPermission?: Types.BooleanDefaultTrue
    },
    originator?: Types.OriginatorDomainNameString
  ) => Promise<{
    totalActions: Types.PositiveIntegerOrZero
    actions: Array<{
      txid: Types.TXIDHexString
      satoshis: Types.SatoshiValue
      status: Types.ActionStatus
      isOutgoing: boolean
      description: Types.DescriptionString5to50Characters
      labels?: Types.LabelStringUnder300Characters[]
      version: Types.PositiveIntegerOrZero
      lockTime: Types.PositiveIntegerOrZero
      inputs?: Array<{
        sourceOutpoint: Types.OutpointString
        sourceSatoshis: Types.SatoshiValue
        sourceLockingScript?: Types.HexString
        unlockingScript?: Types.HexString
        inputDescription: Types.DescriptionString5to50Characters
        sequenceNumber: Types.PositiveIntegerOrZero
      }>
      outputs?: Array<{
        outputIndex: Types.PositiveIntegerOrZero
        satoshis: Types.SatoshiValue
        lockingScript?: Types.HexString
        spendable: boolean
        outputDescription: Types.DescriptionString5to50Characters
        basket: Types.BasketStringUnder300Characters
        tags: Types.OutputTagStringUnder300Characters[]
        customInstructions?: string
      }>
    }>
  } | Types.WalletError>

  internalizeAction: (
    args: {
      tx: Types.AtomicBEEF
      outputs: Array<{
        outputIndex: Types.PositiveIntegerOrZero
        protocol: Types.OutputProtocol
        paymentRemittance?: {
          derivationPrefix: Types.Base64String
          derivationSuffix: Types.Base64String
          senderIdentityKey: Types.PubKeyHex
        }
        insertionRemittance?: {
          basket: Types.BasketStringUnder300Characters
          customInstructions?: string
          tags?: Types.OutputTagStringUnder300Characters[]
        }
      }>
      description: Types.DescriptionString5to50Characters
      labels?: Types.LabelStringUnder300Characters[]
      seekPermission?: Types.BooleanDefaultTrue
    },
    originator?: Types.OriginatorDomainNameString
  ) => Promise<{ accepted: true } | Types.WalletError>

  listOutputs: (
    args: {
      basket: Types.BasketStringUnder300Characters
      tags?: Types.OutputTagStringUnder300Characters[]
      tagQueryMode?: 'all' | 'any'
      include?: 'locking scripts' | 'entire transactions'
      includeCustomInstructions?: Types.BooleanDefaultFalse
      includeTags?: Types.BooleanDefaultFalse
      includeLabels?: Types.BooleanDefaultFalse
      limit?: Types.PositiveIntegerDefault10Max10000
      offset?: Types.PositiveIntegerOrZero
      seekPermission?: Types.BooleanDefaultTrue
    },
    originator?: Types.OriginatorDomainNameString
  ) => Promise<{
    totalOutputs: Types.PositiveIntegerOrZero
    BEEF?: Types.BEEF
    outputs: Array<{
      outpoint: Types.OutpointString
      satoshis: Types.SatoshiValue
      lockingScript?: Types.HexString
      spendable: true
      customInstructions?: string
      tags?: Types.OutputTagStringUnder300Characters[]
      labels?: Types.LabelStringUnder300Characters[]
    }>
  } | Types.WalletError>

  relinquishOutput: (
    args: {
      basket: Types.BasketStringUnder300Characters
      output: Types.OutpointString
    },
    originator?: Types.OriginatorDomainNameString
  ) => Promise<{ relinquished: true } | Types.WalletError>

  // Key Management
  getPublicKey: (
    args: {
      identityKey?: true
      protocolID?: Types.ProtocolID
      keyID?: Types.KeyIDStringUnder800Characters
      privileged?: Types.BooleanDefaultFalse
      privilegedReason?: Types.DescriptionString5to50Characters
      counterparty?: Types.PubKeyHex | 'self' | 'anyone'
      forSelf?: Types.BooleanDefaultFalse
      seekPermission?: Types.BooleanDefaultTrue
    },
    originator?: Types.OriginatorDomainNameString
  ) => Promise<{ publicKey: Types.PubKeyHex } | Types.WalletError>

  revealCounterpartyKeyLinkage: (
    args: {
      counterparty: Types.PubKeyHex
      verifier: Types.PubKeyHex
      privilegedReason?: Types.DescriptionString5to50Characters
      privileged?: Types.BooleanDefaultFalse
    },
    originator?: Types.OriginatorDomainNameString
  ) => Promise<{
    prover: Types.PubKeyHex
    verifier: Types.PubKeyHex
    counterparty: Types.PubKeyHex
    revelationTime: Types.ISOTimestampString
    encryptedLinkage: Types.Byte[]
    encryptedLinkageProof: Types.Byte[]
  } | Types.WalletError>

  revealSpecificKeyLinkage: (
    args: {
      counterparty: Types.PubKeyHex
      verifier: Types.PubKeyHex
      protocolID: Types.ProtocolID
      keyID: Types.KeyIDStringUnder800Characters
      privilegedReason?: Types.DescriptionString5to50Characters
      privileged?: Types.BooleanDefaultFalse
    },
    originator?: Types.OriginatorDomainNameString
  ) => Promise<{
    prover: Types.PubKeyHex
    verifier: Types.PubKeyHex
    counterparty: Types.PubKeyHex
    protocolID: Types.ProtocolID
    keyID: Types.KeyIDStringUnder800Characters
    encryptedLinkage: Types.Byte[]
    encryptedLinkageProof: Types.Byte[]
    proofType: Types.Byte
  } | Types.WalletError>

  // Cryptography Operations
  encrypt: (
    args: {
      plaintext: Types.Byte[]
      protocolID: Types.ProtocolID
      keyID: Types.KeyIDStringUnder800Characters
      privilegedReason?: Types.DescriptionString5to50Characters
      counterparty?: Types.PubKeyHex | 'self' | 'anyone'
      privileged?: Types.BooleanDefaultFalse
      seekPermission?: Types.BooleanDefaultTrue
    },
    originator?: Types.OriginatorDomainNameString
  ) => Promise<{ ciphertext: Types.Byte[] } | Types.WalletError>

  decrypt: (
    args: {
      ciphertext: Types.Byte[]
      protocolID: Types.ProtocolID
      keyID: Types.KeyIDStringUnder800Characters
      privilegedReason?: Types.DescriptionString5to50Characters
      counterparty?: Types.PubKeyHex | 'self' | 'anyone'
      privileged?: Types.BooleanDefaultFalse
      seekPermission?: Types.BooleanDefaultTrue
    },
    originator?: Types.OriginatorDomainNameString
  ) => Promise<{ plaintext: Types.Byte[] } | Types.WalletError>

  createHmac: (
    args: {
      data: Types.Byte[]
      protocolID: Types.ProtocolID
      keyID: Types.KeyIDStringUnder800Characters
      privilegedReason?: Types.DescriptionString5to50Characters
      counterparty?: Types.PubKeyHex | 'self' | 'anyone'
      privileged?: Types.BooleanDefaultFalse
      seekPermission?: Types.BooleanDefaultTrue
    },
    originator?: Types.OriginatorDomainNameString
  ) => Promise<{ hmac: Types.Byte[] } | Types.WalletError>

  verifyHmac: (
    args: {
      data: Types.Byte[]
      hmac: Types.Byte[]
      protocolID: Types.ProtocolID
      keyID: Types.KeyIDStringUnder800Characters
      privilegedReason?: Types.DescriptionString5to50Characters
      counterparty?: Types.PubKeyHex | 'self' | 'anyone'
      privileged?: Types.BooleanDefaultFalse
      seekPermission?: Types.BooleanDefaultTrue
    },
    originator?: Types.OriginatorDomainNameString
  ) => Promise<{ valid: true } | Types.WalletError>

  createSignature: (
    args: {
      data?: Types.Byte[]
      hashToDirectlySign?: Types.Byte[]
      protocolID: Types.ProtocolID
      keyID: Types.KeyIDStringUnder800Characters
      privilegedReason?: Types.DescriptionString5to50Characters
      counterparty?: Types.PubKeyHex | 'self' | 'anyone'
      privileged?: Types.BooleanDefaultFalse
      seekPermission?: Types.BooleanDefaultTrue
    },
    originator?: Types.OriginatorDomainNameString
  ) => Promise<{ signature: Types.Byte[] } | Types.WalletError>

  verifySignature: (
    args: {
      data?: Types.Byte[]
      hashToDirectlyVerify?: Types.Byte[]
      signature: Types.Byte[]
      protocolID: Types.ProtocolID
      keyID: Types.KeyIDStringUnder800Characters
      privilegedReason?: Types.DescriptionString5to50Characters
      counterparty?: Types.PubKeyHex | 'self' | 'anyone'
      forSelf?: Types.BooleanDefaultFalse
      privileged?: Types.BooleanDefaultFalse
      seekPermission?: Types.BooleanDefaultTrue
    },
    originator?: Types.OriginatorDomainNameString
  ) => Promise<{ valid: true } | Types.WalletError>

  // Identity Certificate Management
  acquireCertificate: (
    args: {
      type: Types.Base64String
      certifier: Types.PubKeyHex
      acquisitionProtocol: 'direct' | 'issuance'
      fields: Record<Types.CertificateFieldNameUnder50Characters, string>
      serialNumber?: Types.Base64String
      revocationOutpoint?: Types.OutpointString
      signature?: Types.HexString
      certifierUrl?: string
      keyringRevealer?: Types.PubKeyHex | 'certifier'
      keyringForSubject?: Record<
        Types.CertificateFieldNameUnder50Characters,
        Types.Base64String
      >
      privileged?: Types.BooleanDefaultFalse
      privilegedReason?: Types.DescriptionString5to50Characters
    },
    originator?: Types.OriginatorDomainNameString
  ) => Promise<Types.Certificate | Types.WalletError>

  listCertificates: (
    args: {
      certifiers: Types.PubKeyHex[]
      types: Types.Base64String[]
      limit?: Types.PositiveIntegerDefault10Max10000
      offset?: Types.PositiveIntegerOrZero
      privileged?: Types.BooleanDefaultFalse
      privilegedReason?: Types.DescriptionString5to50Characters
    },
    originator?: Types.OriginatorDomainNameString
  ) => Promise<{
    totalCertificates: Types.PositiveIntegerOrZero
    certificates: Types.Certificate[]
  } | Types.WalletError>

  proveCertificate: (
    args: {
      certificate: Types.Certificate
      fieldsToReveal: Types.CertificateFieldNameUnder50Characters[]
      verifier: Types.PubKeyHex
      privileged?: Types.BooleanDefaultFalse
      privilegedReason?: Types.DescriptionString5to50Characters
    },
    originator?: Types.OriginatorDomainNameString
  ) => Promise<{
    keyringForVerifier: Record<
      Types.CertificateFieldNameUnder50Characters,
      Types.Base64String
    >
  } | Types.WalletError>

  relinquishCertificate: (
    args: {
      type: Types.Base64String
      serialNumber: Types.Base64String
      certifier: Types.PubKeyHex
    },
    originator?: Types.OriginatorDomainNameString
  ) => Promise<{ relinquished: true } | Types.WalletError>

  discoverByIdentityKey: (
    args: {
      identityKey: Types.PubKeyHex
      limit?: Types.PositiveIntegerDefault10Max10000
      offset?: Types.PositiveIntegerOrZero
      seekPermission?: Types.BooleanDefaultTrue
    },
    originator?: Types.OriginatorDomainNameString
  ) => Promise<{
    totalCertificates: Types.PositiveIntegerOrZero
    certificates: Array<
      Types.Certificate & {
        certifierInfo: Types.CertifierInfo
        publiclyRevealedKeyring: Record<
          Types.CertificateFieldNameUnder50Characters,
          Types.Base64String
        >
        decryptedFields: Record<Types.CertificateFieldNameUnder50Characters, string>
      }
    >
  } | Types.WalletError>

  discoverByAttributes: (
    args: {
      attributes: Record<Types.CertificateFieldNameUnder50Characters, string>
      limit?: Types.PositiveIntegerDefault10Max10000
      offset?: Types.PositiveIntegerOrZero
      seekPermission?: Types.BooleanDefaultTrue
    },
    originator?: Types.OriginatorDomainNameString
  ) => Promise<{
    totalCertificates: Types.PositiveIntegerOrZero
    certificates: Array<
      Types.Certificate & {
        certifierInfo: Types.CertifierInfo
        publiclyRevealedKeyring: Record<
          Types.CertificateFieldNameUnder50Characters,
          Types.Base64String
        >
        decryptedFields: Record<Types.CertificateFieldNameUnder50Characters, string>
      }
    >
  } | Types.WalletError>

  // Authentication & Network
  isAuthenticated: (
    args: {},
    originator?: Types.OriginatorDomainNameString
  ) => Promise<{ authenticated: boolean } | Types.WalletError>

  waitForAuthentication: (
    args: {},
    originator?: Types.OriginatorDomainNameString
  ) => Promise<{ authenticated: true } | Types.WalletError>

  getHeight: (
    args: {},
    originator?: Types.OriginatorDomainNameString
  ) => Promise<{ height: Types.PositiveInteger } | Types.WalletError>

  getHeaderForHeight: (
    args: { height: Types.PositiveInteger },
    originator?: Types.OriginatorDomainNameString
  ) => Promise<{ header: Types.HexString } | Types.WalletError>

  getNetwork: (
    args: {},
    originator?: Types.OriginatorDomainNameString
  ) => Promise<{ network: Types.Network } | Types.WalletError>

  getVersion: (
    args: {},
    originator?: Types.OriginatorDomainNameString
  ) => Promise<{ version: Types.VersionString7To30Characters } | Types.WalletError>
}