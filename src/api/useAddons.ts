import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { withError } from '@/react-query';

async function getAddons() {
  const { data } = await axios.get<Addon[]>('/api/wow/addons');
  return data;
}

const fakeAddon: Addon = {
  category: { level: 0, name: '' },
  description: '',
  downloadLink: '',
  imageURL: '',
  name: '+ X autres',
  type: '',
};

export function useAddons({ withFake }: { withFake?: boolean } = {}) {
  return useQuery(
    ['addons'],
    async () => {
      const addons = await getAddons();
      if (withFake) {
        addons.push(fakeAddon);
      }
      return addons;
    },
    {
      ...withError("Impossible de charger la liste d'addons"),
    },
  );
}
