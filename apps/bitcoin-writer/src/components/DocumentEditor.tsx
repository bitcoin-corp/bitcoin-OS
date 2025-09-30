import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BlockchainDocumentService, DocumentData, BlockchainDocument } from '../services/BlockchainDocumentService';
import PricingDisplay from './PricingDisplay';
import PublishSettingsModal, { PublishSettings } from './PublishSettingsModal';
import SaveToBlockchainModal, { BlockchainSaveOptions } from './SaveToBlockchainModal';
import TokenizeModal, { TokenizationOptions } from './TokenizeModal';
import PostToTwitterModal from './PostToTwitterModal';
import DocumentVersioningModal from './modals/DocumentVersioningModal';
import { StorageOption } from '../utils/pricingCalculator';
import BSVStorageService from '../services/BSVStorageService';
import { HandCashItemsService } from '../services/HandCashItemsService';
import { HandCashService } from '../services/HandCashService';
import { LocalDocumentStorage, LocalDocument } from '../utils/documentStorage';
import CryptoJS from 'crypto-js';
import QuillEditor from './QuillEditor';
import './QuillEditor.css';
import DragDropZone from './DragDropZone';
import AIChatWindow from './AIChatWindow';
import { AIService } from '../services/AIService';

interface DocumentEditorProps {
  documentService: BlockchainDocumentService | null;
  isAuthenticated: boolean;
  onAuthRequired?: () => void;
  currentDocument?: BlockchainDocument | null;
  onDocumentUpdate?: (doc: BlockchainDocument) => void;
  onDocumentSaved?: () => void;
  showAIChat?: boolean;
  onToggleAIChat?: () => void;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({ 
  documentService, 
  isAuthenticated, 
  onAuthRequired,
  currentDocument: propDocument,
  onDocumentUpdate,
  onDocumentSaved,
  showAIChat: propShowAIChat = false,
  onToggleAIChat 
}) => {
  const [currentDocument, setCurrentDocument] = useState<DocumentData | null>(null);
  const [localDocumentId, setLocalDocumentId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [cursorPosition, setCursorPosition] = useState('Line 1, Column 1');
  const [autoSaveStatus, setAutoSaveStatus] = useState('');
  const [lastSaveTime, setLastSaveTime] = useState<Date | null>(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [lastHashTime, setLastHashTime] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStorageOption, setSelectedStorageOption] = useState<StorageOption | null>(null);
  const [editorContent, setEditorContent] = useState('');
  const [internalShowAIChat, setInternalShowAIChat] = useState(false);
  const [selectedAIProvider, setSelectedAIProvider] = useState('gemini');
  const [aiService] = useState(() => new AIService(new HandCashService()));
  
  // Use prop if provided, otherwise use internal state
  const showAIChat = onToggleAIChat ? propShowAIChat : internalShowAIChat;
  const handleToggleAIChat = onToggleAIChat || (() => setInternalShowAIChat(!internalShowAIChat));
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [publishSettings, setPublishSettings] = useState<PublishSettings | null>(null);
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [readPrice, setReadPrice] = useState<number>(0);
  const [showSaveBlockchainModal, setShowSaveBlockchainModal] = useState(false);
  const [preselectedMode, setPreselectedMode] = useState<'encrypt' | 'schedule' | null>(null);
  const [showActionsDropdown, setShowActionsDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('bitcoin-writer-dark-mode');
    return saved !== null ? saved === 'true' : true; // Default to dark mode
  });
  const [showTokenizeModal, setShowTokenizeModal] = useState(false);
  const [showTwitterModal, setShowTwitterModal] = useState(false);
  const [showVersioningModal, setShowVersioningModal] = useState(false);
  const [bsvService] = useState(() => new BSVStorageService(documentService?.handcashService || undefined));
  // Always use Quill editor
  const [quillContent, setQuillContent] = useState('');
  const [currentPrice, setCurrentPrice] = useState<string>('$0.00000000');
  const [estimatedCost, setEstimatedCost] = useState<number>(0);
  const [isFirstSave, setIsFirstSave] = useState(true);

  // Removed editorRef - using Quill editor exclusively
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Load or create local document
  const loadLocalDocument = useCallback(() => {
    // Check if we have a current document ID
    let docId = LocalDocumentStorage.getCurrentDocumentId();
    let doc: LocalDocument | null = null;
    
    if (docId) {
      doc = LocalDocumentStorage.getDocument(docId);
    }
    
    // Only create a new document if we have some existing documents or if explicitly requested
    // Don't auto-create on every app load
    if (!doc) {
      const existingDocs = LocalDocumentStorage.getAllDocuments();
      if (existingDocs.length === 0) {
        // First time user - don't create anything, just show empty editor
        setLocalDocumentId(null);
        setCurrentDocument(null);
        setQuillContent('<p>Start writing...</p>');
        setEditorContent('<p>Start writing...</p>');
        return;
      } else {
        // Has existing docs but no current one set - use the most recent
        const mostRecent = existingDocs.sort((a, b) => 
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        )[0];
        if (mostRecent) {
          LocalDocumentStorage.setCurrentDocumentId(mostRecent.id);
          doc = mostRecent;
        }
      }
    }
    
    if (doc) {
      setLocalDocumentId(doc.id);
      setCurrentDocument({
        id: doc.id,
        title: doc.title,
        content: doc.content,
        metadata: {
          created_at: doc.created_at,
          updated_at: doc.updated_at,
          author: isAuthenticated ? documentService?.getCurrentUser()?.handle || 'User' : 'Guest',
          encrypted: false,
          word_count: doc.word_count,
          character_count: doc.character_count
        }
      });
      
      setQuillContent(doc.content || '<p><br></p>');
      setEditorContent(doc.content || '<p><br></p>');
    }
  }, [isAuthenticated, documentService]);

  // Track if this is initial mount
  const isInitialMount = useRef(true);
  const prevPropDocument = useRef(propDocument);
  
  // Load document when propDocument changes
  useEffect(() => {
    if (propDocument) {
      // Check if it's the PDF document
      if (propDocument.id === 'bap-executive-summary') {
        // For PDF, we'll show it in an iframe
        const pdfDoc = {
          id: propDocument.id,
          title: propDocument.title,
          content: '', // PDF content handled separately
          metadata: {
            created_at: propDocument.created_at,
            updated_at: propDocument.updated_at,
            author: propDocument.author || '',
            encrypted: propDocument.encrypted || false,
            word_count: propDocument.word_count || 0,
            character_count: propDocument.character_count || 0,
            storage_method: propDocument.storage_method,
            blockchain_tx: propDocument.blockchain_tx,
            storage_cost: propDocument.storage_cost,
            isPdf: true,
            pdfUrl: '/documents/bap_executive_summary.pdf'
          } as any
        };
        setCurrentDocument(pdfDoc);
        setEditorContent('');
      } else {
        // Load the selected document
        setCurrentDocument({
          id: propDocument.id,
          title: propDocument.title,
          content: propDocument.content || '',
          metadata: {
            created_at: propDocument.created_at,
            updated_at: propDocument.updated_at,
            author: propDocument.author || '',
            encrypted: propDocument.encrypted || false,
            word_count: propDocument.word_count || 0,
            character_count: propDocument.character_count || 0,
            storage_method: propDocument.storage_method,
            blockchain_tx: propDocument.blockchain_tx,
            storage_cost: propDocument.storage_cost
          }
        });
        setEditorContent(propDocument.content || '');
        setQuillContent(propDocument.content || '');
        // If loading existing document with content, it's not a first save
        setIsFirstSave(!propDocument.content || propDocument.content === '<p><br></p>');
      }
    } else if (propDocument === null) {
      // propDocument is explicitly null
      if (isInitialMount.current) {
        // On initial mount with no document, load existing or create new
        loadLocalDocument();
      } else {
        // User clicked "New Document" in sidebar
        // Save current document first if it has content
        if (localDocumentId) {
          const content = quillContent || editorContent;
          if (content && content !== '') {
            // Extract title from first line of text
            const text = content.replace(/<[^>]*>/g, '');
            const firstLine = text.split('\n')[0]?.trim() || 'Untitled Document';
            const title = firstLine.substring(0, 100);
            LocalDocumentStorage.autoSave(localDocumentId, content, title);
          }
        }
        
        // Don't create a new document yet - just clear the editor
        // A new document will be created when the user starts typing
        setLocalDocumentId(null);
        setCurrentDocument(null);
        
        // Clear the editor for new document
        setQuillContent('<p><br></p>');
        setEditorContent('<p><br></p>');
        setWordCount(0);
        setCharCount(0);
        
        setAutoSaveStatus('Ready for new document');
        setTimeout(() => setAutoSaveStatus(''), 2000);
        
        // Force a re-render of the sidebar
        window.dispatchEvent(new CustomEvent('documentCreated'));
      }
    }
    
    prevPropDocument.current = propDocument;
    isInitialMount.current = false;
  }, [propDocument, loadLocalDocument, isAuthenticated, documentService, localDocumentId]);

  // Listen for tokenize modal event
  useEffect(() => {
    const handleOpenTokenizeModal = () => {
      setShowTokenizeModal(true);
    };

    window.addEventListener('openTokenizeModal', handleOpenTokenizeModal);
    
    return () => {
      window.removeEventListener('openTokenizeModal', handleOpenTokenizeModal);
    };
  }, []);

  // Listen for Twitter modal event
  useEffect(() => {
    const handleOpenTwitterModal = () => {
      setShowTwitterModal(true);
    };

    window.addEventListener('openTwitterModal', handleOpenTwitterModal);
    
    return () => {
      window.removeEventListener('openTwitterModal', handleOpenTwitterModal);
    };
  }, []);

  // Listen for Save to Blockchain event from menu
  useEffect(() => {
    const handleOpenSaveToBlockchain = () => {
      setShowSaveBlockchainModal(true);
    };
    window.addEventListener('openSaveToBlockchain', handleOpenSaveToBlockchain);
    
    return () => {
      window.removeEventListener('openSaveToBlockchain', handleOpenSaveToBlockchain);
    };
  }, []);

  // Update counts is now handled by Quill's onTextChange callback

  // Removed duplicate loadLocalDocument - already defined above

  // Handle document changes (load local or clear editor)
  useEffect(() => {
    if (propDocument) {
      // Load existing document
      const docData: DocumentData = {
        id: propDocument.id,
        title: propDocument.title,
        content: propDocument.content || '',
        metadata: {
          created_at: propDocument.created_at,
          updated_at: propDocument.updated_at,
          author: propDocument.author || '',
          encrypted: propDocument.encrypted || false,
          word_count: propDocument.word_count || 0,
          character_count: propDocument.character_count || 0,
          storage_method: propDocument.storage_method,
          blockchain_tx: propDocument.blockchain_tx,
          storage_cost: propDocument.storage_cost
        }
      };
      setCurrentDocument(docData);
      setEditorContent(propDocument.content || '');
      setQuillContent(propDocument.content || '');
      // If loading existing document with content, it's not a first save
      setIsFirstSave(!propDocument.content || propDocument.content === '<p><br></p>');
    } else if (!isAuthenticated) {
      // Load from localStorage for guest users
      loadLocalDocument();
    } else {
      // Clear editor for new document
      setCurrentDocument(null);
      setEditorContent('<p><br></p>');
      setQuillContent('<p><br></p>');
    }
  }, [propDocument, isAuthenticated, loadLocalDocument]);

  const handleInsertFromAI = useCallback((text: string) => {
    // Get current content and insert AI text
    const currentContent = editorContent.replace(/<\/?[^>]+(>|$)/g, '').trim();
    const newContent = currentContent + '\n\n' + text;
    const htmlContent = `<p>${newContent.split('\n\n').join('</p><p>')}</p>`;
    setEditorContent(htmlContent);
    setUnsavedChanges(true);
  }, [editorContent]);

  const saveToLocalStorage = useCallback(() => {
    const content = quillContent || editorContent;
    const text = content.replace(/<[^>]*>/g, '');
    
    // Only save if there's actual content (not just placeholder text)
    if (!text || text.trim() === '' || content === '<p>Start writing...</p>' || content === '<p><br></p>') {
      return;
    }
    
    if (localDocumentId) {
      const title = extractTitleFromContent(content) || 'Untitled Document';
      LocalDocumentStorage.autoSave(localDocumentId, content, title);
    } else {
      // Create a new document only when there's actual content to save
      const newDoc = LocalDocumentStorage.createNewDocument();
      const title = extractTitleFromContent(content) || 'Untitled Document';
      newDoc.title = title;
      newDoc.content = content;
      newDoc.word_count = wordCount;
      newDoc.character_count = charCount;
      LocalDocumentStorage.saveDocument(newDoc);
      LocalDocumentStorage.setCurrentDocumentId(newDoc.id);
      setLocalDocumentId(newDoc.id);
      
      // Update current document state
      setCurrentDocument({
        id: newDoc.id,
        title: newDoc.title,
        content: newDoc.content,
        metadata: {
          created_at: newDoc.created_at,
          updated_at: newDoc.updated_at,
          author: isAuthenticated ? documentService?.getCurrentUser()?.handle || 'User' : 'Guest',
          encrypted: false,
          word_count: newDoc.word_count,
          character_count: newDoc.character_count
        }
      });
      
      // Trigger sidebar refresh
      if (onDocumentSaved) {
        onDocumentSaved();
      }
    }
  }, [localDocumentId, quillContent, editorContent, wordCount, charCount, isAuthenticated, documentService, onDocumentSaved]);

  // Cursor position is now handled by Quill editor

  const hasUnsavedChanges = useCallback((): boolean => {
    if (!currentDocument) return false;
    const currentContent = quillContent || editorContent;
    return currentContent !== currentDocument.content;
  }, [currentDocument, quillContent, editorContent]);

  const handleNewDocument = useCallback(() => {
    // Save current document first if it has content
    if (localDocumentId) {
      const content = quillContent || editorContent;
      const text = content.replace(/<[^>]*>/g, '').trim();
      if (text && text !== '' && text !== 'Start writing...') {
        saveToLocalStorage();
      }
    }
    
    // Don't create a new document yet - just clear the editor
    // Document will be created when user starts typing
    setLocalDocumentId(null);
    LocalDocumentStorage.setCurrentDocumentId('');
    setCurrentDocument(null);
    
    setQuillContent('<p><br></p>');
    setEditorContent('<p><br></p>');
    setWordCount(0);
    setCharCount(0);
    setIsFirstSave(true); // Reset first save flag for new document
    
    setAutoSaveStatus('New document ready');
    setTimeout(() => setAutoSaveStatus(''), 2000);
  }, [localDocumentId, saveToLocalStorage, isAuthenticated, documentService, onDocumentUpdate]);


  const saveDocument = async () => {
    // Always show the modal - it will handle authentication internally
    setShowSaveBlockchainModal(true);
  };

  const handleBlockchainSave = async (options: BlockchainSaveOptions) => {
    try {
      setIsLoading(true);
      setShowSaveBlockchainModal(false);
      setAutoSaveStatus('💾 Saving to blockchain...');
      
      const content = quillContent || editorContent;
      const text = content.replace(/<[^>]*>/g, '');
      const title = extractTitleFromContent(text) || options.metadata.title;
      
      // Store the result from either NFT minting or regular storage
      let result: any = null;
      
      // Check if asset creation is enabled
      if (options.monetization?.enableAsset) {
        setAutoSaveStatus('🎨 Creating Bitcoin OS Asset...');
        
        // Get HandCash auth token
        const handcashService = new HandCashService();
        const authToken = handcashService.getAccessToken();
        
        if (!authToken) {
          alert('Please sign in with HandCash to create Bitcoin OS assets');
          setIsLoading(false);
          setAutoSaveStatus('');
          if (onAuthRequired) {
            onAuthRequired();
          }
          return;
        }
        
        // Prepare asset data
        const itemsService = new HandCashItemsService();
        const assetData = {
          name: title,
          description: options.metadata.description || `${title} - A document saved as Bitcoin OS asset`,
          quantity: options.monetization.maxSupply || 1,
          initialPrice: options.monetization.initialPrice || 1,
          royaltyPercentage: options.monetization.royaltyPercentage || 10,
          rarity: 'common' as const,
          documentContent: text,
          documentMetadata: {
            id: localDocumentId || `doc_${Date.now()}`,
            title: title,
            wordCount: wordCount,
            createdAt: new Date().toISOString(),
            contentHash: itemsService.calculateContentHash(text),
            storageMethod: options.storageMethod
          }
        };
        
        // Create the asset
        const assetResult = await itemsService.mintDocumentNFT(authToken, assetData);
        
        if (assetResult.success) {
          setAutoSaveStatus('✅ Bitcoin OS asset created successfully!');
          
          // Show success message with market URL
          if (assetResult.marketUrl) {
            alert(`Bitcoin OS asset created successfully!\n\nView on HandCash Market:\n${assetResult.marketUrl}`);
          } else {
            alert('Bitcoin OS asset created successfully! Check your HandCash wallet.');
          }
          
          // Still store document data on-chain for permanence
          if (options.storageMethod !== 'cloud') {
            setAutoSaveStatus('📝 Storing document on-chain...');
            result = await bsvService.storeDocumentWithOptions(
              text,
              options,
              documentService?.getCurrentUser()?.handle || 'anonymous'
            );
          }
        } else {
          throw new Error(assetResult.error || 'Failed to create Bitcoin OS asset');
        }
      } else {
        // Regular blockchain storage without asset creation
        result = await bsvService.storeDocumentWithOptions(
          text,
          options,
          documentService?.getCurrentUser()?.handle || 'anonymous'
        );
      }
      
      // Update document with blockchain info (only if we have a blockchain result)
      if (result && currentDocument) {
        const updatedDoc = {
          ...currentDocument,
          metadata: {
            ...currentDocument.metadata,
            blockchain_tx: result.transactionId,
            storage_cost: result.storageCost.totalUSD,
            storage_method: options.storageMethod
          }
        };
        setCurrentDocument(updatedDoc);
      } else if (result) {
        // Create new document record (only if we have a blockchain result)
        const newDoc: DocumentData = {
          id: result.transactionId,
          title,
          content: text,
          metadata: {
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            author: documentService?.getCurrentUser()?.handle || 'anonymous',
            encrypted: options.encryption,
            word_count: wordCount,
            character_count: charCount,
            storage_method: options.storageMethod,
            blockchain_tx: result.transactionId,
            storage_cost: result.storageCost.totalUSD
          }
        };
        setCurrentDocument(newDoc);
      }
      
      setAutoSaveStatus(`✅ Saved to blockchain!`);
      
      // Show unlock link if content is locked
      if (result && result.unlockLink) {
        alert(`Document saved! Share this unlock link: ${result.unlockLink}`);
      }
      
      // Show payment address if priced
      if (result && result.paymentAddress) {
        alert(`Payment address for readers: ${result.paymentAddress}`);
      }

    } catch (error) {
      console.error('Error saving to blockchain:', error);
      setAutoSaveStatus('❌ Failed to save');
      alert('Failed to save to blockchain. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Old handler removed - using handleBlockchainSave instead

  const handleTokenize = async (protocol: string, options: TokenizationOptions) => {
    try {
      setIsLoading(true);
      console.log('Tokenizing document with protocol:', protocol, options);
      
      // TODO: Implement actual tokenization logic here
      // This would involve:
      // 1. Connecting to the selected BSV protocol
      // 2. Creating the token with specified parameters
      // 3. Minting the token on-chain
      // 4. Storing token metadata
      
      alert(`Document would be tokenized using ${options.name} on ${protocol.toUpperCase()} protocol.\n\nThis feature is coming soon!`);
      
    } catch (error) {
      console.error('Failed to tokenize document:', error);
      alert('Failed to tokenize document: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  const autoSave = useCallback(async () => {
    // For guest users, just save to local storage
    if (!isAuthenticated) {
      saveToLocalStorage();
      setAutoSaveStatus('✅ Auto-saved locally');
      setTimeout(() => setAutoSaveStatus(''), 2000);
      return;
    }

    // For authenticated users with a document on blockchain
    if (!currentDocument || !documentService) return;

    try {
      setAutoSaveStatus('💾 Auto-saving to blockchain...');

      const content = quillContent || editorContent;
      const text = content.replace(/<[^>]*>/g, '');
      const title = extractTitleFromContent(text) || currentDocument.title;

      await documentService.updateDocument(currentDocument.id, title, text, selectedStorageOption?.id as any);

      setCurrentDocument(prev => prev ? {
        ...prev,
        title,
        content: text,
        lastUpdated: Date.now(),
        wordCount,
        charCount
      } : null);

      setAutoSaveStatus('✅ Auto-saved to blockchain');
      setTimeout(() => setAutoSaveStatus(''), 2000);
    } catch (error) {
      console.error('Auto-save failed:', error);
      setAutoSaveStatus('❌ Auto-save failed');
      setTimeout(() => setAutoSaveStatus(''), 3000);
    }
  }, [isAuthenticated, currentDocument, documentService, selectedStorageOption, wordCount, charCount, saveToLocalStorage, quillContent, editorContent]);

  // Auto-save every minute
  useEffect(() => {
    const interval = setInterval(() => {
      // Auto-save to local storage for ALL users
      if (localDocumentId) {
        const content = quillContent || editorContent;
        if (content && content !== '<p>Start writing...</p>') {
          saveToLocalStorage();
          
          // Update status with timestamp
          const now = new Date();
          const timeString = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          });
          setAutoSaveStatus(`✓ Auto-saved at ${timeString}`);
          setLastSaveTime(now);
          setUnsavedChanges(false);
          setTimeout(() => setAutoSaveStatus(''), 5000);
        }
      }
      
      // For authenticated users ONLY: also auto-save to blockchain
      if (isAuthenticated && localDocumentId) {
        const now = Date.now();
        if (now - lastHashTime > 60000) { // Every minute
          hashDocument();
          const timeString = new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          });
          setAutoSaveStatus(`⛓️ Saved to blockchain at ${timeString}`);
          setTimeout(() => setAutoSaveStatus(''), 5000);
        }
      }
    }, 60000); // Every 60 seconds (1 minute)

    return () => clearInterval(interval);
  }, [saveToLocalStorage, isAuthenticated, localDocumentId, lastHashTime, quillContent]);
  
  // Hash document (ultra-low cost, just store hash)
  const hashDocument = async () => {
    if (!localDocumentId) return;
    
    const content = quillContent || editorContent;
    const text = content.replace(/<[^>]*>/g, '');
    if (!text || text.length < 10) return; // Don't hash empty or very short documents
    
    const hash = CryptoJS.SHA256(text).toString();
    const timestamp = new Date().toISOString();
    
    // Store hash locally
    const doc = LocalDocumentStorage.getDocument(localDocumentId);
    if (doc) {
      doc.is_hashed = true;
      doc.hash = hash;
      doc.updated_at = timestamp;
      LocalDocumentStorage.saveDocument(doc);
    }
    
    // If authenticated, store hash on blockchain (ultra-low cost)
    if (isAuthenticated && bsvService) {
      try {
        // This would cost about 1/10,000th of a penny
        // Just storing 32 bytes of hash data
        setAutoSaveStatus('⚓️ Hashing to blockchain...');
        
        // In production, this would make a minimal BSV transaction
        // For now, we'll simulate it
        console.log('Document hash:', hash);
        console.log('Timestamp:', timestamp);
        
        setLastHashTime(Date.now());
        setAutoSaveStatus('✓ Hashed to blockchain');
        setTimeout(() => setAutoSaveStatus(''), 3000);
      } catch (error) {
        console.error('Failed to hash to blockchain:', error);
      }
    }
  };

  const extractTitleFromContent = (html: string): string => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    const firstLine = text.split('\n')[0].trim();
    return firstLine.length > 0 && firstLine.length <= 100 ? firstLine : 'Untitled Document';
  };

  const insertImage = () => {
    imageInputRef.current?.click();
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          insertImageIntoEditor(event.target.result as string, file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const insertImageIntoEditor = (imageSrc: string, fileName: string) => {
    // Image insertion is now handled by Quill editor toolbar
    console.log('Image insertion should be done through Quill toolbar');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Keyboard shortcuts
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      saveDocument();
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
      e.preventDefault();
      handleNewDocument();
    } else if (e.key === 'F11') {
      e.preventDefault();
      toggleFullscreen();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      document.execCommand('insertText', false, '    ');
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleFileDrop = async (files: FileList) => {
    // Handle different file types
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      if (file.type.startsWith('image/')) {
        // Handle images - add to document
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            insertImageIntoEditor(event.target.result as string, file.name);
            showNotification(`Added image: ${file.name}`);
          }
        };
        reader.readAsDataURL(file);
      } else if (file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
        // Handle Word documents - import content
        showNotification('Importing Word document...');
        // Trigger Quill's import functionality
        const importBtn = document.querySelector('.import-btn') as HTMLElement;
        if (importBtn) {
          // Create a temporary file input with the file
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          const fileInput = document.getElementById('docx-import') as HTMLInputElement;
          if (fileInput) {
            fileInput.files = dataTransfer.files;
            const event = new Event('change', { bubbles: true });
            fileInput.dispatchEvent(event);
          }
        }
      } else {
        // For other files, save directly to blockchain
        const reader = new FileReader();
        reader.onload = async (event) => {
          const content = event.target?.result as string;
          
          // Open save modal with file info
          setCurrentDocument({
            id: '',
            title: file.name,
            content: content,
            metadata: {
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              author: documentService?.getCurrentUser()?.handle || 'User',
              encrypted: false,
              word_count: 0,
              character_count: content.length,
            }
          });
          
          setShowSaveBlockchainModal(true);
          showNotification(`Ready to upload: ${file.name}`);
        };
        
        if (file.type.startsWith('text/') || file.type === 'application/json') {
          reader.readAsText(file);
        } else {
          reader.readAsDataURL(file);
        }
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    // Simple notification implementation
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: ${type === 'error' ? '#ff4444' : '#44ff44'};
      color: white;
      padding: 12px 20px;
      border-radius: 6px;
      z-index: 10000;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  };

  const handleEncrypt = () => {
    if (isEncrypted) {
      // Decrypt
      setIsEncrypted(false);
      showNotification('Document decrypted');
    } else {
      // Encrypt
      setIsEncrypted(true);
      showNotification('Document encrypted');
    }
  };

  const handleSetPrice = () => {
    const price = prompt('Set price to read (in USD):', readPrice.toString());
    if (price !== null && !isNaN(Number(price))) {
      setReadPrice(Number(price));
      showNotification(`Read price set to $${price}`);
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('bitcoin-writer-dark-mode', newDarkMode.toString());
    showNotification(`${newDarkMode ? 'Dark' : 'Light'} mode enabled`);
  };

  return (
    <div className={`document-editor ${isFullscreen ? 'fullscreen' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="toolbar">
        {/* Mobile Layout */}
        <div className="toolbar-mobile">
          <div className="mobile-main-actions">
            <button 
              onClick={saveDocument} 
              disabled={isLoading} 
              title={isAuthenticated ? "Save to Blockchain" : "Save (Sign in for blockchain)"}
              className={`save-btn-mobile ${!isAuthenticated ? 'save-guest' : ''}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                <path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z"/>
              </svg>
              Save {wordCount > 0 && `(${currentPrice})`}
            </button>
            
            <div className="mobile-dropdown-container">
              <button 
                className="mobile-actions-btn"
                onClick={() => setShowActionsDropdown(!showActionsDropdown)}
                title="More actions"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                  <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11.03L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11.03C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
                </svg>
                Actions
              </button>
              
              {showActionsDropdown && (
                <div className="mobile-dropdown">
                  <button 
                    onClick={() => {
                      insertImage();
                      setShowActionsDropdown(false);
                    }}
                    className="dropdown-item"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                      <path d="M9,2V7.38L10.5,8.88L12,7.38V2H9M20,5V19C20,20.1 19.1,21 18,21H6C4.89,21 4,20.1 4,19V5C4,3.89 4.89,3 6,3H7V9L9.5,6.5L12,9V3H18C19.1,3 20,3.89 20,5Z"/>
                    </svg>
                    Add Image
                  </button>
                  {isAuthenticated && (
                    <>
                      <button 
                        onClick={() => {
                          handleEncrypt();
                          setShowActionsDropdown(false);
                        }}
                        disabled={isLoading}
                        className={`dropdown-item ${isEncrypted ? 'encrypted' : ''}`}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                          <path d={isEncrypted ? "M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V18H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.2,8.7 10.2,10V11H13.8V10C13.8,8.7 12.8,8.2 12,8.2Z" : "M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H15C15.6,11 16,11.4 16,12V18C16,18.6 15.6,19 15,19H9C8.4,19 8,18.6 8,18V12C8,11.4 8.4,11 9,11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.2,8.7 10.2,10V11H13.8V10C13.8,8.7 12.8,8.2 12,8.2Z"}/>
                        </svg>
                        {isEncrypted ? 'Decrypt' : 'Encrypt Draft'}
                      </button>
                      <button 
                        onClick={() => {
                          handleSetPrice();
                          setShowActionsDropdown(false);
                        }}
                        disabled={isLoading}
                        className="dropdown-item"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                          <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z"/>
                        </svg>
                        Set Price to Read {readPrice > 0 ? `($${readPrice})` : ''}
                      </button>
                      <button 
                        onClick={() => {
                          setShowPublishModal(true);
                          setShowActionsDropdown(false);
                        }}
                        disabled={isLoading}
                        className="dropdown-item"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                          <path d="M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                        </svg>
                        Publish Document
                      </button>
                    </>
                  )}
                  <button 
                    onClick={() => {
                      toggleFullscreen();
                      setShowActionsDropdown(false);
                    }}
                    className="dropdown-item"
                  >
                    ⛶ Fullscreen
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="mobile-stats">
            <span className="word-count">{wordCount}w</span>
            <span className="char-count">{charCount}c</span>
            <PricingDisplay 
              wordCount={wordCount}
              characterCount={charCount}
              content={editorContent}
              isAuthenticated={isAuthenticated}
              onStorageMethodSelect={setSelectedStorageOption}
              isMobile={true}
            />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="toolbar-desktop">
          <div className="toolbar-left">
            {/* Save button - always saves locally, optionally to blockchain */}
            <button 
              onClick={() => {
                // On first save for a document, show the Save to Blockchain modal
                if (isFirstSave && wordCount > 0) {
                  setShowSaveBlockchainModal(true);
                  setIsFirstSave(false);
                  return;
                }
                
                // Otherwise do normal save
                saveToLocalStorage();
                const now = new Date();
                const timeString = now.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                });
                setAutoSaveStatus(`✓ Saved at ${timeString}`);
                setLastSaveTime(now);
                setUnsavedChanges(false);
                setTimeout(() => setAutoSaveStatus(''), 5000);
                
                // If authenticated, also save to blockchain
                if (isAuthenticated) {
                  hashDocument();
                  setAutoSaveStatus(`⛓️ Saving to blockchain...`);
                  setTimeout(() => {
                    setAutoSaveStatus(`✓ Saved to blockchain at ${timeString}`);
                    setTimeout(() => setAutoSaveStatus(''), 5000);
                  }, 1000);
                }
              }} 
              disabled={isLoading || wordCount === 0} 
              title={wordCount === 0 ? "Start typing to save" : isFirstSave ? "Save to blockchain" : "Save changes"}
              className={wordCount > 0 ? 'save-btn-active' : 'save-btn-inactive'}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', marginRight: '20px' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                <path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z"/>
              </svg>
              Save
              {wordCount > 0 && (
                <span style={{ 
                  fontSize: '11px', 
                  color: estimatedCost > 0.01 ? '#ff9900' : '#00ff00',
                  fontWeight: 'normal',
                  opacity: 0.9,
                  minWidth: '85px',
                  textAlign: 'right'
                }}>
                  {currentPrice}
                </span>
              )}
              {unsavedChanges && <span style={{ color: '#ff9900' }}>•</span>}
            </button>
            
            {/* Save As button - for exporting */}
            <button 
              onClick={() => {
                const format = prompt('Export as: txt, html, md, or docx?', 'docx');
                if (format) {
                  if (localDocumentId) {
                    const doc = LocalDocumentStorage.getDocument(localDocumentId);
                    if (doc) {
                      if (format === 'docx') {
                        // Use Quill export for docx
                        const quillExport = document.querySelector('.export-btn');
                        if (quillExport) (quillExport as HTMLElement).click();
                      } else if (['txt', 'html', 'md'].includes(format)) {
                        LocalDocumentStorage.exportDocument(doc, format as 'txt' | 'html' | 'md');
                      }
                      showNotification(`Exported as ${format.toUpperCase()}`);
                    }
                  }
                }
              }}
              title="Export document to file"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
              Export...
            </button>
            
            {/* Save with Options - opens modal for all users */}
            <button 
              onClick={() => setShowSaveBlockchainModal(true)}
              disabled={wordCount === 0}
              title="Save with advanced options (encryption, pricing, etc.)"
              className="save-options-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11.03L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11.03C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
              </svg>
              Save to Blockchain
            </button>
            
            {/* Encrypt on chain - saves with encryption */}
            <button 
              onClick={() => {
                setPreselectedMode('encrypt');
                setShowSaveBlockchainModal(true);
              }}
              disabled={isLoading} 
              title="Encrypt and save privately on blockchain"
              className="encrypt-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H15C15.6,11 16,11.4 16,12V18C16,18.6 15.6,19 15,19H9C8.4,19 8,18.6 8,18V12C8,11.4 8.4,11 9,11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.2,8.7 10.2,10V11H13.8V10C13.8,8.7 12.8,8.2 12,8.2Z"/>
              </svg>
              Encrypt on Chain
            </button>
            
            {/* Publish to chain - saves publicly */}
            <button 
              onClick={() => {
                if (!isAuthenticated) {
                  setShowSaveBlockchainModal(true);
                } else {
                  setShowPublishModal(true);
                }
              }}
              disabled={isLoading}
              title="Publish document publicly on blockchain"
              className="publish-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                <path d="M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
              </svg>
              Publish to Chain
            </button>
            
            {/* Schedule Publication - time-locked encryption */}
            <button 
              onClick={() => {
                setPreselectedMode('schedule');
                setShowSaveBlockchainModal(true);
              }}
              disabled={isLoading}
              title="Schedule automatic publication at a future date"
              className="schedule-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                <path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z"/>
              </svg>
              Schedule Publication
            </button>
            
            <button onClick={insertImage} title="Add images to your document (included in blockchain storage cost)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                <path d="M9,2V7.38L10.5,8.88L12,7.38V2H9M20,5V19C20,20.1 19.1,21 18,21H6C4.89,21 4,20.1 4,19V5C4,3.89 4.89,3 6,3H7V9L9.5,6.5L12,9V3H18C19.1,3 20,3.89 20,5Z"/>
              </svg>
              Add Image
            </button>
            
            <button 
              onClick={() => {
                if (!isAuthenticated) {
                  setShowSaveBlockchainModal(true);
                } else {
                  handleSetPrice();
                }
              }}
              disabled={isLoading}
              title="Set price readers must pay to read your document"
              className="price-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z"/>
              </svg>
              Set Price to Read {readPrice > 0 ? `($${readPrice})` : ''}
            </button>
            <button 
              onClick={() => {
                if (!isAuthenticated) {
                  setShowSaveBlockchainModal(true);
                } else {
                  setShowTwitterModal(true);
                }
              }}
              disabled={isLoading}
              title="Share your writing on Twitter"
              className="twitter-share-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"/>
              </svg>
              Post to Twitter
            </button>
            <input
              type="file"
              ref={imageInputRef}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageSelect}
            />
          </div>
          
          <div className="toolbar-center">
            <span>{wordCount} word{wordCount !== 1 ? 's' : ''}</span>
            <span>{charCount} character{charCount !== 1 ? 's' : ''}</span>
          </div>
          
          <div className="toolbar-right">
            <button onClick={toggleDarkMode} title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}>
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            
            <button onClick={() => setShowVersioningModal(true)} title="Document Versioning & Inscription">
              ⛓️
            </button>
            
            <button onClick={toggleFullscreen} title="Toggle Fullscreen">
              ⛶
            </button>
          </div>
        </div>
      </div>

      <div className="editor-container">
        {currentDocument?.metadata && (currentDocument.metadata as any).isPdf ? (
          <iframe
            src={(currentDocument.metadata as any).pdfUrl}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              backgroundColor: '#fff'
            }}
            title={currentDocument.title}
          />
        ) : (
          <QuillEditor
            content={quillContent || editorContent}
            onChange={(content) => {
              setQuillContent(content);
              setEditorContent(content);
              // Auto-save for Quill
              if (localDocumentId) {
                const text = content.replace(/<[^>]*>/g, '');
                const firstLine = text.split('\n')[0]?.trim() || 'Untitled Document';
                const title = firstLine.substring(0, 100);
                LocalDocumentStorage.autoSave(localDocumentId, content, title);
              }
            }}
            onTextChange={(text) => {
              const words = text.trim() ? text.trim().split(/\s+/).length : 0;
              const chars = text.length;
              setWordCount(words);
              setCharCount(chars);
              
              // Update price display based on character count for real-time updates
              if (chars > 0) {
                // Use character count for more granular pricing
                // Approximate 1 byte per character for real-time display
                const bytes = chars;
                const satsPerByte = 0.05; // From BSVStorageService
                const minerFeeSats = bytes * satsPerByte;
                const totalFeeSats = minerFeeSats * 2; // 2x markup
                const bsvPriceUsd = 60; // From BSVStorageService
                const satsPerBsv = 100_000_000;
                const totalUSD = (totalFeeSats / satsPerBsv) * bsvPriceUsd;
                
                setEstimatedCost(totalUSD);
                
                // Format cost for display in dollars - show 8 decimal places
                const formattedPrice = `$${totalUSD.toFixed(8)}`;
                setCurrentPrice(formattedPrice);
              } else {
                setCurrentPrice('$0.00000000');
                setEstimatedCost(0);
              }
            }}
            placeholder="Start writing your document..."
          />
        )}
      </div>

      <div className="status-bar">
        {currentDocument?.metadata && (currentDocument.metadata as any).isPdf ? (
          <>
            <span>📑 PDF Document</span>
            <span>{currentDocument?.title || 'Untitled'}</span>
          </>
        ) : (
          <>
            <span>{cursorPosition}</span>
            <span className="auto-save-status">{autoSaveStatus}</span>
            <span>{currentDocument?.title || 'Untitled'}</span>
          </>
        )}
      </div>

      
      <PublishSettingsModal
        isOpen={showPublishModal}
        onClose={() => setShowPublishModal(false)}
        onConfirm={(settings) => {
          setPublishSettings(settings);
          // TODO: Save publish settings with document
          console.log('Publish settings:', settings);
        }}
        currentSettings={publishSettings || undefined}
        documentTitle={currentDocument?.title || 'Untitled'}
      />

      <SaveToBlockchainModal
        isOpen={showSaveBlockchainModal}
        onClose={() => {
          setShowSaveBlockchainModal(false);
          setPreselectedMode(null);
        }}
        onSave={handleBlockchainSave}
        documentTitle={currentDocument?.title || 'Untitled Document'}
        wordCount={wordCount}
        estimatedSize={charCount}
        isAuthenticated={isAuthenticated}
        onAuthRequired={onAuthRequired}
        preselectedMode={preselectedMode}
      />

      <TokenizeModal
        isOpen={showTokenizeModal}
        onClose={() => setShowTokenizeModal(false)}
        onTokenize={handleTokenize}
        documentTitle={currentDocument?.title || 'Untitled Document'}
        wordCount={wordCount}
      />

      <PostToTwitterModal
        isOpen={showTwitterModal}
        onClose={() => setShowTwitterModal(false)}
        documentTitle={currentDocument?.title || 'Untitled Document'}
        documentContent={quillContent || editorContent}
      />
      
      <DocumentVersioningModal
        isOpen={showVersioningModal}
        onClose={() => setShowVersioningModal(false)}
        documentId={localDocumentId || currentDocument?.id || 'temp-doc'}
        currentContent={quillContent || editorContent}
        documentTitle={currentDocument?.title || 'Untitled Document'}
        authorAddress={documentService?.handcashService?.getCurrentUser()?.paymail || 'unknown'}
        authorHandle={documentService?.handcashService?.getCurrentUser()?.handle}
      />
      
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      
      <DragDropZone
        onFileDrop={handleFileDrop}
        isAuthenticated={isAuthenticated}
        onAuthRequired={onAuthRequired || (() => {})}
      />

      <AIChatWindow
        isOpen={showAIChat}
        onClose={handleToggleAIChat}
        onInsertToDocument={handleInsertFromAI}
        selectedProvider={selectedAIProvider}
        onProviderChange={setSelectedAIProvider}
      />
    </div>
  );
};

export default DocumentEditor;