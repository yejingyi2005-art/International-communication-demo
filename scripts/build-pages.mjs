import { spawnSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
const result = spawnSync('npm', ['run', 'build'], {
 stdio: 'inherit',
 env: { ...process.env, NEXT_PUBLIC_BASE_PATH: '/International-communication-demo' }
});
if (result.status !== 0) process.exit(result.status || 1);
writeFileSync('out/.nojekyll', '');
