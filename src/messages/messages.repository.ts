import { readFile, writeFile } from 'fs/promises';

type Content = Record<string, any>;

export class MessagesRepository {
  async findOne(id: string) {
    const content = await getContent();
    return content[id];
  }

  async findAll() {
    return await getContent();
  }

  async create(message: string) {
    const content = await getContent();
    const existingKeys = Object.keys(content).map((e) => +e);
    const id = getId(existingKeys);
    content[`${id}`] = { content: message, id };
    await writeContent(content);
  }
}
async function getContent(): Promise<Content> {
  const content = await readFile('messages.json', 'utf8');
  return JSON.parse(content);
}

async function writeContent(content: Content) {
  await writeFile('messages.json', JSON.stringify(content), 'utf8');
}

function getId(existing: number[]) {
  let shouldGen = true;
  while (shouldGen) {
    const newId = Math.floor(Math.random() * 999);
    if (!existing.includes(newId)) {
      shouldGen = false;
      return newId;
    }
  }
}
