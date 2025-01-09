export function nicknameFormatterHelper(sign: string, nickname: string) {
  return (
    <>
      <span className="mx-1">{sign}</span>
      <span>{nickname}</span>
    </>
  );
}
