type PortableTextChild = {
  _type?: string;
  text?: string;
};

type PortableTextBlockLike = {
  _type?: string;
  children?: PortableTextChild[];
};

export function stripEmptyPortableTextBlocks<T>(value: T[]): T[] {
  return value.filter((node) => !isEmptyPortableTextBlock(node));
}

function isEmptyPortableTextBlock(node: unknown): node is PortableTextBlockLike {
  if (!node || typeof node !== 'object') return false;

  const block = node as PortableTextBlockLike;
  if (block._type !== 'block') return false;

  if (!Array.isArray(block.children) || block.children.length === 0) {
    return true;
  }

  return block.children.every((child) => {
    if (child._type !== 'span') {
      return false;
    }

    return (child.text ?? '').trim() === '';
  });
}
