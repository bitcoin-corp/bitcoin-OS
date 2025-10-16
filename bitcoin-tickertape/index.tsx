// Bitcoin Tickertape - Universal ticker component for Bitcoin ecosystem
export { default } from './components/TickerTape';
export { default as TickerTape } from './components/TickerTape';

// Types
export interface TickerData {
  ticker: string;
  price: number;
  change24h: number;
  volume: number;
}

export interface TickerTapeProps {
  color?: string;
  data?: TickerData[];
}