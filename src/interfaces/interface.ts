
  
  interface PeggedAsset {
    id: number;
    name: string;
    value: number;
    price: number;  // price est optionnel car tu fais une vérification dans le filter
    tvl?: number;    // tvl est aussi optionnel
  }

  export interface Chain {
    id: number;
    name: string;
    symbol: string;
    tokenSymbol?: string;  // tokenSymbol est maintenant optionnel
    tvl: number;    // tvl est aussi optionnel
  }
  

  
  export interface PropsInterface {
    chains: Chain[];
    peggedAssets: PeggedAsset[];
  }
  

  interface PriceData {
    [key: string]: number; // Clés dynamiques pour chaque token avec des valeurs numériques
  }
  
  export interface HistoryEntry {
    date: number; // Timestamp en secondes
    prices: PriceData; // Un objet qui contient les prix des différentes cryptomonnaies
  }
  
  export interface PropsInterfaceHistory {
    history: HistoryEntry[]; // Un tableau d'entrées d'historique
  }
  