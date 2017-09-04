const {assert} = require('chai');
const MessageBag = require('../src/MessageBag').default;

describe('MessageBag', function () {
    var mb;
    beforeEach(function () {
        mb = new MessageBag();
    });

    context('when empty', function () {
        describe('#constructor()', function () {
            it('should create a new MessageBag', function () {
                var mb = new MessageBag();
                assert.instanceOf(mb, MessageBag);
            });
        });
        describe('#first(bag)', function () {
            it("should throw an exception", function () {
                var mb = new MessageBag();
                assert.throws(function () {
                    mb.first('test');
                });
            });
        });
        describe('#has(bag)', function () {
            it("should return false", function () {
                var mb = new MessageBag();
                assert.isFalse(mb.has('test'));
            });
        });

        describe('#get(bag)', function () {
            it('should return an empty array', function () {
                var mb = new MessageBag();
                assert.deepEqual(mb.get('test'), []);
            })
        });

        describe('#add(bag, message)', function () {
            it('should add a message to the bag', function () {
                var mb = new MessageBag();
                var message = 'Test Message';
                var bag = 'test';
                assert.doesNotThrow(function () {
                    mb.add(bag, message);
                });
                assert.lengthOf(mb._items, 1);
                assert.deepEqual(mb._items, [{bag, message}]);
            });
        });

        describe('#clear(bag)', function () {
            it('should not do anything', function () {
                assert.doesNotThrow(function () {
                    mb.clear('test');
                });
            });
        });
        describe('clearAll()', function () {
            it('should erase all the messages in every bag', function () {
                mb.clearAll();
                assert.lengthOf(mb._items, 0);
            });
        });
    });

    context('when has exactly one item', function () {
        beforeEach(function () {
            mb.add('test', 'Test Message');
        });

        describe('#first(bag)', function () {
            it('should return the first element if the bag exists', function () {
                assert.equal(mb.first('test'), 'Test Message');
            });
            it('should still throw an exception for a non-existing bag', function () {
                assert.throws(function () {
                    mb.first('invalid');
                });
            });
        });

        describe('#has(bag)', function () {
            it('should return true for the existing bag', function () {
                assert.isTrue(mb.has('test'));
            });
            it('should return false for a non-existing bag', function () {
                assert.isFalse(mb.has('invalid'));
            });
        });

        describe('#get(bag)', function () {
            it('should return an array with the one message for the existing bag', function () {
                assert.deepEqual(mb.get('test'), ['Test Message']);
            });
            it('should return an empty array for the non-existing bag', function () {
                assert.deepEqual(mb.get('invalid'), []);
            });
        });
        describe('#add(bag, message)', function () {
            it('should add a new message to the existing bag', function () {
                var message = 'Test Message 2';
                var bag = 'test';
                assert.doesNotThrow(function () {
                    mb.add(bag, message);
                });
                assert.lengthOf(mb._items, 2);
                assert.deepEqual(mb._items, [{bag: 'test', message: 'Test Message'}, {bag, message}]);
            });
            it('should create a new bag when it is given a different bag key', function () {
                var message = 'Test Message 2';
                var bag = 'new-bag';
                assert.doesNotThrow(function () {
                    mb.add(bag, message);
                });
                assert.lengthOf(mb._items, 2);
                assert.deepEqual(mb._items, [{bag: 'test', message: 'Test Message'}, {bag, message}]);
            });
        });

        describe('#clear(bag)', function () {
            it('should erase all the messages in the given bag', function () {
                mb.clear('test');
            });
        });

        describe('clearAll()', function () {
            it('should erase all the messages in every bag', function () {
                mb.clearAll();
                assert.lengthOf(mb._items, 0);
            });
        });
    });

    context('when has more than one item in one bag', function () {
        beforeEach(function () {
            mb.add('test', 'Test Message');
            mb.add('test', 'Test Message 2');
        });

        describe('#first(bag)', function () {
            it('should return the first element if the bag exists', function () {
                assert.equal(mb.first('test'), 'Test Message');
            });
            it('should still throw an exception for a non-existing bag', function () {
                assert.throws(function () {
                    mb.first('invalid');
                });
            });
        });

        describe('#has(bag)', function () {
            it('should return true for the existing bag', function () {
                assert.isTrue(mb.has('test'));
            });
            it('should return false for a non-existing bag', function () {
                assert.isFalse(mb.has('invalid'));
            });
        });

        describe('#get(bag)', function () {
            it('should return an array with the messages in the existing bag', function () {
                assert.deepEqual(mb.get('test'), ['Test Message', 'Test Message 2']);
            });
            it('should return an empty array for the non-existing bag', function () {
                assert.deepEqual(mb.get('invalid'), []);
            });
        });
        describe('#add(bag, message)', function () {
            it('should add a new message to the existing bag', function () {
                var message = 'Test Message 2';
                var bag = 'test';
                assert.doesNotThrow(function () {
                    mb.add(bag, message);
                });
                assert.lengthOf(mb._items, 3);
                assert.deepEqual(mb._items, [{bag: 'test', message: 'Test Message'}, {bag: 'test', message: 'Test Message 2'}, {bag, message}]);
            });
            it('should create a new bag when it is given a different bag key', function () {
                var message = 'Test Message 2';
                var bag = 'new-bag';
                assert.doesNotThrow(function () {
                    mb.add(bag, message);
                });
                assert.lengthOf(mb._items, 3);
                assert.deepEqual(mb._items, [{bag: 'test', message: 'Test Message'}, {bag: 'test', message: 'Test Message 2'}, {bag, message}]);
            });
        });

        describe('#clear(bag)', function () {
            it('should erase all the messages in the given bag', function () {
                mb.clear('test');
                assert.lengthOf(mb._items, 0);
                assert.isFalse(mb.has('test'));
            });
        });

        describe('clearAll()', function () {
            it('should erase all the messages in every bag', function () {
                mb.clearAll();
                assert.lengthOf(mb._items, 0);
            });
        });
    });

    context('when has more than one item in more than one bag', function () {
        beforeEach(function () {
            mb.add('test', 'Test Message');
            mb.add('test', 'Test Message 2');
            mb.add('test-2', 'Test Message 3');
            mb.add('test-2', 'Test Message 4');
        });

        describe('#first(bag)', function () {
            it('should return the first element if the bag exists', function () {
                assert.equal(mb.first('test'), 'Test Message');
                assert.equal(mb.first('test-2'), 'Test Message 3');
            });
            it('should still throw an exception for a non-existing bag', function () {
                assert.throws(function () {
                    mb.first('invalid');
                });
            });
        });

        describe('#has(bag)', function () {
            it('should return true for the existing bag', function () {
                assert.isTrue(mb.has('test'));
                assert.isTrue(mb.has('test-2'));
            });
            it('should return false for a non-existing bag', function () {
                assert.isFalse(mb.has('invalid'));
            });
        });

        describe('#get(bag)', function () {
            it('should return an array with the messages in the existing bag', function () {
                assert.deepEqual(mb.get('test'), ['Test Message', 'Test Message 2']);
                assert.deepEqual(mb.get('test-2'), ['Test Message 3', 'Test Message 4']);
            });
            it('should return an empty array for the non-existing bag', function () {
                assert.deepEqual(mb.get('invalid'), []);
            });
        });
        describe('#add(bag, message)', function () {
            it('should add a new message to an existing bag', function () {
                var message = 'Test Message 2';
                var bag = 'test';
                assert.doesNotThrow(function () {
                    mb.add(bag, message);
                });
                assert.lengthOf(mb._items, 5);
                assert.deepEqual(mb._items, [{bag: 'test', message: 'Test Message'}, {bag: 'test', message: 'Test Message 2'}, {bag: 'test-2', message: 'Test Message 3'}, {bag: 'test-2', message: 'Test Message 4'}, {bag, message}]);
            });
            it('should create a new bag when it is given a different bag key', function () {
                var message = 'Test Message 2';
                var bag = 'new-bag';
                assert.doesNotThrow(function () {
                    mb.add(bag, message);
                });
                assert.lengthOf(mb._items, 5);
                assert.deepEqual(mb._items, [{bag: 'test', message: 'Test Message'}, {bag: 'test', message: 'Test Message 2'}, {bag: 'test-2', message: 'Test Message 3'}, {bag: 'test-2', message: 'Test Message 4'}, {bag, message}]);
            });
        });

        describe('#clear(bag)', function () {
            it('should erase all the messages in the given bag', function () {
                mb.clear('test');
                assert.lengthOf(mb._items, 2);
                assert.isFalse(mb.has('test'));
                assert.isTrue(mb.has('test-2'));
                mb.clear('test-2');
                assert.lengthOf(mb._items, 0);
                assert.isFalse(mb.has('test-2'));
            });
        });

        describe('clearAll()', function () {
            it('should erase all the messages in every bag', function () {
                mb.clearAll();
                assert.lengthOf(mb._items, 0);
            });
        });
    });

});
