'use client';

export default function TwitterIsStupid() {
  return (
    <div style={{
      margin: 0,
      padding: 0,
      background: '#000',
      color: '#fff',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: '15vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      textAlign: 'center',
      position: 'relative'
    }}>
      <h1 style={{
        fontSize: '96px',
        fontWeight: 900,
        margin: '0 0 30px 0',
        letterSpacing: '-2px'
      }}>
        TWITTER IS STUPID
      </h1>
      <p style={{
        fontSize: '48px',
        fontWeight: 800,
        margin: 0,
        textTransform: 'uppercase',
        letterSpacing: '2px'
      }}>
        Let's Build Something Cool
      </p>
      <p style={{
        position: 'absolute',
        bottom: '120px',
        fontSize: '24px',
        fontWeight: 600,
        opacity: 0.8
      }}>
        Bitcoin OS
      </p>
    </div>
  );
}