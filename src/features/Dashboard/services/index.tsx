import api, { config } from '@/services';
import { useQuery } from '@tanstack/react-query';
import { DashCounters } from '../types';

const useChartsCounters = () => {
  return useQuery<DashCounters>({
    queryKey: ['/dashboard-counters'],
    queryFn: async () => {
      const res = await api.get('/reports/dashboard', config);
      return res.data;
    },
    staleTime: Infinity,
  });
};

export { useChartsCounters };
