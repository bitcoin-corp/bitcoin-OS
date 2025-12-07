/**
 * BRC-100 Type Definitions
 * Complete type system for the unified wallet interface
 */

// Basic Types
export type BooleanDefaultFalse = boolean
export type BooleanDefaultTrue = boolean
export type Byte = number // 0-255
export type PositiveIntegerOrZero = number // 0 to 2^32-1
export type PositiveInteger = number // 1 to 2^32-1
export type PositiveIntegerMax10 = number // 1-10
export type PositiveIntegerDefault10Max10000 = number // 1-10000, default 10
export type SatoshiValue = number // 1 to 2.1*10^15

// String Types
export type ISOTimestampString = string
export type HexString = string
export type TXIDHexString = HexString // 64 chars
export type OutpointString = string // <TXID>.<index>
export type PubKeyHex = HexString // 66 chars (33 bytes)
export type Base64String = string
export type OriginatorDomainNameString = string
export type DescriptionString5to50Characters = string
export type BasketStringUnder300Characters = string
export type OutputTagStringUnder300Characters = string
export type LabelStringUnder300Characters = string
export type ProtocolString5To400Characters = string
export type KeyIDStringUnder800Characters = string
export type CertificateFieldNameUnder50Characters = string
export type EntityNameStringMax100Characters = string
export type EntityIconURLStringMax500Characters = string
export type VersionString7To30Characters = string
export type ErrorCodeString10To40Characters = string
export type ErrorDescriptionString20To200Characters = string

// Binary Types
export type BEEF = Byte[]
export type AtomicBEEF = Byte[]

// Complex Types
export interface WalletError {
  status: 'error'
  code: ErrorCodeString10To40Characters
  description: ErrorDescriptionString20To200Characters
  context?: any
}

export interface TransactionInput {
  outpoint: OutpointString
  unlockingScript?: HexString
  unlockingScriptLength?: PositiveInteger
  inputDescription: DescriptionString5to50Characters
  sequenceNumber?: PositiveIntegerOrZero
}

export interface TransactionOutput {
  lockingScript: HexString
  satoshis: SatoshiValue
  outputDescription: DescriptionString5to50Characters
  basket?: BasketStringUnder300Characters
  customInstructions?: string
  tags?: OutputTagStringUnder300Characters[]
}

export interface CreateActionOptions {
  signAndProcess?: BooleanDefaultTrue
  acceptDelayedBroadcast?: BooleanDefaultTrue
  trustSelf?: 'known'
  knownTxids?: TXIDHexString[]
  returnTXIDOnly?: BooleanDefaultFalse
  noSend?: BooleanDefaultFalse
  noSendChange?: OutpointString[]
  sendWith?: TXIDHexString[]
  randomizeOutputs?: BooleanDefaultTrue
}

export interface Certificate {
  type: Base64String
  subject: PubKeyHex
  serialNumber: Base64String
  certifier: PubKeyHex
  revocationOutpoint: OutpointString
  signature: HexString
  fields: Record<CertificateFieldNameUnder50Characters, string>
}

export interface CertifierInfo {
  name: EntityNameStringMax100Characters
  iconUrl: EntityIconURLStringMax500Characters
  description: DescriptionString5to50Characters
  trust: PositiveIntegerMax10
}

export type SecurityLevel = 0 | 1 | 2
export type ProtocolID = [SecurityLevel, ProtocolString5To400Characters]

// Action Status Types
export type ActionStatus = 'completed' | 'unprocessed' | 'sending' | 'unproven' | 'unsigned' | 'nosend' | 'nonfinal'

// Output Protocol Types
export type OutputProtocol = 'wallet payment' | 'basket insertion'

// Network Types
export type Network = 'mainnet' | 'testnet'