import { invoke } from '@tauri-apps/api/tauri';

export function add(v1: Array<Array<number>>, v2: Array<Array<number>>): Promise<Array<Array<number>>> {
    return invoke<Array<Array<number>>>('add', {v1, v2});
}
