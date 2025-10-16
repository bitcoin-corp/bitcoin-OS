# Bitcoin Tickertape Examples

## Basic Usage

```tsx
import TickerTape from 'bitcoin-tickertape';

function App() {
  return (
    <div>
      <TickerTape />
      {/* Your app content */}
    </div>
  );
}
```

## Custom Data

```tsx
import { TickerTape, TickerData } from 'bitcoin-tickertape';

const customData: TickerData[] = [
  { ticker: '$BTC', price: 45000, change24h: 2.5, volume: 15000000 },
  { ticker: '$ETH', price: 3200, change24h: -1.2, volume: 8500000 },
  { ticker: '$bDNS', price: 125.50, change24h: 8.7, volume: 2450000 },
];

function App() {
  return (
    <TickerTape 
      data={customData}
      color="linear-gradient(90deg, #f7931a 0%, #ff6b35 100%)"
    />
  );
}
```

## Custom Navigation

```tsx
import TickerTape from 'bitcoin-tickertape';

const customLinks = [
  { href: '/trading', label: 'Trading', highlight: true },
  { href: '/portfolio', label: 'Portfolio' },
  { href: 'https://bitcoinapps.store', label: 'Apps', external: true },
];

function App() {
  return (
    <TickerTape 
      navigationLinks={customLinks}
      color="linear-gradient(90deg, #10b981 0%, #059669 100%)"
    />
  );
}
```

## No Navigation

```tsx
import TickerTape from 'bitcoin-tickertape';

function App() {
  return (
    <TickerTape 
      showNavigation={false}
      color="linear-gradient(90deg, #1f1f23 0%, #2d2d30 100%)"
    />
  );
}
```

## Real-time Data Integration

```tsx
import { useState, useEffect } from 'react';
import { TickerTape, TickerData } from 'bitcoin-tickertape';

function App() {
  const [liveData, setLiveData] = useState<TickerData[]>([]);

  useEffect(() => {
    // Fetch live data from your API
    const fetchData = async () => {
      const response = await fetch('/api/ticker-data');
      const data = await response.json();
      setLiveData(data);
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <TickerTape 
      data={liveData}
      color="linear-gradient(90deg, #A855F7 0%, #3B82F6 100%)"
    />
  );
}
```

## Theme Presets

```tsx
// Bitcoin Orange Theme
<TickerTape color="linear-gradient(90deg, #f7931a 0%, #ff6b35 100%)" />

// Success Green Theme  
<TickerTape color="linear-gradient(90deg, #10b981 0%, #059669 100%)" />

// Dark Theme
<TickerTape color="linear-gradient(90deg, #1f1f23 0%, #2d2d30 100%)" />

// Purple-Blue Theme (Default)
<TickerTape color="linear-gradient(90deg, #A855F7 0%, #3B82F6 100%)" />
```