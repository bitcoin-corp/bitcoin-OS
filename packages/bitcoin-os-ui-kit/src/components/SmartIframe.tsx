import React, { useState, useRef, useCallback } from 'react';
import { cn } from '../utils/cn';

interface SmartIframeProps {
  src: string;
  title: string;
  className?: string;
  onError?: () => void;
  fallbackMessage?: string;
}

export const SmartIframe: React.FC<SmartIframeProps> = ({
  src,
  title,
  className,
  onError,
  fallbackMessage = "This app cannot be embedded. Click below to open in a new tab."
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    try {
      // Try to access the iframe content to detect CORS issues
      const iframe = iframeRef.current;
      if (iframe?.contentWindow) {
        // This will throw an error if CORS blocks access
        iframe.contentWindow.location.href;
      }
    } catch (error) {
      // CORS error detected
      console.log(`CORS restriction detected for ${src}`);
      setHasError(true);
      onError?.();
    }
  }, [src, onError]);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  }, [onError]);

  const openInNewTab = useCallback(() => {
    window.open(src, '_blank');
  }, [src]);

  if (hasError) {
    return (
      <div className={cn(
        'flex-1 w-full h-full flex flex-col items-center justify-center',
        'bg-gray-50 p-8 text-center',
        className
      )}>
        <div className="max-w-md">
          <div className="text-6xl mb-4">🔒</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Cannot Embed App
          </h3>
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            {fallbackMessage}
          </p>
          <button
            onClick={openInNewTab}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Open {title} in New Tab
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex-1 w-full h-full relative', className)}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="text-4xl mb-2">⏳</div>
            <p className="text-gray-600">Loading {title}...</p>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={src}
        className="w-full h-full border-0"
        title={title}
        onLoad={handleLoad}
        onError={handleError}
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
};