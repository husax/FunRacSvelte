import { writable } from 'svelte/store';

export let brd= writable(null);
export let latexFun= writable('');
export let muestra= writable(true);
export let idRaices= writable([]);
export let marcado= writable(false);
export let marcadoT= writable(false);