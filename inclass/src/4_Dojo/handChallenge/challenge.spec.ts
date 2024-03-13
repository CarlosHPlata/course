import { Emoji } from './challenge';

describe('', () => {
  it("👉 should move the memory pointer to the next cell", () => {
    const emoji = new Emoji([0, 65])
    emoji.read("👉👊")
    expect(emoji.print()).toBe("A");
  })

  it("👈 should move the memory pointer to the previous cell", () => {
    const emoji = new Emoji([65, 0], 1)
    emoji.read("👈👊")
    expect(emoji.print()).toBe("A");
  })

  it("👆 Should increment memory cell to 255 and then decrease it to 0", () => {
    const emoji = new Emoji([255])
    emoji.read("👆👊")

    expect(emoji.print()).toBe("\u0000")
  })

  it("👆 should increment the memory cell at the current position", () => {
    const emoji = new Emoji([64])
    emoji.read("👆👊")
    expect(emoji.print()).toBe("A")
  })


  it("👉👆 should move the memory pointer to the next cell and increment the actual cell", () => {
    const emoji = new Emoji([0, 64])
    emoji.read("👉👆👊")
    expect(emoji.print()).toBe("A")
  })

  it("👇 should decrease the memory cell at the current position.", () => {
    const emoji = new Emoji([66])
    emoji.read("👇👊")
    expect(emoji.print()).toBe("A")
  })

  it("👇 should set 255 if value is 0", () => {
    const emoji = new Emoji([0])
    emoji.read("👇👊")

    expect(emoji.print()).toBe("ÿ")
  })

});