import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';

const execAsync = util.promisify(exec);

export async function publishPackage(packagePath: string, token: string) {
  console.log(`🚀 Preparing to publish from: ${packagePath}`);
  
  const npmrcPath = path.join(packagePath, '.npmrc');

  try {
    const npmrcContent = `//registry.npmjs.org/:_authToken=${token}`;
    await fs.writeFile(npmrcPath, npmrcContent);

    console.log(`    📦 Running npm publish...`);

    const command = 'npm publish --access public --dry-run';
    const { stdout, stderr } = await execAsync(command, { 
      cwd: packagePath 
    });

    return { success: true, logs: stdout + "\n" + stderr };

  } catch (error: any) {
    const errorLog = error.stderr || error.message || "Unknown error during publish";
    return { success: false, logs: errorLog };

  } finally {
    try {
      await fs.rm(npmrcPath, { force: true });
    } catch (e) {
      console.error("⚠️ Failed to cleanup .npmrc file:", e);
    }
  }
}
