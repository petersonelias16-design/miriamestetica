export interface Service {
  id: string;
  title: string;
  description: string;
  price?: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  sources?: string[];
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface GroundingMetadata {
  groundingChunks: GroundingChunk[];
}