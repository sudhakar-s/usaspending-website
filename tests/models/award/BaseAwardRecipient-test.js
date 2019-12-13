/**
 * BaseAwardRecipient-test.js
 * Created by David Trinh 10/10/18
 */

import BaseAwardRecipient from 'models/award//BaseAwardRecipient';
import CoreLocation from 'models/CoreLocation';
import { mockContract } from './mockAwardApi';

const recipient = Object.create(BaseAwardRecipient);
recipient.populate(mockContract.recipient);

describe('BaseAwardRecipient', () => {
    it('should parse the business categories', () => {
        expect(recipient.businessCategories).toEqual([
            'Testing 1',
            'Testing 2'
        ]);
    });
    it('should have a location property with CoreLocation in its prototype chain', () => {
        expect(Object.getPrototypeOf(recipient.location)).toEqual(CoreLocation);
    });
});