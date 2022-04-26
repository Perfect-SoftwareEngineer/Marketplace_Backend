import { KnexHelper } from '../../helpers/knex.helper';

describe('Knex Helper', () => {
  it('', async () => {
    const { rawQuery, values } = KnexHelper.generateAttributeQuery([
      { trait_type: 'Eyes', value: 'Big' },
      { value: 'Sad', trait_type: 'Personality' },
      { value: 'Strong', }
    ]);
    expect(rawQuery).toEqual('JOIN LATERAL jsonb_array_elements(attributes) obj(val) ON obj.val->>\'trait_type\'' +
      ' = ? AND obj.val->>\'value\' = ?obj.val->>\'trait_type\' = ? AND obj.val->>\'value\' = ? AND obj.val->>\'trait_type\'' +
      ' = ? AND obj.val->>\'value\' = ?obj.val->>\'trait_type\' = ? AND obj.val->>\'value\' = ? AND obj.val->>\'trait_type\'' +
      ' = ? AND obj.val->>\'value\' = ? AND obj.val->>\'value\' = ?');
    expect(values).toEqual(['Eyes', 'Big', 'Personality', 'Sad', 'Strong']);
  });
});
