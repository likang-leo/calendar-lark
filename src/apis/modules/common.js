import Level from '@/models/level';

export default {
  category_rank: {
    name: 'category_rank',
    method: 'get',
    url: '/api/common/category_rank/',
    useCache: true,
    deserialize: (res) => {
      if (res.success) {
        return new Level(res.category_ranks);
      }
    }
  },
  level: {
    name: 'level',
    method: 'get',
    url: '/api/common/level/',
    useCache: true
  },
  organizationList: {
    name: 'list',
    url: '/api/common/organization_list/',
    method: 'get',
    useCache: true,
    deserialize: (data) => {
      return data && data.success ? data.organizations.map(o => ({
        value: o,
        label: o
      })) : [];
    }
  },
  position: {
    name: 'getPosition',
    method: 'get',
    url: '/api/common/position_list/',
    serialize: data => data
  },
  currency: {
    name: 'currency',
    method: 'get',
    notify: 'none',
    url: '/strict/internal/v1/compensation/common/currency/'
  }
};
