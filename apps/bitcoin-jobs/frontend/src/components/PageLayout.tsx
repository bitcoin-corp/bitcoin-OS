import React from 'react';
import Footer from './Footer';
import './PageLayout.css';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  className = '', 
  title,
  description 
}) => {
  return (
    <div className={`page-layout ${className}`}>
      {title && (
        <div className="page-header">
          <div className="page-header-content">
            <h1 className="page-title">{title}</h1>
            {description && <p className="page-description">{description}</p>}
          </div>
        </div>
      )}
      
      <main className="page-main">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default PageLayout;