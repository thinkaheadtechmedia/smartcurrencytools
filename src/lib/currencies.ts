export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag?: string;
  isCrypto?: boolean;
  centralBank?: string;
  country?: string;
  subUnit?: string;
  profile?: string;
}

export const CURRENCIES: Currency[] = [
  { 
    code: 'USD', 
    name: 'US Dollar', 
    symbol: '$', 
    flag: '🇺🇸',
    centralBank: 'Federal Reserve (Fed)',
    country: 'United States',
    subUnit: 'Cent (1/100)',
    profile: 'The US Dollar is the world’s primary reserve currency and the most actively traded fiat currency in global foreign exchange markets, accounting for nearly 88% of daily forex volume.'
  },
  { 
    code: 'EUR', 
    name: 'Euro', 
    symbol: '€', 
    flag: '🇪🇺',
    centralBank: 'European Central Bank (ECB)',
    country: 'Eurozone (20 European Union Member States)',
    subUnit: 'Cent (1/100)',
    profile: 'The Euro is the official currency of the Eurozone and the second most traded currency globally. It serves as a major global reserve currency managed by the European Central Bank in Frankfurt.'
  },
  { 
    code: 'GBP', 
    name: 'British Pound', 
    symbol: '£', 
    flag: '🇬🇧',
    centralBank: 'Bank of England (BoE)',
    country: 'United Kingdom',
    subUnit: 'Penny / Pence (1/100)',
    profile: 'The British Pound Sterling is the oldest continuously used currency in the world. It is the fourth most traded currency globally and heavily influenced by UK services, financial markets, and BoE rate decisions.'
  },
  { 
    code: 'JPY', 
    name: 'Japanese Yen', 
    symbol: '¥', 
    flag: '🇯🇵',
    centralBank: 'Bank of Japan (BoJ)',
    country: 'Japan',
    subUnit: 'Sen (1/100, historical)',
    profile: 'The Japanese Yen is widely regarded as a classic safe-haven currency during periods of geopolitical uncertainty and financial market volatility due to Japan’s massive net creditor status.'
  },
  { 
    code: 'AUD', 
    name: 'Australian Dollar', 
    symbol: 'A$', 
    flag: '🇦🇺',
    centralBank: 'Reserve Bank of Australia (RBA)',
    country: 'Australia',
    subUnit: 'Cent (1/100)',
    profile: 'The Australian Dollar is a key commodity currency whose exchange valuation correlates strongly with global demand for iron ore, coal, agricultural exports, and Asian economic growth.'
  },
  { 
    code: 'CAD', 
    name: 'Canadian Dollar', 
    symbol: 'C$', 
    flag: '🇨🇦',
    centralBank: 'Bank of Canada (BoC)',
    country: 'Canada',
    subUnit: 'Cent (1/100)',
    profile: 'Often nicknamed the Loonie, the Canadian Dollar is closely tied to global energy commodity prices, particularly crude oil, and the economic performance of its largest trading partner, the United States.'
  },
  { 
    code: 'CHF', 
    name: 'Swiss Franc', 
    symbol: 'CHF', 
    flag: '🇨🇭',
    centralBank: 'Swiss National Bank (SNB)',
    country: 'Switzerland',
    subUnit: 'Rappen / Centime (1/100)',
    profile: 'The Swiss Franc is renowned for financial stability, backing by low sovereign debt, robust institutional transparency, and traditional safe-haven status in times of global crisis.'
  },
  { 
    code: 'CNY', 
    name: 'Chinese Yuan', 
    symbol: '¥', 
    flag: '🇨🇳',
    centralBank: 'People’s Bank of China (PBoC)',
    country: 'China',
    subUnit: 'Fen (1/100), Jiao (1/10)',
    profile: 'Also known as the Renminbi, the Chinese Yuan is the official currency of the world’s second-largest economy and is managed through a daily midpoint reference rate set by the PBoC.'
  },
  { 
    code: 'INR', 
    name: 'Indian Rupee', 
    symbol: '₹', 
    flag: '🇮🇳',
    centralBank: 'Reserve Bank of India (RBI)',
    country: 'India',
    subUnit: 'Paisa (1/100)',
    profile: 'The Indian Rupee is the currency of South Asia’s largest and fastest-growing major economy, influenced by international crude oil import bills, IT export revenues, and foreign direct investment.'
  },
  { 
    code: 'NZD', 
    name: 'New Zealand Dollar', 
    symbol: 'NZ$', 
    flag: '🇳🇿',
    centralBank: 'Reserve Bank of New Zealand (RBNZ)',
    country: 'New Zealand',
    subUnit: 'Cent (1/100)',
    profile: 'Often called the Kiwi, the New Zealand Dollar is a popular high-beta currency sensitive to agricultural dairy exports, international risk appetite, and trading sentiment across the Asia-Pacific region.'
  },
  { 
    code: 'SGD', 
    name: 'Singapore Dollar', 
    symbol: 'S$', 
    flag: '🇸🇬',
    centralBank: 'Monetary Authority of Singapore (MAS)',
    country: 'Singapore',
    subUnit: 'Cent (1/100)',
    profile: 'The Singapore Dollar is widely recognized as a premier Asian financial hub currency, managed by the MAS through an exchange rate band against a trade-weighted basket of foreign currencies.'
  },
  { 
    code: 'HKD', 
    name: 'Hong Kong Dollar', 
    symbol: 'HK$', 
    flag: '🇭🇰',
    centralBank: 'Hong Kong Monetary Authority (HKMA)',
    country: 'Hong Kong',
    subUnit: 'Cent (1/100)',
    profile: 'The Hong Kong Dollar is pegged to the US Dollar within a tight convertibility undertaking band (7.75 to 7.85 HKD per USD), underpinned by 100% US Dollar foreign exchange reserves.'
  },
  { 
    code: 'SEK', 
    name: 'Swedish Krona', 
    symbol: 'kr', 
    flag: '🇸🇪',
    centralBank: 'Sveriges Riksbank',
    country: 'Sweden',
    subUnit: 'Öre (historical)',
    profile: 'The Swedish Krona is issued by the world’s oldest central bank, the Riksbank. It floats freely and is driven by Sweden’s industrial exports, manufacturing sector, and Nordic economic trends.'
  },
  { 
    code: 'NOK', 
    name: 'Norwegian Krone', 
    symbol: 'kr', 
    flag: '🇳🇴',
    centralBank: 'Norges Bank',
    country: 'Norway',
    subUnit: 'Øre (historical)',
    profile: 'The Norwegian Krone is supported by Norway’s substantial petroleum exports and the world’s largest sovereign wealth fund (Government Pension Fund Global).'
  },
  { 
    code: 'DKK', 
    name: 'Danish Krone', 
    symbol: 'kr', 
    flag: '🇩🇰',
    centralBank: 'Danmarks Nationalbank',
    country: 'Denmark',
    subUnit: 'Øre (1/100)',
    profile: 'The Danish Krone participates in the European Exchange Rate Mechanism II (ERM II), maintaining a stable peg to the Euro within a narrow fluctuation band of ±2.25%.'
  },
  { 
    code: 'ZAR', 
    name: 'South African Rand', 
    symbol: 'R', 
    flag: '🇿🇦',
    centralBank: 'South African Reserve Bank (SARB)',
    country: 'South Africa',
    subUnit: 'Cent (1/100)',
    profile: 'The South African Rand is Africa’s most heavily traded currency in global forex markets, closely linked to precious metal exports (gold, platinum) and broader emerging market sentiment.'
  },
  { 
    code: 'MXN', 
    name: 'Mexican Peso', 
    symbol: 'Mex$', 
    flag: '🇲🇽',
    centralBank: 'Bank of Mexico (Banxico)',
    country: 'Mexico',
    subUnit: 'Centavo (1/100)',
    profile: 'The Mexican Peso is Latin America’s most liquid currency and one of the most traded emerging market currencies globally, supported by robust US-Mexico bilateral trade flows and worker remittances.'
  },
  { 
    code: 'BRL', 
    name: 'Brazilian Real', 
    symbol: 'R$', 
    flag: '🇧🇷',
    centralBank: 'Central Bank of Brazil (BCB)',
    country: 'Brazil',
    subUnit: 'Centavo (1/100)',
    profile: 'The Brazilian Real is the leading currency of South America, heavily influenced by global agricultural commodity exports (soybeans, coffee, beef), iron ore demand, and domestic fiscal policy.'
  },
  { 
    code: 'RUB', 
    name: 'Russian Ruble', 
    symbol: '₽', 
    flag: '🇷🇺',
    centralBank: 'Bank of Russia',
    country: 'Russia',
    subUnit: 'Kopek (1/100)',
    profile: 'The Russian Ruble is historically correlated with global oil and gas export revenues, domestic capital controls, and geopolitical sanctions.'
  },
  { 
    code: 'KRW', 
    name: 'South Korean Won', 
    symbol: '₩', 
    flag: '🇰🇷',
    centralBank: 'Bank of Korea (BoK)',
    country: 'South Korea',
    subUnit: 'Jeon (historical)',
    profile: 'The South Korean Won reflects the health of global technology supply chains, semiconductor shipments, consumer electronics manufacturing, and East Asian trade cycles.'
  },
  { 
    code: 'TRY', 
    name: 'Turkish Lira', 
    symbol: '₺', 
    flag: '🇹🇷',
    centralBank: 'Central Bank of the Republic of Turkey (CBRT)',
    country: 'Turkey',
    subUnit: 'Kuruş (1/100)',
    profile: 'The Turkish Lira operates in an emerging market crossroad between Europe and the Middle East, with valuation driven by inflation dynamics, foreign exchange reserves, and monetary policy shifts.'
  },
  { 
    code: 'PLN', 
    name: 'Polish Zloty', 
    symbol: 'zł', 
    flag: '🇵🇱',
    centralBank: 'National Bank of Poland (NBP)',
    country: 'Poland',
    subUnit: 'Grosz (1/100)',
    profile: 'The Polish Zloty is the primary currency of Central Europe’s largest economy, closely tied to industrial manufacturing demand from Germany and European Union economic integration.'
  },
  { 
    code: 'THB', 
    name: 'Thai Baht', 
    symbol: '฿', 
    flag: '🇹🇭',
    centralBank: 'Bank of Thailand (BOT)',
    country: 'Thailand',
    subUnit: 'Satang (1/100)',
    profile: 'The Thai Baht is a key Southeast Asian currency supported by Thailand’s robust international tourism revenue, electronics manufacturing, and agricultural exports.'
  },
  { 
    code: 'IDR', 
    name: 'Indonesian Rupiah', 
    symbol: 'Rp', 
    flag: '🇮🇩',
    centralBank: 'Bank Indonesia (BI)',
    country: 'Indonesia',
    subUnit: 'Sen (historical)',
    profile: 'The Indonesian Rupiah represents Southeast Asia’s largest economy, driven by commodity exports including palm oil, nickel, coal, and domestic consumer spending across the archipelago.'
  },
  { 
    code: 'MYR', 
    name: 'Malaysian Ringgit', 
    symbol: 'RM', 
    flag: '🇲🇾',
    centralBank: 'Bank Negara Malaysia (BNM)',
    country: 'Malaysia',
    subUnit: 'Sen (1/100)',
    profile: 'The Malaysian Ringgit is influenced by semiconductor packaging exports, liquefied natural gas (LNG), crude palm oil production, and monetary policy set by Bank Negara Malaysia.'
  },
  { 
    code: 'PHP', 
    name: 'Philippine Peso', 
    symbol: '₱', 
    flag: '🇵🇭',
    centralBank: 'Bangko Sentral ng Pilipinas (BSP)',
    country: 'Philippines',
    subUnit: 'Sentimo (1/100)',
    profile: 'The Philippine Peso is substantially bolstered by billions of dollars in annual personal remittances sent home by overseas Filipino workers (OFWs) and the business process outsourcing (BPO) industry.'
  },
  { 
    code: 'VND', 
    name: 'Vietnamese Dong', 
    symbol: '₫', 
    flag: '🇻🇳',
    centralBank: 'State Bank of Vietnam (SBV)',
    country: 'Vietnam',
    subUnit: 'Hào / Xu (historical)',
    profile: 'The Vietnamese Dong is managed by the State Bank of Vietnam within a daily crawling peg band against the US Dollar to support the country’s high-growth export manufacturing engine.'
  },
  { 
    code: 'AED', 
    name: 'UAE Dirham', 
    symbol: 'AED', 
    flag: '🇦🇪',
    centralBank: 'Central Bank of the UAE (CBUAE)',
    country: 'United Arab Emirates',
    subUnit: 'Fils (1/100)',
    profile: 'The UAE Dirham is officially pegged to the US Dollar at a fixed rate of approximately 3.6725 AED per USD, offering currency stability for the Middle East’s leading financial and aviation hub.'
  },
  { 
    code: 'SAR', 
    name: 'Saudi Riyal', 
    symbol: '﷼', 
    flag: '🇸🇦',
    centralBank: 'Saudi Central Bank (SAMA)',
    country: 'Saudi Arabia',
    subUnit: 'Halala (1/100)',
    profile: 'The Saudi Riyal is pegged to the US Dollar at 3.75 SAR per USD and supported by Saudi Arabia’s position as one of the world’s foremost crude petroleum exporters.'
  },
  { 
    code: 'ILS', 
    name: 'Israeli Shekel', 
    symbol: '₪', 
    flag: '🇮🇱',
    centralBank: 'Bank of Israel (BoI)',
    country: 'Israel',
    subUnit: 'Agora (1/100)',
    profile: 'The Israeli New Shekel is a fully convertible, freely floating currency backed by Israel’s thriving high-tech innovation ecosystem and substantial natural gas reserves.'
  },
  { 
    code: 'EGP', 
    name: 'Egyptian Pound', 
    symbol: 'E£', 
    flag: '🇪🇬',
    centralBank: 'Central Bank of Egypt (CBE)',
    country: 'Egypt',
    subUnit: 'Piastre (1/100)',
    profile: 'The Egyptian Pound represents North Africa’s most populous nation, with currency valuation influenced by Suez Canal receipts, tourism inflows, and expatriate remittances.'
  },
  { 
    code: 'NGN', 
    name: 'Nigerian Naira', 
    symbol: '₦', 
    flag: '🇳🇬',
    centralBank: 'Central Bank of Nigeria (CBN)',
    country: 'Nigeria',
    subUnit: 'Kobo (1/100)',
    profile: 'The Nigerian Naira is the official currency of Africa’s largest economy and demographic powerhouse, heavily correlated with global crude oil export revenues and domestic FX liquidity.'
  },
  { 
    code: 'KES', 
    name: 'Kenyan Shilling', 
    symbol: 'KSh', 
    flag: '🇰🇪',
    centralBank: 'Central Bank of Kenya (CBK)',
    country: 'Kenya',
    subUnit: 'Cent (1/100)',
    profile: 'The Kenyan Shilling is the primary commercial currency of East Africa, supported by tea and coffee exports, tourism, horticulture, and mobile money payment innovations like M-Pesa.'
  },
  { 
    code: 'GHS', 
    name: 'Ghanaian Cedi', 
    symbol: 'GH₵', 
    flag: '🇬🇭',
    centralBank: 'Bank of Ghana (BoG)',
    country: 'Ghana',
    subUnit: 'Pesewa (1/100)',
    profile: 'The Ghanaian Cedi serves as the currency of West Africa’s second-largest economy, anchored by commodity exports including cocoa beans, gold, and crude oil.'
  },
  { 
    code: 'PKR', 
    name: 'Pakistani Rupee', 
    symbol: '₨', 
    flag: '🇵🇰',
    centralBank: 'State Bank of Pakistan (SBP)',
    country: 'Pakistan',
    subUnit: 'Paisa (historical)',
    profile: 'The Pakistani Rupee is the currency of South Asia’s second-largest nation, shaped by textile and agricultural exports, international remittance flows, and balance of payments dynamics.'
  },
  { 
    code: 'BDT', 
    name: 'Bangladeshi Taka', 
    symbol: '৳', 
    flag: '🇧🇩',
    centralBank: 'Bangladesh Bank',
    country: 'Bangladesh',
    subUnit: 'Poisha (historical)',
    profile: 'The Bangladeshi Taka is backed by the world’s second-largest ready-made garment (RMG) textile manufacturing industry and significant foreign remittance receipts.'
  },
  { 
    code: 'CZK', 
    name: 'Czech Koruna', 
    symbol: 'Kč', 
    flag: '🇨🇿',
    centralBank: 'Czech National Bank (CNB)',
    country: 'Czech Republic',
    subUnit: 'Haléř (historical)',
    profile: 'The Czech Koruna is a freely floating European Union currency driven by the Czech Republic’s advanced automotive industry, machinery manufacturing, and low sovereign debt ratio.'
  },
  { 
    code: 'HUF', 
    name: 'Hungarian Forint', 
    symbol: 'Ft', 
    flag: '🇭🇺',
    centralBank: 'Magyar Nemzeti Bank (MNB)',
    country: 'Hungary',
    subUnit: 'Fillér (historical)',
    profile: 'The Hungarian Forint is an actively traded Central European currency sensitive to automotive exports, European battery manufacturing supply chains, and MNB interest rate policy.'
  },
  { 
    code: 'RON', 
    name: 'Romanian Leu', 
    symbol: 'lei', 
    flag: '🇷🇴',
    centralBank: 'National Bank of Romania (BNR)',
    country: 'Romania',
    subUnit: 'Bani (1/100)',
    profile: 'The Romanian Leu is managed by the BNR within a managed float regime, supported by Romania’s IT sector growth, automotive production, and EU infrastructure funding.'
  },
  { 
    code: 'CLP', 
    name: 'Chilean Peso', 
    symbol: 'CLP$', 
    flag: '🇨🇱',
    centralBank: 'Central Bank of Chile',
    country: 'Chile',
    subUnit: 'Centavo (historical)',
    profile: 'The Chilean Peso is the world’s most prominent &quot;copper currency&quot; because Chile is the world’s leading copper producer; the exchange rate moves in tandem with global industrial metals demand.'
  },
  { 
    code: 'XOF', 
    name: 'West African CFA Franc', 
    symbol: 'CFA', 
    flag: '🇸🇳',
    centralBank: 'Central Bank of West African States (BCEAO)',
    country: 'West African Economic and Monetary Union (8 nations)',
    subUnit: 'Centime (historical)',
    profile: 'The West African CFA Franc is shared by 8 member states (Benin, Burkina Faso, Côte d’Ivoire, Guinea-Bissau, Mali, Niger, Senegal, Togo) and is pegged to the Euro at a guaranteed parity of 655.957 CFA.'
  },
  { 
    code: 'XAF', 
    name: 'Central African CFA Franc', 
    symbol: 'FCFA', 
    flag: '🇨🇫',
    centralBank: 'Bank of Central African States (BEAC)',
    country: 'Central African Economic and Monetary Community (6 nations)',
    subUnit: 'Centime (historical)',
    profile: 'The Central African CFA Franc is shared by 6 central African nations (Cameroon, CAR, Chad, Republic of the Congo, Equatorial Guinea, Gabon) and pegged to the Euro at 655.957 FCFA.'
  },
  // Cryptocurrencies
  { 
    code: 'BTC', 
    name: 'Bitcoin', 
    symbol: '₿', 
    isCrypto: true,
    country: 'Decentralized / Global',
    subUnit: 'Satoshi (1/100,000,000)',
    profile: 'Bitcoin is the pioneer decentralized digital cryptocurrency created in 2008 by Satoshi Nakamoto. With a mathematically fixed supply cap of 21 million coins, it functions as a global store of value and digital gold.'
  },
  { 
    code: 'ETH', 
    name: 'Ethereum', 
    symbol: 'Ξ', 
    isCrypto: true,
    country: 'Decentralized / Global',
    subUnit: 'Gwei (1/1,000,000,000), Wei',
    profile: 'Ethereum is the premier global decentralized computing platform enabling smart contracts, decentralized finance (DeFi), tokenization, and cross-border settlement with ETH as its native asset.'
  },
  { 
    code: 'USDT', 
    name: 'Tether', 
    symbol: '₮', 
    isCrypto: true,
    country: 'Tether Operations Ltd / Global',
    subUnit: 'Cent (1/100)',
    profile: 'Tether (USDT) is the most widely adopted dollar-pegged stablecoin in the digital asset ecosystem, maintaining a 1:1 parity with the US Dollar through reserves of US Treasury bills and cash equivalents.'
  },
  { 
    code: 'BNB', 
    name: 'Binance Coin', 
    symbol: 'BNB', 
    isCrypto: true,
    country: 'BNB Chain / Global',
    subUnit: 'Jager (1/100,000,000)',
    profile: 'BNB powers the BNB Chain ecosystem, utilized for transaction gas fees, staking, governance, and trading fee discounts across digital asset exchanges.'
  },
  { 
    code: 'SOL', 
    name: 'Solana', 
    symbol: '◎', 
    isCrypto: true,
    country: 'Solana Foundation / Global',
    subUnit: 'Lamport (1/1,000,000,000)',
    profile: 'Solana is a high-performance Layer-1 blockchain engineered for speed, sub-second finality, and ultra-low transaction fees, utilizing a hybrid Proof-of-Stake and Proof-of-History consensus mechanism.'
  },
  { 
    code: 'XRP', 
    name: 'Ripple', 
    symbol: 'XRP', 
    isCrypto: true,
    country: 'XRP Ledger / Global',
    subUnit: 'Drop (1/1,000,000)',
    profile: 'XRP is an enterprise-grade digital asset optimized for real-time gross settlement systems, cross-border remittances, and bridge currency liquidity between disparate banking institutions.'
  },
  { 
    code: 'ADA', 
    name: 'Cardano', 
    symbol: 'ADA', 
    isCrypto: true,
    country: 'Cardano Foundation / Global',
    subUnit: 'Lovelace (1/1,000,000)',
    profile: 'Cardano is a peer-reviewed, proof-of-stake blockchain platform designed through evidence-based methods and academic research to provide sustainable financial security and scalability.'
  },
];

export const getCurrency = (code: string) => CURRENCIES.find(c => c.code === code.toUpperCase());