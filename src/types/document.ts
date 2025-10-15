export interface Document {
  id: number;
  name: string;
  content: Content;
  authorId: string;
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Content {
  id: number;
  name: string;
  createdAt: string;
  blocks: Block[];
}

export interface Block {
  data: BlockData;
  type: string;
}

export interface BlockData {
  text: string;
}
