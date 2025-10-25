import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getArticleUrl } from '../utils/slugUtils';
import { getAuthorSlugFromName } from '../utils/authorUtils';
import WeatherWidget from '../components/WeatherWidget';
import StockTickerCard from '../components/StockTickerCard';
import AdCard from '../components/AdCard';
import './MarketBodyPage.css';

interface FeaturedContent {
  id: string;
  title: string;
  description: string;
  author: string;
  authorHandle: string;
  platform: string;
  category: string;
  readTime: number;
  engagement: number;
  thumbnail: string;
  price?: number;
  isTokenized: boolean;
  trending: boolean;
}

const MarketPage: React.FC = () => {
  const [selectedContent, setSelectedContent] = useState<FeaturedContent | null>(null);
  const [bsvPrice, setBsvPrice] = useState<number>(40.50); // Default BSV price in USD

  // Fetch real BSV price from CoinGecko
  useEffect(() => {
    const fetchBSVPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin-sv&vs_currencies=usd');
        const data = await response.json();
        if (data['bitcoin-sv'] && data['bitcoin-sv'].usd) {
          setBsvPrice(data['bitcoin-sv'].usd);
        }
      } catch (error) {
        console.log('Failed to fetch BSV price, using default:', error);
      }
    };

    fetchBSVPrice();
    // Update price every 5 minutes
    const interval = setInterval(fetchBSVPrice, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate BSV amount from USD price
  const calculateBSVAmount = (usdPrice: number): number => {
    return usdPrice / bsvPrice;
  };

  // Format BSV amount for display
  const formatBSVAmount = (usdPrice: number): string => {
    const bsvAmount = calculateBSVAmount(usdPrice);
    return bsvAmount.toFixed(6);
  };

  const featuredContent: FeaturedContent[] = [
    {
      id: '1',
      title: 'Revolutionizing Writing with Bitcoin Marketing',
      description: 'Discover how Bitcoin Marketing transforms content creation into tokenized assets, enabling writers to encrypt, publish, and sell shares in their work on the blockchain',
      author: 'b0ase',
      authorHandle: '@b0ase',
      platform: 'Bitcoin Marketing',
      category: 'Technology',
      readTime: 25,
      engagement: 2890,
      thumbnail: '/bitcoin-marketing-intro.jpg',
      price: 0.01,
      isTokenized: true,
      trending: true
    },
    {
      id: '2',
      title: 'Bitcoin Marketing: The Uberfication of Writing',
      description: 'A thoughtful examination and response to Anna Iversen\'s concerns about modern work platforms, from the perspective of a 7-year Uber driver who built Bitcoin Marketing',
      author: 'b0ase',
      authorHandle: '@b0ase',
      platform: 'Bitcoin Marketing',
      category: 'Technology',
      readTime: 5,
      engagement: 2150,
      thumbnail: '/uber-driving.jpg',
      price: 0.01,
      isTokenized: true,
      trending: true
    },
    {
      id: '3',
      title: 'Ideological Oversimplification: Dissecting a Shallow Critique of Debt and Money',
      description: 'A critique of Iversen\'s rhetorical framework which relies on flawed economic analogies to misrepresent the nature of debt in traditional financial systems',
      author: 'b0ase',
      authorHandle: '@b0ase',
      platform: 'Bitcoin Marketing',
      category: 'Economics',
      readTime: 18,
      engagement: 1780,
      thumbnail: '/corn.jpg',
      price: 0.01,
      isTokenized: true,
      trending: true
    },
    {
      id: '4',
      title: 'How to Build a \'bOS\': A Pragmatic Strategic Plan for Decentralized Finance',
      description: 'A comprehensive strategic plan for building the Bitcoin Operating System (bOS) as a scalable, self-governing computational infrastructure that rewards service providers with direct payment and corporate equity',
      author: 'b0ase',
      authorHandle: '@b0ase',
      platform: 'Bitcoin Marketing',
      category: 'Technology',
      readTime: 20,
      engagement: 1560,
      thumbnail: '/bitcoin-os-header.jpg',
      price: 0.01,
      isTokenized: true,
      trending: true
    },
    {
      id: '5',
      title: 'Crypto Content Monetization',
      description: 'How to earn Bitcoin through content creation and publishing',
      author: 'Satoshi Marketing',
      authorHandle: '@satoshiwriter',
      platform: 'Bitcoin Marketing',
      category: 'Technology',
      readTime: 9,
      engagement: 1890,
      thumbnail: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&h=250&fit=crop&crop=center',
      price: 0.01,
      isTokenized: true,
      trending: true
    },
    {
      id: '6',
      title: 'NFT Publishing Revolution',
      description: 'Transform your articles into valuable digital assets',
      author: 'NFT Creator',
      authorHandle: '@nftcreator',
      platform: 'Mirror',
      category: 'Technology',
      readTime: 13,
      engagement: 2100,
      thumbnail: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=400&h=250&fit=crop&crop=center',
      price: 0.01,
      isTokenized: true,
      trending: true
    },
    {
      id: '7',
      title: 'Substack Monetization Tips',
      description: 'Build a profitable newsletter with proven strategies',
      author: 'Newsletter Pro',
      authorHandle: '@newsletterpro',
      platform: 'Substack',
      category: 'Business',
      readTime: 8,
      engagement: 1654,
      thumbnail: 'https://images.unsplash.com/photo-1586880244386-8b3e34c8382c?w=400&h=250&fit=crop&crop=center',
      price: 0.01,
      isTokenized: false,
      trending: true
    },
    {
      id: '8',
      title: 'Content Creator Burnout Solutions',
      description: 'Sustainable strategies for maintaining creativity and mental health',
      author: 'Wellness Marketing',
      authorHandle: '@wellnesswriter',
      platform: 'Medium',
      category: 'Wellness',
      readTime: 6,
      engagement: 1340,
      thumbnail: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=250&fit=crop&crop=center',
      price: 0.01,
      isTokenized: false,
      trending: true
    },
    {
      id: '9',
      title: 'AI Writing Tools Review',
      description: 'Comprehensive analysis of the best AI writing assistants for content creators',
      author: 'Tech Reviewer',
      authorHandle: '@techreviewer',
      platform: 'Substack',
      category: 'Technology',
      readTime: 11,
      engagement: 2150,
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center',
      price: 0.01,
      isTokenized: true,
      trending: true
    },
    {
      id: '10',
      title: 'Remote Work Writing Setup',
      description: 'Building the perfect home office for productive writing sessions',
      author: 'Productivity Pro',
      authorHandle: '@productivitypro',
      platform: 'Ghost',
      category: 'Productivity',
      readTime: 8,
      engagement: 1680,
      thumbnail: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=250&fit=crop&crop=center',
      price: 0.01,
      isTokenized: false,
      trending: true
    },
    {
      id: '11',
      title: 'Visual Storytelling Techniques',
      description: 'Maximize your earnings on Medium\'s partner program',
      author: 'Content Strategist',
      authorHandle: '@contentstrat',
      platform: 'Medium',
      category: 'Marketing',
      readTime: 11,
      engagement: 1456,
      thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop&crop=center',
      isTokenized: false,
      trending: false
    },
    {
      id: '9',
      title: 'NFT Publishing Revolution',
      description: 'Transform your articles into valuable digital assets',
      author: 'NFT Creator',
      authorHandle: '@nftcreator',
      platform: 'Mirror',
      category: 'Technology',
      readTime: 13,
      engagement: 2100,
      thumbnail: 'https://images.unsplash.com/photo-1634704784915-aacf363b021f?w=400&h=250&fit=crop&crop=center',
      price: 0.01,
      isTokenized: true,
      trending: true
    },
    {
      id: '10',
      title: 'Ghost CMS Setup Guide',
      description: 'Complete tutorial for setting up your own publishing platform',
      author: 'Tech Tutorial',
      authorHandle: '@techtutorial',
      platform: 'Ghost',
      category: 'Development',
      readTime: 20,
      engagement: 967,
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop&crop=center',
      isTokenized: false,
      trending: false
    },
    {
      id: '11',
      title: 'Substack Monetization Tips',
      description: 'Build a profitable newsletter with proven strategies',
      author: 'Newsletter Pro',
      authorHandle: '@newsletterpro',
      platform: 'Substack',
      category: 'Business',
      readTime: 8,
      engagement: 1654,
      thumbnail: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=400&h=250&fit=crop&crop=center',
      isTokenized: false,
      trending: true
    },
    {
      id: '12',
      title: 'Web3 Publishing Future',
      description: 'The next frontier of digital content creation',
      author: 'Blockchain Expert',
      authorHandle: '@blockchainexpert',
      platform: 'Bitcoin Marketing',
      category: 'Technology',
      readTime: 14,
      engagement: 2890,
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop&crop=center',
      price: 0.01,
      isTokenized: true,
      trending: false
    },
    {
      id: '13',
      title: 'Content Creator Burnout Solutions',
      description: 'Sustainable strategies for maintaining creativity and mental health',
      author: 'Wellness Marketing',
      authorHandle: '@wellnesswriter',
      platform: 'Medium',
      category: 'Wellness',
      readTime: 6,
      engagement: 1340,
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop&crop=center',
      isTokenized: false,
      trending: true
    },
    {
      id: '14',
      title: 'AI Writing Tools Review',
      description: 'Comprehensive analysis of the best AI writing assistants for content creators',
      author: 'Tech Reviewer',
      authorHandle: '@techreviewer',
      platform: 'Substack',
      category: 'Technology',
      readTime: 11,
      engagement: 2150,
      thumbnail: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=400&h=250&fit=crop&crop=center',
      isTokenized: false,
      trending: true
    },
    {
      id: '15',
      title: 'Remote Work Writing Setup',
      description: 'Building the perfect home office for productive writing sessions',
      author: 'Productivity Pro',
      authorHandle: '@productivitypro',
      platform: 'Ghost',
      category: 'Productivity',
      readTime: 8,
      engagement: 1680,
      thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68e2c6b7eb?w=400&h=250&fit=crop&crop=center',
      isTokenized: false,
      trending: true
    },
    {
      id: '16',
      title: 'Visual Storytelling Techniques',
      description: 'How to enhance your articles with compelling images and graphics',
      author: 'Visual Artist',
      authorHandle: '@visualartist',
      platform: 'Medium',
      category: 'Design',
      readTime: 9,
      engagement: 1920,
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop&crop=center',
      isTokenized: false,
      trending: true
    },
    {
      id: '17',
      title: 'Email Newsletter Growth Hacks',
      description: 'Proven tactics to grow your subscriber base and engagement rates',
      author: 'Marketing Maven',
      authorHandle: '@marketingmaven',
      platform: 'ConvertKit',
      category: 'Marketing',
      readTime: 7,
      engagement: 1450,
      thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop&crop=center',
      isTokenized: false,
      trending: true
    },
    {
      id: '18',
      title: 'Freelance Writing Rates Guide',
      description: 'How to price your writing services and negotiate better contracts',
      author: 'Freelance Coach',
      authorHandle: '@freelancecoach',
      platform: 'LinkedIn',
      category: 'Business',
      readTime: 10,
      engagement: 2380,
      thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&crop=center',
      isTokenized: false,
      trending: true
    },
    {
      id: '19',
      title: 'Social Media Content Strategy',
      description: 'Leveraging social platforms to amplify your written content',
      author: 'Social Strategist',
      authorHandle: '@socialstrategist',
      platform: 'Buffer',
      category: 'Marketing',
      readTime: 12,
      engagement: 2890,
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop&crop=center',
      isTokenized: false,
      trending: true
    },
    {
      id: '20',
      title: 'Writing Workshop Essentials',
      description: 'Everything you need to know about joining and leading writing groups',
      author: 'Workshop Leader',
      authorHandle: '@workshopleader',
      platform: 'Meetup',
      category: 'Education',
      readTime: 8,
      engagement: 1560,
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop&crop=center',
      isTokenized: false,
      trending: true
    },
    {
      id: '21',
      title: 'Content Calendar Planning',
      description: 'Strategic planning for consistent and engaging content publication',
      author: 'Content Manager',
      authorHandle: '@contentmanager',
      platform: 'Notion',
      category: 'Planning',
      readTime: 6,
      engagement: 1890,
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop&crop=center',
      isTokenized: false,
      trending: true
    },
    {
      id: '22',
      title: 'Interview Techniques for Writers',
      description: 'Mastering the art of conducting compelling interviews for your articles',
      author: 'Journalist Pro',
      authorHandle: '@journalistpro',
      platform: 'Journalism.org',
      category: 'Journalism',
      readTime: 11,
      engagement: 2450,
      thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=250&fit=crop&crop=center',
      isTokenized: false,
      trending: true
    },
    {
      id: '23',
      title: 'Book Proposal Writing Guide',
      description: 'From idea to published book: crafting proposals that publishers love',
      author: 'Publishing Expert',
      authorHandle: '@publishingexpert',
      platform: 'Marketing\'s Digest',
      category: 'Publishing',
      readTime: 15,
      engagement: 3120,
      thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop&crop=center',
      isTokenized: false,
      trending: true
    },
    {
      id: '24',
      title: 'Creative Writing Prompts Collection',
      description: '50 inspiring prompts to overcome writer\'s block and spark creativity',
      author: 'Creative Catalyst',
      authorHandle: '@creativecatalyst',
      platform: 'Writing.com',
      category: 'Creative',
      readTime: 5,
      engagement: 1780,
      thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=250&fit=crop&crop=center',
      isTokenized: false,
      trending: true
    },
    {
      id: '25',
      title: 'Research Skills for Writers',
      description: 'Finding credible sources and fact-checking in the digital age',
      author: 'Research Specialist',
      authorHandle: '@researchspecialist',
      platform: 'Academic Marketing',
      category: 'Research',
      readTime: 9,
      engagement: 1690,
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=center',
      isTokenized: false,
      trending: true
    },
    {
      id: '26',
      title: 'Writing for Different Audiences',
      description: 'Adapting your voice and style for various reader demographics',
      author: 'Audience Expert',
      authorHandle: '@audienceexpert',
      platform: 'Content Strategy',
      category: 'Strategy',
      readTime: 7,
      engagement: 1420,
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop&crop=center',
      isTokenized: false,
      trending: true
    },
    {
      id: '27',
      title: 'Copywriting Conversion Secrets',
      description: 'Psychology-driven techniques that turn readers into customers',
      author: 'Conversion Copy',
      authorHandle: '@conversioncopy',
      platform: 'Copy Hackers',
      category: 'Copywriting',
      readTime: 13,
      engagement: 2760,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&crop=center',
      isTokenized: false,
      trending: true
    },
    {
      id: '28',
      title: 'Travel Writing Adventures',
      description: 'Capturing compelling stories from your journeys around the world',
      author: 'World Wanderer',
      authorHandle: '@worldwanderer',
      platform: 'Travel + Leisure',
      category: 'Travel',
      readTime: 10,
      engagement: 2340,
      thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=250&fit=crop&crop=center',
      isTokenized: false,
      trending: true
    },
    {
      id: '29',
      title: 'Technical Writing Simplified',
      description: 'Making complex topics accessible to general audiences',
      author: 'Tech Communicator',
      authorHandle: '@techcommunicator',
      platform: 'Technical Marketing HQ',
      category: 'Technical',
      readTime: 8,
      engagement: 1590,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center',
      isTokenized: false,
      trending: true
    },
    {
      id: '30',
      title: 'Personal Branding for Writers',
      description: 'Building your reputation and online presence as a professional writer',
      author: 'Brand Builder',
      authorHandle: '@brandbuilder',
      platform: 'Personal Brand Lab',
      category: 'Branding',
      readTime: 11,
      engagement: 2180,
      thumbnail: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=250&fit=crop&crop=center',
      isTokenized: false,
      trending: true
    }
  ];

  const trendingContent = featuredContent.filter(content => content.trending);
  const tokenizedContent = featuredContent.filter(content => content.isTokenized);

  return (
    <div className="market-body-page">
      {/* Header from landing page */}
      <header className="App-header" style={{ marginTop: '72px' }}>
        {/* Logo and title in center */}
        <div className="title-section">
          <div className="app-title-container">
            <img 
              src="/logo.svg" 
              alt="Bitcoin Marketing Logo" 
              className="app-logo"
              style={{
                width: '32px',
                height: '32px',
                marginRight: '16px',
                marginTop: '4px',
                verticalAlign: 'baseline'
              }}
            />
            <h1 
              onClick={() => {
                window.location.href = '/';
              }}
              style={{
                cursor: 'pointer',
                paddingTop: '10px',
                marginLeft: '-12px'
              }}
              title="Return to main view"
            >
              <span style={{color: '#ff9500'}}>Bitcoin</span> Marketing Market
            </h1>
          </div>
          <p className="app-subtitle">Encrypt, publish and sell shares in your work</p>
        </div>
      </header>
      
      {/* Main content layout without sidebar constraints */}
      <div className="market-body-layout">
        {/* Left side - Article content */}
        <div className="market-body-content">
          {/* Featured Content Section */}
          <section className="featured-section">
            <div className="content-grid">
              {trendingContent.map(content => (
                <Link 
                  key={content.id} 
                  to={`/market/article/${content.id}`}
                  className="content-card trending"
                >
                  <div className="content-thumbnail">
                    <img src={content.thumbnail} alt={content.title} />
                    <div className="content-badges">
                      {content.trending && <span className="badge trending">🔥 Trending</span>}
                      {content.isTokenized && <span className="badge tokenized">₿ Tokenized</span>}
                    </div>
                  </div>
                  <div className="content-info">
                    <h3>{content.title}</h3>
                    <p>{content.description}</p>
                    <div className="content-meta">
                      <Link 
                        to={`/authors/${getAuthorSlugFromName(content.author)}`} 
                        className="author-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {content.author}
                      </Link>
                      <span className="platform">{content.platform}</span>
                      <span className="read-time">{content.readTime} min read</span>
                    </div>
                    <div className="content-stats">
                      <span className="engagement">👁 {content.engagement}</span>
                      {content.price && (
                        <div className="price-display">
                          <span className="price-usd">${content.price?.toFixed(2) || '0.01'}</span>
                          <span className="price-bsv">₿ {formatBSVAmount(content.price || 0.01)} BSV</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </div>

        {/* Right side - Widget sidebar */}
        <div className="market-body-sidebar">
            <div className="widget-item">
              <WeatherWidget />
            </div>
            <div className="widget-item">
              <StockTickerCard />
            </div>
            <div className="widget-item">
              <AdCard
                type="banner"
                title="Boost Your Writing Career"
                description="Join thousands of writers earning Bitcoin through quality content creation"
                imageUrl="https://images.unsplash.com/photo-1486312338219-ce68e2c6b7eb?w=400&h=250&fit=crop&crop=center"
                actionText="Join Now"
                brand="Bitcoin Marketing"
                sponsored={true}
              />
            </div>
            <div className="widget-item">
              <AdCard
                type="product"
                title="Premium Writing Tools"
                description="Advanced editing features and analytics to improve your content performance"
                imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center"
                actionText="Upgrade"
                brand="WritePro"
                sponsored={true}
              />
            </div>
            <div className="widget-item">
              <AdCard
                type="service"
                title="Editorial Services"
                description="Professional editing and proofreading to make your content shine"
                imageUrl="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=250&fit=crop&crop=center"
                actionText="Learn More"
                brand="Editor Plus"
                sponsored={true}
              />
            </div>
            <div className="widget-item">
              <AdCard
                type="sponsored"
                title="Crypto News Platform"
                description="Stay updated with the latest cryptocurrency and blockchain developments"
                imageUrl="https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=250&fit=crop&crop=center"
                actionText="Subscribe"
                brand="CoinDesk"
                sponsored={true}
              />
            </div>
            <div className="widget-item">
              <AdCard
                type="product"
                title="Grammar Assistant AI"
                description="Perfect your writing with AI-powered grammar and style suggestions"
                imageUrl="https://images.unsplash.com/photo-1555421689-491a97ff2040?w=400&h=250&fit=crop&crop=center"
                actionText="Try Free"
                brand="GrammarlyPro"
                sponsored={true}
              />
            </div>
            <div className="widget-item">
              <AdCard
                type="service"
                title="Content Marketing Course"
                description="Learn to build an audience and monetize your content effectively"
                imageUrl="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop&crop=center"
                actionText="Enroll Now"
                brand="Creator Academy"
                sponsored={true}
              />
            </div>
            <div className="widget-item">
              <AdCard
                type="banner"
                title="Bitcoin Wallet Security"
                description="Keep your Bitcoin earnings safe with hardware wallet protection"
                imageUrl="https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=400&h=250&fit=crop&crop=center"
                actionText="Shop Now"
                brand="Ledger"
                sponsored={true}
              />
            </div>
            <div className="widget-item">
              <AdCard
                type="product"
                title="Publishing Analytics"
                description="Track your content performance across all platforms in one dashboard"
                imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center"
                actionText="Start Trial"
                brand="ContentStats"
                sponsored={true}
              />
            </div>
            <div className="widget-item">
              <AdCard
                type="service"
                title="SEO for Writers"
                description="Optimize your content to reach more readers and earn more Bitcoin"
                imageUrl="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=250&fit=crop&crop=center"
                actionText="Learn More"
                brand="SEO Masters"
                sponsored={true}
              />
            </div>
            <div className="widget-item">
              <AdCard
                type="sponsored"
                title="NFT Marketplace"
                description="Turn your articles into collectible NFTs and reach new audiences"
                imageUrl="https://images.unsplash.com/photo-1634704784915-aacf363b021f?w=400&h=250&fit=crop&crop=center"
                actionText="Explore"
                brand="OpenSea"
                sponsored={true}
              />
            </div>
            <div className="widget-item">
              <AdCard
                type="banner"
                title="Marketing's Community"
                description="Connect with fellow writers, share tips, and collaborate on projects"
                imageUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop&crop=center"
                actionText="Join Forum"
                brand="MarketingConnect"
                sponsored={true}
              />
            </div>
            <div className="widget-item">
              <AdCard
                type="product"
                title="Blog Theme Store"
                description="Professional themes and templates for your writing website"
                imageUrl="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=250&fit=crop&crop=center"
                actionText="Browse Themes"
                brand="ThemeForest"
                sponsored={true}
              />
            </div>
            <div className="widget-item">
              <AdCard
                type="service"
                title="Copyright Protection"
                description="Protect your intellectual property with blockchain-based copyright registration"
                imageUrl="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop&crop=center"
                actionText="Protect Now"
                brand="IP Guardian"
                sponsored={true}
              />
            </div>
            <div className="widget-item">
              <AdCard
                type="sponsored"
                title="Podcast Equipment"
                description="Expand your content creation with professional podcasting gear"
                imageUrl="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=250&fit=crop&crop=center"
                actionText="Shop Audio"
                brand="Audio-Technica"
                sponsored={true}
              />
            </div>
            <div className="widget-item">
              <AdCard
                type="banner"
                title="Writing Retreat"
                description="Join other writers for a productive retreat in beautiful locations"
                imageUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop&crop=center"
                actionText="Book Retreat"
                brand="Marketing's Escape"
                sponsored={true}
              />
            </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPage;