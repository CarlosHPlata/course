
export class TextManipulator {

  private _text: string

  constructor() { this._text = '' }

  get text() {
    return this._text
  }

  append(newText: string) {
    this._text += newText
  }

  findAndReplate(word: string, newWord: string) {
    this._text = this._text.replace(word, newWord)
  }

  findAndDelete(word: string) {
    this._text = this._text.replace(word, "")
  }

  print() {
    console.log(this.text)
  }

  printByWord() {
    this.text.split(" ").forEach(word => console.log(word))
  }

  printRange(start: number, end?: number) {
    console.log(this.text.substring(start, end))
  }
}