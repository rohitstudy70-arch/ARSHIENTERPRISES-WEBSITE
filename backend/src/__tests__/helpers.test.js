const {
  generateSlug,
  calculateDiscount,
  paginate,
  validateEmail,
  validatePhone,
} = require('../utils/helpers');

describe('helpers', () => {
  test('generateSlug creates clean url slug', () => {
    expect(generateSlug('Arshi GPS Tracker PRO-365N')).toBe('arshi-gps-tracker-pro-365n');
  });

  test('calculateDiscount returns rounded percentage', () => {
    expect(calculateDiscount(10000, 8500)).toBe(15);
  });

  test('paginate returns sliced data and metadata', () => {
    const input = [1, 2, 3, 4, 5];
    const result = paginate(input, 2, 2);

    expect(result.data).toEqual([3, 4]);
    expect(result.pagination).toMatchObject({
      currentPage: 2,
      pageSize: 2,
      totalItems: 5,
      totalPages: 3,
    });
  });

  test('validateEmail checks valid email format', () => {
    expect(validateEmail('sales@arshienterprises.com')).toBe(true);
    expect(validateEmail('invalid-email')).toBe(false);
  });

  test('validatePhone validates 10+ digit phone values', () => {
    expect(validatePhone('+91-9876543210')).toBe(true);
    expect(validatePhone('98765')).toBe(false);
  });
});
