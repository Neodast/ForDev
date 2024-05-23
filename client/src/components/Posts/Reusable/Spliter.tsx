function Spliter({ text }: { text: string }) {
  return text
    .split('\n')
    .map((line) => <p key={text.split('\n').indexOf(line)}>{line}</p>);
}

export default Spliter;
