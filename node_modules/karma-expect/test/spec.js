describe('simple samples set from expect.js readme', function () {
  it('be', function () {
    expect(window.r).to.be(undefined);
  });
  it('eql', function () {
    expect({a: 'b'}).to.eql({a: 'b'})
  });
  it('typeof', function () {
    expect(5).to.be.a('number');
  });
  it('intanceof', function () {
    expect([]).to.be.an('array');
  });
  it('inverted', function () {
    expect(window).not.to.be.an(Image);
  });
});
