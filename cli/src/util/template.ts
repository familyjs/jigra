import { mkdirp } from '@familyjs/utils-fs';
import tar from 'tar';

export async function extractTemplate(src: string, dir: string): Promise<void> {
  await mkdirp(dir);
  await tar.extract({ file: src, cwd: dir });
}
