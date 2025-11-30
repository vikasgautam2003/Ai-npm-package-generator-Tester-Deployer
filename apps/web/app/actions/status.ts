'use server'
import { redis } from '../../lib/redis';

export async function getSystemStatus() {
  try {
    const status = await redis.get('WORKER_STATUS');
    return status === 'ONLINE';
  } catch (error) {
    return false;
  }
}
