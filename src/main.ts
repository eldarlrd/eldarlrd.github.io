import { mount } from 'svelte';

import App from '@/App.svelte';

const target = document.getElementById('root');

if (target) mount(App, { target });
